import { Directive, Input, HostListener, OnInit, ElementRef, OnDestroy } from '@angular/core';

import { BackendService } from './backend.service';


@Directive({
    selector: '[ModalView]'
})
export class ModalViewDirective implements OnInit, OnDestroy {

    @Input() src: string = "";
    @Input() parallax: boolean;
    @Input() sensitive: number = 0.01;

    private _source: string;

    private modal_bg?: HTMLDivElement;
    private modal_image?: HTMLImageElement;

    constructor(private elementRef: ElementRef, private backend: BackendService) {
        
    }

    get element(): HTMLElement {
        return this.elementRef.nativeElement;
    }

    ngOnInit(): void {
        this._source = (<HTMLImageElement>this.element).src || this.src;

        this._createElement();
    }

    ngOnDestroy(): void {
        this._destroyElement();
    }

    @HostListener('click') 
    private openMoal() {
        this.modal_bg!.classList.add("open");
    }

    @HostListener('document:keydown', ['$event']) 
    private onEscape(event: KeyboardEvent) {
        if (event.key === "Escape" && this.modal_bg?.classList.contains("open")) {
            this.modal_bg.classList.remove("open");
        }
    }

    private _contextmenu(): boolean {
        return false;
    }
    
    private _createElement() {
        function handleMousemove(event: MouseEvent): void {
            const x: number = (50 - event.clientX - (window.innerWidth / 2)) * self.sensitive;
            const y: number = (50 - event.clientY - (window.innerHeight / 2)) * self.sensitive;
    
            self.modal_image!.style.transform = `translateX(${x}px) translateY(${y}px)`;
        }
    
        function handleGyroscope(event: DeviceOrientationEvent): void {
            const x: number = (50 - event.beta!) * self.sensitive;
            const y: number = (50 - event.gamma!) * self.sensitive;
        
            self.modal_image!.style.transform = `translateX(${x}px) translateY(${y}px)`;
        }

        function createParallax(): void {
            if (self.backend.isMobile && window.DeviceOrientationEvent) {
                window.addEventListener('deviceorientation', handleGyroscope);
            } else {
                document.addEventListener("mousemove", handleMousemove);
            }
        }

        this.modal_bg = document.createElement('div');
        this.modal_bg.classList.add("modal-bg");

        this.modal_image = document.createElement('img');
        this.modal_image.id = "modal-image";
        this.modal_image.src = this._source;

        this.modal_bg.oncontextmenu = this._contextmenu;
        this.modal_image.oncontextmenu = this._contextmenu;

        this.modal_bg.appendChild(this.modal_image);
        document.body.appendChild(this.modal_bg);

        this.modal_bg.addEventListener("click", () => {
            this.modal_bg!.classList.remove("open");
        });

        this.modal_image.addEventListener("click", (event: MouseEvent) => {
            event.stopPropagation? event.stopPropagation() : event.cancelBubble = true;
        });

        let self = this;
        if (this.parallax) {
            createParallax();
        }
    }

    private _destroyElement() {
        document.body.removeChild(this.modal_bg!);
    }
}