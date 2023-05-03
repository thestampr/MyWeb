import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class BackendService {

    constructor() { }

    DownloadResume(): void {
        let link = document.createElement('a');
        link.setAttribute('type', 'hidden');
        link.href = 'assets/files/resume.pdf';
        link.download = "Peeradon's resume.pdf";
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
}
