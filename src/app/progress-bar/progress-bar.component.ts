import { Component, Input } from '@angular/core';

import { AppearanceService } from '../appearance.service';


@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent {
    @Input() percent: number = 0;
    @Input() clickable: boolean;
    @Input() startAnimation: boolean;

    constructor(public theme: AppearanceService) {}
}
