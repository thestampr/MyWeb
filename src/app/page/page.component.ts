import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { AppearanceService } from '../appearance.service';
import { BackendService } from '../backend.service';


const VISIBLE = 1.7;


@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent{

    constructor(
        public theme: AppearanceService,
        public router: Router, 
        private backend: BackendService, 
        private elementRef: ElementRef
    ) {
        router.events.subscribe(() => {
            this.OnEnter();
        });
    }

    OnEnter(): void {
        this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = this.theme.background_color;
        this.backend.updateMeta();

        let sections: NodeListOf<HTMLElement> = document.querySelectorAll(".scroll-reveal");
        let scroll_page: HTMLElement = document.getElementById("scroll-page")!;

        for (let i = 0; i < sections.length; i++) {
            let windowHeight = window.innerHeight;
            let elementTop = sections[i].getBoundingClientRect().top;
        
            if (elementTop < windowHeight/VISIBLE) {
                sections[i].classList.add("revealed");
            }
        }

        if (scroll_page) {
            scroll_page.addEventListener("scroll", this.OnScroll);
        }
    }
    
    OnScroll(): void {
        let sections: NodeListOf<HTMLElement>  = document.querySelectorAll(".scroll-reveal");
        let scroll_page: HTMLElement = document.getElementById("scroll-page")!;
        let to_top: HTMLElement = document.getElementById("to-top")!;

        for (let i = 0; i < sections.length; i++) {
            let windowHeight = window.innerHeight;
            let elementTop = sections[i].getBoundingClientRect().top;
        
            if (elementTop < windowHeight/VISIBLE) {
                sections[i].classList.add("revealed");
            }
        }
        
        if (scroll_page.scrollTop > 300) {
            to_top.style.opacity = "1";
            to_top.style.visibility = "visible";
        } else {
            to_top.style.opacity = "0";
            to_top.style.visibility = "hidden";
        }
    }

    ToTop(): void {
        let scroll_page: HTMLElement = document.getElementById("scroll-page")!;

        scroll_page.scrollTo(0, 0);
    }
}
