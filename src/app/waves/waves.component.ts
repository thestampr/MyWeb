import { Component } from '@angular/core';

import { AppearanceService } from '../appearance.service';


@Component({
    selector: 'app-waves',
    templateUrl: './waves.component.html',
    styleUrls: ['./waves.component.css']
})
export class WavesComponent {

    constructor(public theme: AppearanceService) {}
}
