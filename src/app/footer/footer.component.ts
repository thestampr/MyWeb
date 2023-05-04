import { Component } from '@angular/core';

import { AppearanceService } from '../appearance.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

    constructor(public theme: AppearanceService) {}
}
