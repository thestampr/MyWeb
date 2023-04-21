import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageComponent } from './page/page.component';

import { AppearanceService } from './appearance.service';
import { CardComponent } from './card/card.component';

import { TopbarComponent } from './topbar/topbar.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { LandingComponent } from './landing/landing.component';
import { ContactComponent } from './contact/contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'about', component: AboutMeComponent },
    { path: 'contact', component: ContactComponent },
    { path: '**', component: PageNotFoundComponent },
];


@NgModule({
    declarations: [
        AppComponent,
        PageComponent,
        CardComponent,
        TopbarComponent,
        LandingComponent,
        AboutMeComponent,
        ContactComponent,
        PageNotFoundComponent,
    ],
    imports: [
        RouterModule.forRoot(routes),
        BrowserModule,
        AppRoutingModule, 
        DragDropModule
    ],
    providers: [
        AppearanceService, 
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {}
