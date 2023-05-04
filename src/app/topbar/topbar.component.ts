import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppearanceService } from '../appearance.service';


@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
    constructor(public theme: AppearanceService, private elementRef: ElementRef, public router: Router) {}

    ngOnInit(): void {
        // this._changeTheme();
    }

    ToogleTheme(): void {
        this.theme.is_dark = !this.theme.is_dark;
        this._changeTheme();
    }

    private _changeTheme(): void {
        let body: HTMLElement = this.elementRef.nativeElement.ownerDocument.body;
        body.style.backgroundColor = this.theme.background_color;
    }
}
