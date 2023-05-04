import { Component, ElementRef, OnInit } from '@angular/core';

import { AppearanceService } from '../appearance.service';


@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

    constructor(public Theme: AppearanceService, private elementRef: ElementRef) {
    }

    ngOnInit() {
        this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = this.Theme.background_color;
    }
}
