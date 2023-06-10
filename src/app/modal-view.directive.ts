import { Directive, Input, HostListener, OnInit, ElementRef } from '@angular/core';

import * as utils from './utils';


@Directive({
    selector: '[ModalView]'
})
export class ModalViewDirective implements OnInit {

    @Input() src: string = "";
    @Input() parallax: boolean;

    private _source: string;

    private modal_bg: HTMLDivElement;
    private modal_image: HTMLImageElement;

    constructor(private elementRef: ElementRef) {}

    get element(): HTMLElement {
        return this.elementRef.nativeElement;
    }

    ngOnInit(): void {
        this._source = (<HTMLImageElement>this.element).src || this.src;

        this._createElement();
    }

    @HostListener('click') 
    private openMoal() {
        this.modal_bg.classList.add("open");
    }
    
    private _createElement() {
        this.modal_bg = document.createElement('div');
        this.modal_bg.classList.add("modal-bg");

        this.modal_image = document.createElement('img');
        this.modal_image.id = "modal-image";
        this.modal_image.src = this._source;

        this.modal_bg.appendChild(this.modal_image);
        document.body.appendChild(this.modal_bg);

        this.modal_bg.addEventListener("click", () => {
            this.modal_bg.classList.remove("open");
        });

        if (this.parallax) {
            document.addEventListener("mousemove", (event) => {
                let x: number = (50 - event.clientX - (window.innerWidth / 2)) * 0.01
                let y: number = (50 - event.clientY - (window.innerHeight / 2)) * 0.01
        
                this.modal_image.style.transform = `translateX(${x}px) translateY(${y}px)`;
            });
        }
    }
}
