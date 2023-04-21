import { Component } from '@angular/core';

import { AppearanceService } from '../appearance.service';


@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent {

    constructor(public Theme: AppearanceService) {}

    OnDownloadResume(): void {
        let link = document.createElement('a');
        link.setAttribute('type', 'hidden');
        link.href = 'assets/files/CV.pdf';
        link.download = 'Resume.pdf';
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
}
