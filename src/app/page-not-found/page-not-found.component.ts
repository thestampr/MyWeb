import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AppearanceService } from '../appearance.service';


@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent {

    constructor(public Theme: AppearanceService, public Router: Router) {}
}
