import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppearanceService } from '../appearance.service';
import { BackendService } from '../backend.service';

import * as utils from '../utils';


const MOUSE_PARALLAX: Boolean = false;


@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit {
    
    constructor(public Theme: AppearanceService, public Backend: BackendService, public Router: Router) {}

    ngOnInit(): void {
        if (MOUSE_PARALLAX) {
            document.addEventListener("mousemove", this.MouseParallax);
        }
    }

    MouseParallax(event: MouseEvent): void {
        let modal_img: HTMLElement = document.getElementById("my-img")!;
        let x: number = (50 - event.clientX - (window.innerWidth / 2)) * 0.01
        let y: number = (50 - event.clientY - (window.innerHeight / 2)) * 0.01

        modal_img.style.transform = `translateX(${x}px) translateY(${y}px)`;
    }

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
