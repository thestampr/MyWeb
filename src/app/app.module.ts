import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CdkMenuModule } from '@angular/cdk/menu';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { ResumeComponent } from './resume/resume.component';
import { FooterComponent } from './footer/footer.component';
import { FlexCardBoxComponent } from './flex-card-box/flex-card-box.component';
import { SwiperComponent } from './swiper/swiper.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { ModalViewDirective } from './modal-view.directive';
import { ModelViewerComponent } from './model-viewer/model-viewer.component';
import { ModelsComponent } from './models/models.component';
import { ModelDetailsComponent } from './model-details/model-details.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { WavesComponent } from './waves/waves.component';


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
        ModelsComponent,
        ModelDetailsComponent,
        ProgressBarComponent,
        WavesComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule, 
        HttpClientModule, 
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
        MatMenuModule,
        MatRippleModule,
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
