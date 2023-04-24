import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AppearanceService } from '../appearance.service';


function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

    constructor(public Theme: AppearanceService, private _snackBar: MatSnackBar) {}

    async HireMe() {
        let card: HTMLElement = document.getElementById("card")!;

        card.style.scale = "1.05";
        card.style.boxShadow = "0 10px 10px rgba(0, 0, 0, 0.1";
        await delay(750);
        card.style.scale = "1.0";
        card.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1";
    }

    OnCopy() {
        this._snackBar.open("Copied!", "Done", {duration: 5000});
    }
}
