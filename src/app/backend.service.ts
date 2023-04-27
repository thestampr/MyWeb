import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class BackendService {

    constructor() { }

    DownloadCV(): void {
        let link = document.createElement('a');
        link.setAttribute('type', 'hidden');
        link.href = 'assets/files/CV.pdf';
        link.download = "Peeradon's cv.pdf";
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
}
