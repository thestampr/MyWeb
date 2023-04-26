import { Component } from '@angular/core';

import { AppearanceService } from '../appearance.service';

import * as utils from '../utils';


@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent {
    
    constructor(public Theme: AppearanceService) {}

    async ModalView() {
        let modal: HTMLElement = document.getElementById("modal-img")!;
        
        modal.style.display = "block";
    }

    async ModalClose() {
        let modal: HTMLElement = document.getElementById("modal-img")!;
        let me: HTMLElement = document.querySelector("#modal-img .me")!;

        me.style.scale = "75%";
        me.style.opacity = "0";
        modal.style.opacity = "0";

        await utils.delay(200);

        // default
        me.style.opacity = "1";
        me.style.scale = "100%";
        modal.style.display = "none";
        modal.style.opacity = "1";
    }
}
