import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Routes, RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CdkMenuModule } from '@angular/cdk/menu';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageComponent } from './page/page.component';

import { AppearanceService } from './appearance.service';
import { BackendService } from './backend.service';

import { CardComponent } from './card/card.component';
import { TopbarComponent } from './topbar/topbar.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { LandingComponent } from './landing/landing.component';
import { ContactComponent } from './contact/contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResumeComponent } from './resume/resume.component';
import { FooterComponent } from './footer/footer.component';
import { FlexCardBoxComponent } from './flex-card-box/flex-card-box.component';
import { GalleryComponent } from './gallery/gallery.component';


const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'aboutme', component: AboutMeComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'resume', component: ResumeComponent },
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
        ResumeComponent,
        FooterComponent,
        FlexCardBoxComponent,
        GalleryComponent,
    ],
    imports: [
        RouterModule.forRoot(routes),
        BrowserModule,
        AppRoutingModule, 
        DragDropModule, 
        BrowserAnimationsModule, 
        MatTooltipModule, 
        CdkMenuModule, 
        ClipboardModule, 
        MatSnackBarModule, 
        MatProgressBarModule, 
    ],
    providers: [
        AppearanceService, 
        BackendService, 
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {}
