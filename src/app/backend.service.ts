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
        private activatedRoute: ActivatedRoute, 
    ) { }

    public get isMobile(): boolean {
        const toMatch = [
            /Android/i,
            /webOS/i,
            /iPhone/i,
            /iPad/i,
            /iPod/i,
            /BlackBerry/i,
            /Windows Phone/i
        ];
        
        return toMatch.some((toMatchItem) => {
            return navigator.userAgent.match(toMatchItem);
        });
    }

    public get isHardwareAccelerationEnabled(): boolean {
        // thanks, ChatGPT!. its not work

        const testElement = document.createElement('div');
        testElement.style.transform = 'translate3d(0, 0, 0)';
        
        const style = window.getComputedStyle(testElement);
        const transformValue = style.getPropertyValue('transform');
        
        // Check if the transform property is preserved and not an empty string
        // return transformValue !== '' && transformValue !== 'none';
        return true
    }


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
    public isFileExist(file: string): boolean {
        var http = new XMLHttpRequest();
        http.open('HEAD', file, false);
        http.send();
        return http.status != 404;
    }

    public Download(path: string, name: string): void {
        let link = document.createElement('a');
        link.setAttribute('type', 'hidden');
        link.href = path;
        link.download = name;
        document.body.appendChild(link);
        link.click();
        link.remove();
    }

    public DownloadResume(): void {
        this.Download("assets/files/resume.pdf", "Peeradon's resume");
    }

    public DownloadTranscriptTh(): void {
        this.Download("assets/files/transcript-thai.pdf", "Peeradon's transcript-th");
    }

    public DownloadTranscriptEn(): void {
        this.Download("assets/files/transcript-english.pdf", "Peeradon's transcript-en");
    }
}
