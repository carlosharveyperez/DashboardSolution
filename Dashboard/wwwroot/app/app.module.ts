import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { appRoutings, appRoutingProviders } from './app.routing';

import { ModalModule } from 'ng2-modal';

import { ApplicationComponent } from './components/application/application';
import { HomeComponent } from './components/home/home';
import { AppDialogComponent } from './components/application/app-dialog';
import { WaitingComponent } from './components/application/waiting-component';
import { AppCarouselComponent } from './components/application/app-carousel';

@NgModule({
    imports: [BrowserModule, HttpModule, appRoutings, ModalModule],
    declarations: [ApplicationComponent, AppDialogComponent, WaitingComponent, AppCarouselComponent, HomeComponent],
    providers: [appRoutingProviders],
    bootstrap: [ApplicationComponent]
})
export class AppModule { }
