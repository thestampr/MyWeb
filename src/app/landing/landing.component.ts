import { Component } from '@angular/core';

import { AppearanceService } from '../appearance.service';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {

    constructor(public Theme: AppearanceService) {}
}
