import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutMeComponent } from './about-me/about-me.component';
import { LandingComponent } from './landing/landing.component';
import { ContactComponent } from './contact/contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ResumeComponent } from './resume/resume.component';
import { ModelsComponent } from './models/models.component';
import { ModelDetailsComponent } from './model-details/model-details.component';


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
        component: ModelsComponent
    },
    { 
        path: '3d/:model', 
        component: ModelDetailsComponent
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
