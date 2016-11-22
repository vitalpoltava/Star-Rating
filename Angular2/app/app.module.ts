import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StarComponent, StarItemComponent } from './app.component';

@NgModule({
    imports:      [ BrowserModule ],
    declarations: [ StarItemComponent, StarComponent ],
    bootstrap:    [ StarComponent ]
})

export class Stars { }