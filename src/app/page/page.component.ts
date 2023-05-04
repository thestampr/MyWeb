import { Component, ElementRef, OnInit } from '@angular/core';

import { AppearanceService } from '../appearance.service';
import { BackendService } from '../backend.service';


@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

    constructor(public theme: AppearanceService, private backend: BackendService, private elementRef: ElementRef) {
    }

    ngOnInit() {
        this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = this.theme.background_color;

        this.backend.updateMeta();
    }
}
