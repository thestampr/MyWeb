import { Component, ElementRef, HostListener, AfterViewInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

import { AppearanceService } from '../appearance.service';
import { BackendService } from '../backend.service';


const VISIBLE = 1.7;


@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements AfterViewInit{

    constructor(
        public theme: AppearanceService,
        public router: Router, 
        private backend: BackendService, 
        private elementRef: ElementRef
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

    @HostListener('window:resize')
    private onResize(): void {
        let topbar: HTMLElement = document.getElementById("topbar")!;
        let scroll_wrapper: HTMLElement = document.getElementById("scroll-wrapper")!;

        scroll_wrapper.style.height = String(window.innerHeight - topbar.offsetHeight);
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            // this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = this.theme.background_color;
            this.backend.updateMeta();
    
            let revealItems: HTMLCollectionOf<Element> = document.getElementsByClassName("scroll-reveal");
            let scroll_page: HTMLElement = document.getElementById("scroll-page")!;
            // let content_wrapper: HTMLElement = document.getElementById("content-wrapper")!;
            let fake_scroll_track: HTMLElement = document.getElementById("fake-scroll-track")!;
    
            let topbar: HTMLElement = document.getElementById("topbar")!;
            let footer: HTMLElement = document.getElementById("footer")!;
    
            for (let i = 0; i < revealItems.length; i++) {
                let windowHeight = window.innerHeight;
                let elementTop = revealItems[i].getBoundingClientRect().top;
            
                if (elementTop < windowHeight/VISIBLE) {
                    revealItems[i].classList.add("revealed");
                }
            }
    
            if (scroll_page.offsetHeight >= footer.getBoundingClientRect().bottom - topbar.offsetHeight) {
                fake_scroll_track.classList.add("long");
            } else {
                fake_scroll_track.classList.remove("long");
            }
    
            if (scroll_page) {
                scroll_page.addEventListener("scroll", this.OnScroll);
            }
        }, 100);
    }
    
    OnScroll(): void {
        let topbar: HTMLElement = document.getElementById("topbar")!;
        let footer: HTMLElement = document.getElementById("footer")!;

        let revealItems: HTMLCollectionOf<Element> = document.getElementsByClassName("scroll-reveal");
        let scroll_page: HTMLElement = document.getElementById("scroll-page")!;
        let to_top: HTMLElement = document.getElementById("to-top")!;

        let windowHeight = window.innerHeight;

        for (let i = 0; i < revealItems.length; i++) {
            let element_top = revealItems[i].getBoundingClientRect().top;
        
            if (element_top < windowHeight/VISIBLE) {
                revealItems[i].classList.add("revealed");
            } 
            // else {
            //     revealItems[i].classList.remove("revealed");
            // }
        }

        let footer_top = footer.getBoundingClientRect().top;
        if (footer_top < windowHeight) {
            to_top.classList.add("sticky");
        } else {
            to_top.classList.remove("sticky");
        }
        
        // if (scroll_page.scrollTop === 0) {
        //     to_top.classList.remove("hide");
        // }
        
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
        scroll_page.scrollTo(0, 0);
    }
}
