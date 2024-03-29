import { Component, HostListener, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppearanceService } from '../appearance.service';
import { BackendService } from '../backend.service';


@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements AfterViewInit{

    private tsX: number;
    private tsY: number;

    public is_open: boolean = false;
    
    constructor(
        public theme: AppearanceService, 
        public router: Router, 
        public backend: BackendService, 
    ) {}

    ngAfterViewInit(): void {
        const topbar: HTMLElement = document.getElementById("topbar")!;
        const mobile_nav_wrapper: HTMLElement = document.getElementById("mobile-nav-wrapper")!;
        this.router.events.subscribe(() => {
            topbar.classList.remove("floating");
            topbar.classList.remove("pin");
            
            setTimeout(() => {
                mobile_nav_wrapper.classList.remove("open");
            }, 250);
        });
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

    isSubPath(): boolean {
        // if (document.location.hostname.includes("github.io")) {
        //     return (document.location.pathname.split("/").length - 1) > 2;
        // }
        // return (document.location.pathname.split("/").length - 1) > 1;
        const sparated = document.location.pathname.split("/");
        return !["aboutme", "resume", "contact"].includes(sparated.at(sparated.length-1)!);
    }

    ToogleTheme(): void {
        this.theme.is_dark = !this.theme.is_dark;
    }

    OpenNav(): void {
        if (window.innerWidth <= 900) {
            const floating_nav: HTMLElement = document.getElementById("mobile-nav-bg")!;
            
            floating_nav.classList.add("open");
        }
    }

    CloseNav(): void {
        const floating_nav: HTMLElement = document.getElementById("mobile-nav-bg")!;

        floating_nav.classList.remove("open");
    }

    public Back() {
        history.back();
    }

    public closeModal(el: string): void {
        const modal: HTMLElement = document.getElementById(el)!;
        modal.classList.remove("open");
    }

    public openModal(el: string): void {
        const modal: HTMLElement = document.getElementById(el)!;
        modal.classList.add("open");

        modal.addEventListener("click", () => {
            modal.classList.remove("open");
            if (el === "sidebar-nav") {
                this.is_open = false;
            }
        })

        const childrens = Array.from(modal.querySelectorAll(`#${el} > *`));

        for (let child of childrens) {
            (child as HTMLElement).addEventListener("click", (event: MouseEvent) => {
                event.stopPropagation? event.stopPropagation() : event.cancelBubble = true;
            });
        }
    }
}
