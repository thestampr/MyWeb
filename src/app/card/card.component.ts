import { Component, Input } from '@angular/core';

import { AppearanceService } from '../appearance.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
    
    @Input() fullWidth: boolean;
    @Input() fullHeight: boolean;
    @Input() justBorder: boolean;
    @Input() transparent: boolean = true;

    constructor (public theme: AppearanceService) {}
}
