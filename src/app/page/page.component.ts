import { Component, ElementRef, AfterViewInit } from '@angular/core';

import { AppearanceService } from '../appearance.service';


@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements AfterViewInit {

    constructor(public Theme: AppearanceService, private elementRef: ElementRef) {
    }

    ngAfterViewInit() {
        this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = this.Theme.is_dark? "#111111": "#E0E0E0";
    }
}
