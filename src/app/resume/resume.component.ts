import { Component } from '@angular/core';

import { AppearanceService } from '../appearance.service';
import { BackendService } from '../backend.service';

import * as htmlToImage from 'html-to-image';


@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent {

    public expand_download: boolean;

    constructor(public theme: AppearanceService, public backend: BackendService) {}

    async SaveAsPng() {
        let content: HTMLElement = document.getElementById('resume-content')!;

        let backend = this.backend;
        await htmlToImage.toPng(content).then(async function (resume_img) {
            backend.Download(resume_img, "Peeradon's resume.png");
        });
    }

    OpenModal(): void {
        let content: HTMLElement = document.getElementById('resume-content')!;
        content.classList.remove("no-background");

        let modal = document.getElementById("download-modal")!;
        modal.classList.add("open");

        modal.addEventListener("click", () => {
            modal.classList.remove("open");
            content.classList.add("no-background");
        })
    }
}
