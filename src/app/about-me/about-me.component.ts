import { Component } from '@angular/core';

import { AppearanceService } from '../appearance.service';


@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent {
    
    constructor(public Theme: AppearanceService) {}

    ModalView(): void {
        let container: HTMLElement = document.getElementById("container")!;
        let modal: HTMLElement = document.getElementById("modal-img")!;
        
        modal.style.display = "block";
        container.classList.add("blur");
    }

    ModalClose(): void {
        let container: HTMLElement = document.getElementById("container")!;
        let modal: HTMLElement = document.getElementById("modal-img")!;

        modal.style.display = "none";
        container.classList.remove("blur");
    }
}
