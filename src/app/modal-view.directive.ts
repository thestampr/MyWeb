import { Directive, Input, HostListener, OnInit, ElementRef } from '@angular/core';

import * as utils from './utils';


@Directive({
    selector: '[ModalView]'
})
export class ModalViewDirective implements OnInit {

    @Input() src: string = "";
    @Input() parallax: boolean;

    private _source: string;

    private modal_frame: HTMLDivElement;
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
        this.modal_frame.classList.add("open");
    }
    
    private _createElement() {
        this.modal_frame = document.createElement('div');
        this.modal_frame.id = "modal-frame";

        this.modal_image = document.createElement('img');
        this.modal_image.id = "modal-image";
        this.modal_image.src = this._source;

        this.modal_frame.appendChild(this.modal_image);
        document.body.appendChild(this.modal_frame);

        this.modal_frame.addEventListener("click", () => {
            this.modal_frame.classList.remove("open");
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
