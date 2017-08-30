/**
 * Variable Star Rating
 *
 * ver 0.4.0
 *
 * (c) Vitalii Omelkin, 2015, 2016
 * Licensed under the MIT License
 *
 */
;(function(){
    var rating = angular.module('stars', []);

    /**
     * Demo controllers
     * ----------------
     */

    rating.controller("starsController", function ($scope) {
        // Default graphic items -- stars
    });

    rating.controller("circlesController", ['$scope', function ($scope) {
        // Circle graphic items function
        $scope.circleDrawer = function (ctx, r) {
            if (!ctx) throw Error('No Canvas context found!');
            ctx.save();
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(r, r, r, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.restore();
        }
    }]);


    /**
     * Core functionality
     * ------------------
     */
    rating.factory('stars', function() {

        /**
         * Draw wrapping rectangle
         *
         * @param ctx {Object} 2d context
         * @param dim {Number}
         * @param backColor {String}
         */
        function _drawRect(ctx, dim, backColor) {
            if (!ctx) throw Error('No Canvas context found!');
            ctx.save();
            ctx.width = dim;
            ctx.height = dim;
            ctx.fillStyle = backColor;
            ctx.fillRect(0,0, dim, dim);
            ctx.restore();
        }

        /**
         * Draw one star with certain general params
         *
         * @param ctx {Object} 2d context
         * @param r {Number} Radius
         * @private
         */
        function _star(ctx, r) {
            if (!ctx) throw Error('No Canvas context found!');
            ctx.save();
            ctx.globalCompositeOperation = 'destination-out';

            ctx.beginPath();
            ctx.translate(r, r);
            ctx.moveTo(0, 0 - r);
            for (var i = 0; i < 5; i++) {
                ctx.rotate(Math.PI / 5);
                ctx.lineTo(0, 0 - (r * 0.5));
                ctx.rotate(Math.PI / 5);
                ctx.lineTo(0, 0 - r);
            }
            ctx.fill();
            ctx.restore();
        }

        // Draw one empty star
        function drawRatingElement(ctx, r, rectBackColor, ratingElDrawerFunc) {
            _drawRect(ctx, r * 2, rectBackColor);
            if (typeof ratingElDrawerFunc === 'function') {
                ratingElDrawerFunc(ctx, r); // draw custom rating item
            } else {
                _star(ctx, r); // draw star as a default rating item
            }

        }

        // Return API
        return {
            drawRatingElement: drawRatingElement
        }
    });

    rating.factory('starsUtility', function() {
        /**
         * Calculate percent of area to filled with color star
         *
         * @param attrs {Object}
         * @returns {Number}
         */
        var calculatePercent = function(attrs) {
            var percent, stars, selectedStars;
            if (!attrs) {
                return 0;
            } else if (attrs.ratingPercent) {
                percent = parseInt(attrs.ratingPercent) ? parseInt(attrs.ratingPercent) : 0;
                return percent > 100 ? 100 : percent;
            } else if (attrs.ratingStars) {
                stars = parseInt(attrs.stars || 5);
                selectedStars = parseFloat(attrs.ratingStars) > stars ? stars : parseFloat(attrs.ratingStars);
                return (100 / stars) * selectedStars || 0.0;
            }
        };

        /**
         * Calculate how many stars should be filled (in percent)
         *
         * @param totalStars
         * @param totalWidth
         * @param starWidth
         * @param width
         * @returns {number}
         */
        var percentFullStars = function(totalStars, totalWidth, starWidth, width) {
            var pxPerOneStar = totalWidth / totalStars;
            var percentPerOneStar = 100 / totalStars;
            return Math.ceil(width / pxPerOneStar) * percentPerOneStar;
        };

        /**
         * Calculate stars in percents
         *
         * @param totalStars
         * @param percent
         * @param precision
         * @returns {string}
         */
        var starsByPercent = function(totalStars, percent, precision) {
            var percentPerOneStar = 100 / totalStars;
            return (percent / percentPerOneStar).toFixed(precision || 2);
        };

        return {
            calculatePercent: calculatePercent,
            percentFullStars: percentFullStars,
            starsByPercent: starsByPercent
        };
    });

    // ------------------------
    //        DIRECTIVE
    // ------------------------
    // @ngInject
    rating.directive('starRating', ['$compile', '$timeout', 'stars', 'starsUtility', function($compile, $timeout, stars, starsUtility) {
        return {
            restrict: 'A',

            scope: {
                percent: "=outerPercent",
                starsSelected: "=outerStarSelection",
                customFigureDrawer: "=?"
            },

            template: '<div class="stars" ' +
                        'ng-mousemove="changeRating($event)" ' +
                        'ng-mouseleave="leaveRating()" ' +
                        'ng-style="{\'background-color\': emptyBackColor}">' +
                            '<div class="stars-selected" ' +
                                'ng-style="{\'width\': percent + \'%\', \'background-color\': selColor}"></div>' +
                            '<canvas class="star" ng-repeat="i in starsIterable"' +
                                'ng-click="secureNewRating()" ' +
                                'height="{{starRadius*2}}" ' +
                                'width="{{starRadius*2}}"></canvas>' +
                      '</div>',

            link: function($scope, root, attrs) {
                // Configs
                var prevPercent;
                var wrapper = angular.element(root[0].querySelector('.stars'));
                var filler = angular.element(root[0].querySelector('.stars-selected'));
                var howManyStars = parseInt( attrs.stars ) || 5;
                var ratingDefine = attrs.ratingDefine || false;

                $scope.starRadius = parseInt( attrs.starRadius ) || 20;
                $scope.percent = prevPercent = starsUtility.calculatePercent( attrs );
                $scope.backColor = attrs.backColor || 'white';
                $scope.emptyBackColor = attrs.emptyBackColor || '#d3d3d3';
                $scope.selColor = attrs.selColor || 'gold';
                $scope.starsIterable = (function() {
                    var res = [];
                    for (var i = 0; i < howManyStars; i++) { res.push(i); }
                    return res;
                }());

                // Allowed to define a new rating?
                // -------------------------------
                if (ratingDefine) {

                    // watch percent value to update the view
                    $scope.$watch('percent', function(newValue) {
                        filler.css('width', newValue + '%');
                        $scope.starsSelected = starsUtility.starsByPercent(howManyStars, $scope.percent);
                    });

                    // handle events to change the rating
                    $scope.changeRating = function(e) {
                        var el = wrapper[0];
                        var w = el.offsetWidth;
                        var selected = e.clientX - el.getBoundingClientRect().left + 2;
                        var newPercent = ratingDefine == 'star' ? starsUtility.percentFullStars(howManyStars, w, $scope.starRadius*2, selected) : Math.floor((selected * 100) / w);
                        $scope.percent = newPercent > 100 ? 100 : newPercent;
                    };

                    $scope.leaveRating = function() {
                        $scope.percent = prevPercent;
                    };

                    $scope.secureNewRating = function() {
                        prevPercent = $scope.percent;
                    };
                }

                // we should wait for next JS 'tick' to show up the stars
                $timeout(function() {
                    wrapper[0].querySelectorAll('.star').forEach(function(starEl) {
                        stars.drawRatingElement(starEl.getContext("2d"), $scope.starRadius, $scope.backColor, $scope.customFigureDrawer);
                    });
                    wrapper.css('visibility', 'visible'); // this to avoid to show partly rendered layout
                });

            }
        };
    }]);
}());
