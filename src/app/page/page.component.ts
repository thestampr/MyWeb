import { Component, Input, AfterViewInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

import { AppearanceService } from '../appearance.service';
import { BackendService } from '../backend.service';


const VISIBLE = 1.6;
const VISIBLE_HIDE = 1.2;


@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements AfterViewInit{

    @Input() fadeButtom: boolean = false;

    private lastScrollTop = 0;

    constructor(
        public theme: AppearanceService,
        public router: Router, 
        public backend: BackendService, 
    ) {
        router.events.subscribe((event) => {
            if ( event instanceof NavigationStart ) {
                // console.log('start');
            }

            if ( event instanceof NavigationEnd ) {
                // console.log('end');
            }
        });
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            // this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = this.theme.background_color;
            this.backend.updateMeta();
    
            const revealItems: HTMLCollectionOf<Element> = document.getElementsByClassName("scroll-reveal");
            const scroll_page: HTMLElement = document.getElementById("scroll-page")!;
            // const content_wrapper: HTMLElement = document.getElementById("content-wrapper")!;
            const fake_scroll_track: HTMLElement = document.getElementById("fake-scroll-track")!;
    
            const topbar: HTMLElement = document.getElementById("topbar")!;
            const footer: HTMLElement = document.getElementById("footer")!;
    
            for (let i = 0; i < revealItems.length; i++) {
                const windowHeight = window.innerHeight;
                const elementTop = revealItems[i].getBoundingClientRect().top;
            
                if (elementTop < windowHeight/VISIBLE) {
                    revealItems[i].classList.add("revealed");
                }
            }
    
            if (scroll_page.offsetHeight >= footer.getBoundingClientRect().bottom) {
                fake_scroll_track.classList.add("long");
                // fake_scroll_track.classList.add("hide");
            } else {
                fake_scroll_track.classList.remove("long");
                // fake_scroll_track.classList.remove("hide");
            }
    
            if (scroll_page) {
                scroll_page.addEventListener("scroll", this.OnScroll);
            }
        }, 100);
    }
    
    async OnScroll() {
        const topbar: HTMLElement = document.getElementById("topbar")!;
        const footer: HTMLElement = document.getElementById("footer")!;
        const bottom_shadow: HTMLElement = document.getElementById("bottom-shadow")!;

        const revealItems: HTMLCollectionOf<Element> = document.getElementsByClassName("scroll-reveal");
        const scroll_page: HTMLElement = document.getElementById("scroll-page")!;
        const to_top: HTMLElement = document.getElementById("to-top")!;

        const windowHeight = window.innerHeight;

        var st = scroll_page.scrollTop;
        if (topbar.classList.contains("sliver")) {
            if (st > this.lastScrollTop) {
                // downscroll code
                topbar.classList.add("pin");
            } else if (st < this.lastScrollTop) {
                // upscroll code
                topbar.classList.remove("pin");
            }
        }
        this.lastScrollTop = st <= 0 ? 0 : st;

        for (let i = 0; i < revealItems.length; i++) {
            const element_top = revealItems[i].getBoundingClientRect().top;

            if (revealItems[i].classList.contains("scroll-hide")) {
                const element_btm = revealItems[i].getBoundingClientRect().bottom;

                if (element_top < windowHeight/VISIBLE_HIDE && element_btm > windowHeight - (windowHeight/VISIBLE_HIDE)) {
                    revealItems[i].classList.add("revealed");
                } else {
                    revealItems[i].classList.remove("revealed");
                }
                
            } else if (element_top < windowHeight/VISIBLE_HIDE) {
                revealItems[i].classList.add("revealed");
            }
        }

        if (bottom_shadow) {
            const footer_top = footer.getBoundingClientRect().top;
            if (footer_top < windowHeight + (windowHeight/3)) {
                bottom_shadow.classList.add("hide");
            } else {
                bottom_shadow.classList.remove("hide");
            }
        }
        
        if (scroll_page.scrollTop > 300) {
            to_top.classList.add("visible");
        } else {
            to_top.classList.remove("visible");
        }
        
        if (scroll_page.scrollTop > 20) {
            topbar.classList.add("floating");
        } else {
            topbar.classList.remove("floating");
        }
    }

    ToTop(): void {
        // let to_top: HTMLElement = document.getElementById("to-top")!;
        let scroll_page: HTMLElement = document.getElementById("scroll-page")!;

        // to_top.classList.add("hide");
        scroll_page.scrollTo({top: 0, behavior:'smooth'});
    }
}
