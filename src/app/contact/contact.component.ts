import { Component } from '@angular/core';

import { AppearanceService } from '../appearance.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

    constructor(public Theme: AppearanceService) {}
}
