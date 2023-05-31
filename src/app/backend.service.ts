import { Injectable } from '@angular/core';

import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class BackendService {

    constructor(
        private title: Title, 
        private meta: Meta, 
        private router: Router, 
        private activatedRoute: ActivatedRoute
    ) { }


    // SEO services
    updateMetaInfo(content: string, author: string, category: string): void {
        this.meta.updateTag({ name: 'description', content: content });
        this.meta.updateTag({ name: 'author', content: author });
        this.meta.updateTag({ name: 'keywords', content: category });
    }

    updateMeta(): void {
        this.router.events.pipe(
            filter((event) => event instanceof NavigationEnd),
            map(() => this.activatedRoute),
            map((route) => {
                while (route.firstChild) { route = route.firstChild; }
                return route;
            }),
            filter((route) => route.outlet === 'primary'),
            mergeMap((route) => route.data)).subscribe((event) => {
                this.title.setTitle(
                    event['title'] === ('' || undefined)? "Peeradon" : event['title'] + " ∙ Peeradon"
                );
                this.meta.updateTag({ name: 'description', content: event['description'] });
            }, 
        );
    }


    // Assets services
    private _downloadFile(path: string, name: string): void {
        let link = document.createElement('a');
        link.setAttribute('type', 'hidden');
        link.href = path;
        link.download = name;
        document.body.appendChild(link);
        link.click();
        link.remove();
    }

    DownloadResume(): void {
        this._downloadFile("assets/files/resume.pdf", "Peeradon's resume");
    }

    DownloadTranscriptTh(): void {
        this._downloadFile("assets/files/transcript-thai.pdf", "Peeradon's transcript-th");
    }

    DownloadTranscriptEn(): void {
        this._downloadFile("assets/files/transcript-english.pdf", "Peeradon's transcript-en");
    }
}
