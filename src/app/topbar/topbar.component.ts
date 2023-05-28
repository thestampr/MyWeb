import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { AppearanceService } from '../appearance.service';


@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent{
    constructor(public theme: AppearanceService, private elementRef: ElementRef, public router: Router) {}

    private _changeTheme(): void {
        let body: HTMLElement = this.elementRef.nativeElement.ownerDocument.body;
        body.style.backgroundColor = this.theme.background_color;
    }

    isActive(path: string): boolean {
        return document.location.pathname.endsWith(path);
    }

    ToogleTheme(): void {
        this.theme.is_dark = !this.theme.is_dark;
        this._changeTheme();
    }

    OpenNav(): void {
        let floating_nav: HTMLElement = document.getElementById("mobile-nav-bg")!;

        floating_nav.classList.add("open");
    }

    CloseNav(): void {
        let floating_nav: HTMLElement = document.getElementById("mobile-nav-bg")!;

        floating_nav.classList.remove("open");
    }
}
