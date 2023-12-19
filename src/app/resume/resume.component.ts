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

    public disabled_downloads: boolean = false;
    public disabled_transcript: boolean = true;

    public expand_download: boolean;

    constructor(public theme: AppearanceService, public backend: BackendService) {}

    async SaveAsPng() {
        const content: HTMLElement = document.getElementById('resume-content')!;
        content.classList.add("saving");

        const backend = this.backend;
        await htmlToImage.toPng(content).then(async function (resume_img) {
            backend.Download(resume_img, "Peeradon's resume.png");
            content.classList.remove("saving");
        });
    }

    OpenModal(): void {
        const content: HTMLElement = document.getElementById('resume-content')!;
        content.classList.remove("no-background");

        const modal = document.getElementById("download-modal")!;
        modal.classList.add("open");

        modal.addEventListener("click", () => {
            modal.classList.remove("open");
            content.classList.add("no-background");
        })
    }
}
