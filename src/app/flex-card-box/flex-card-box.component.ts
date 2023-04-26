import { Component, Input } from '@angular/core';

import { IconCard } from '../icon-card';


@Component({
  selector: 'app-flex-card-box',
  templateUrl: './flex-card-box.component.html',
  styleUrls: ['./flex-card-box.component.css']
})
export class FlexCardBoxComponent {
    @Input() name: string = "";
    @Input() one_col: boolean = false;
    @Input() items: IconCard[] = [];
}
