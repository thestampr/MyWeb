import { Component } from '@angular/core';

import { AppearanceService } from '../appearance.service';
import { BackendService } from '../backend.service';

import html2canvas from 'html2canvas';
import * as htmlToImage from 'html-to-image';


@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent {

    public expand_download: boolean;

    constructor(public theme: AppearanceService, public backend: BackendService) {}

    async SaveAsPng_backup() {
        let content: HTMLElement = document.getElementById('resume-content')!;
        let backend = this.backend;

        await html2canvas(content, {
            allowTaint: true,
            useCORS: true
        }).then(async function (canvas) {
            let resume_img = canvas.toDataURL("image/png");
            backend.Download("data:" + resume_img, "Peeradon's resume.png");
        });
    }

    async SaveAsPng() {
        let content: HTMLElement = document.getElementById('resume-content')!;
        let backend = this.backend;

        await htmlToImage.toPng(content).then(async function (resume_img) {
            backend.Download(resume_img, "Peeradon's resume.png");
        });
    }
}
