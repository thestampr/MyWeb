import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppearanceService } from '../appearance.service';


@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit{
    
    constructor(
        public theme: AppearanceService, 
        public router: Router
    ) {
        router.events.subscribe(() => {
            this.ngOnInit();
        });
    }

    ngOnInit(): void {
    }
}
