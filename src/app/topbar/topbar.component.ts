import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { AppearanceService } from '../appearance.service';


@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {
    constructor(public Theme: AppearanceService, private elementRef: ElementRef, public Router: Router) {}

    OnSwitchTheme(): void {
        this.Theme.is_dark = !this.Theme.is_dark;

        let body: HTMLElement = this.elementRef.nativeElement.ownerDocument.body;
        body.style.backgroundColor = this.Theme.is_dark? "#111111": "#E0E0E0";
    }

    OnDownloadResume(): void {
        let link = document.createElement('a');
        link.setAttribute('type', 'hidden');
        link.href = 'assets/files/CV.pdf';
        link.download = 'CV.pdf';
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
}
