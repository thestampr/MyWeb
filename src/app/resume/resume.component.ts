import { Component } from '@angular/core';

import { AppearanceService } from '../appearance.service';
import { BackendService } from '../backend.service';


@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent {

    constructor(public Theme: AppearanceService, public Backend: BackendService) {}
}
