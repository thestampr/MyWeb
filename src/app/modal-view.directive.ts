import { Directive, Input, HostListener, OnInit, ElementRef } from '@angular/core';

import * as utils from './utils';


@Directive({
    selector: '[ModalView]'
})
export class ModalViewDirective implements OnInit {
    private _el_type: string;

    @Input() parallax: boolean;

    constructor(private elementRef: ElementRef) {}

    ngOnInit(): void {
        let el: HTMLElement = this.elementRef.nativeElement;
        this._el_type = el.nodeName;

        if (this.parallax) {
            document.addEventListener("mousemove", this.MouseParallax);
        }
    }

    MouseParallax(event: MouseEvent): void {
        let modal_img: HTMLElement = document.getElementById("modal-image")!;
        let x: number = (50 - event.clientX - (window.innerWidth / 2)) * 0.01
        let y: number = (50 - event.clientY - (window.innerHeight / 2)) * 0.01

        modal_img.style.transform = `translateX(${x}px) translateY(${y}px)`;
    }

    @HostListener('click', ['$event']) 
    async onClick(event: MouseEvent) {
        if (this._el_type === "IMG" || this._el_type === "BUTTON") {
            // Open the modal

            let modal: HTMLElement = document.querySelector("div[ModalView]")!;
    
            if (this.parallax) {
                let modal_img: HTMLElement = document.getElementById("modal-image")!;
                modal_img.style.transition = "none";
            }
            
            modal.style.display = "flex";
        } else {
            // then close

            let modal: HTMLElement = document.querySelector("div[ModalView]")!;
            let modal_img: HTMLElement = document.getElementById("modal-image")!;
    
            if (this.parallax) {
                modal_img.style.transition = "all 0.2s ease-in-out";
            }
    
            modal_img.style.scale = "75%";
            modal_img.style.opacity = "0";
            modal.style.opacity = "0";
    
            await utils.delay(200);
    
            // default
            modal_img.style.opacity = "1";
            modal_img.style.scale = "100%";
            modal.style.display = "none";
            modal.style.opacity = "1";
        }
    }
}
