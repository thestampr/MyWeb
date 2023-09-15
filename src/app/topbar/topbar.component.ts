import { Component, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { AppearanceService } from '../appearance.service';


@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent{

    private tsX: number;
    private tsY: number;
    
    constructor(public theme: AppearanceService, public router: Router, private elementRef: ElementRef) {}

    private _changeTheme(): void {
        let body: HTMLElement = this.elementRef.nativeElement.ownerDocument.body;
        // body.style.backgroundColor = this.theme.background_color;
    }

    @HostListener("window:resize")
    OnResize(event: TouchEvent): void {
        // console.log('Resize');

        if (window.innerWidth > 900) {
            this.CloseNav();
        }
    }

    @HostListener("window:touchstart", ["$event"])
    OnTouchStart(event: TouchEvent): void {
        this.tsX = event.touches[0].clientX;
        this.tsY = event.touches[0].clientY;
    }

    @HostListener("window:touchmove", ["$event"])
    OnTouchMove(event: TouchEvent): void {
        let teX = event.changedTouches[0].clientX;
        let teY = event.changedTouches[0].clientY;

        let percent = 100-(teX/window.innerWidth*100);
    }

    @HostListener("window:touchend", ["$event"])
    OnTouchEnd(event: TouchEvent): void {
        let teX = event.changedTouches[0].clientX;
        let teY = event.changedTouches[0].clientY;

        if ((this.tsX > teX+50) && this.tsX > window.innerWidth - 20) {
            // right
            // console.log('swipe from right');

            this.OpenNav();

        } else if (this.tsX < teX-50) {
            // left
            // console.log('left');

            this.CloseNav();
        }

        if (this.tsY > teY+50) {
            // down
            // console.log('down');
        } else if (this.tsY < teY-50) {
            // up
            // console.log('up');
        }
    }

    isActive(path: string): boolean {
        return document.location.pathname.endsWith(path);
    }

    ToogleTheme(): void {
        this.theme.is_dark = !this.theme.is_dark;
        this._changeTheme();
    }

    OpenNav(): void {
        if (window.innerWidth <= 900) {
            let floating_nav: HTMLElement = document.getElementById("mobile-nav-bg")!;
            
            floating_nav.classList.add("open");
        }
    }

    CloseNav(): void {
        let floating_nav: HTMLElement = document.getElementById("mobile-nav-bg")!;

        floating_nav.classList.remove("open");
    }
}
