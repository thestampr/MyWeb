import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})
export class ModelsComponent {
    constructor(public router: Router) {}
}
