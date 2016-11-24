import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StarComponent } from './stars.component';
import { StarItemComponent } from './star.component';

@NgModule({
    imports:      [ BrowserModule ],
    declarations: [ StarItemComponent, StarComponent ],
    bootstrap:    [ StarComponent ]
})

export class Stars { }