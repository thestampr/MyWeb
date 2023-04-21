import { Component } from '@angular/core';

import { AppearanceService } from '../appearance.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

    constructor (public Theme: AppearanceService) {}
}
