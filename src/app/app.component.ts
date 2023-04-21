import { Component } from '@angular/core';

import { AppearanceService } from './appearance.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'resume';

    constructor(public Theme: AppearanceService) {}
}
