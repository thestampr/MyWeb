import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Routes, RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CdkMenuModule } from '@angular/cdk/menu';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

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
import { SwiperComponent } from './swiper/swiper.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { ModalViewDirective } from './modal-view.directive';
import { ModelViewerComponent } from './model-viewer/model-viewer.component';


const routes: Routes = [
    { 
        path: '', 
        component: LandingComponent,
        data: {
            title: 'Home',
            description:"Hi I'm Stamp, nice to meet you!",
            Image: 'assets/images/profile.jpg',
        } 
    },
    { 
        path: 'aboutme', 
        component: AboutMeComponent,
        data: {
            title: 'About me',
            description:"Hi I'm Stamp, nice to meet you!",
            Image: 'assets/images/profile.jpg',
        } 
    },
    { 
        path: 'contact', 
        component: ContactComponent,
        data: {
            title: 'Contact me',
            description:"Feel free to contact me!",
            Image: 'assets/images/profile.jpg',
        } 
    },
    { 
        path: 'resume', 
        component: ResumeComponent,
        data: {
            title: 'Resume',
            description:"Stamp's resume is here!",
            Image: 'assets/images/profile.jpg',
        } 
    },
    { 
        path: '3d', 
        component: ModelViewerComponent
    },
    { 
        path: '404', 
        component: PageNotFoundComponent,
        data: {
            title: 'Hmmm 404',
            description:"What are you looking for?",
        }  
    },
    { 
        path: '**', 
        redirectTo: '404'
    },
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
        SwiperComponent,
        ModalViewDirective,
        ModelViewerComponent,
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
        NgxUsefulSwiperModule, 
        MatExpansionModule,
        MatIconModule,
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
