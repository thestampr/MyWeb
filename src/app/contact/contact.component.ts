import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AppearanceService } from '../appearance.service';

import * as utils from '../utils';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

    constructor(public theme: AppearanceService, private _snackBar: MatSnackBar) {}

    async HireMe() {
        let card: HTMLElement = document.getElementById("card")!;

        card.style.scale = "1.05";
        card.style.boxShadow = "0 10px 10px rgba(0, 0, 0, 0.1";

        await utils.delay(750);
        
        card.style.scale = "1.0";
        card.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1";
    }

    OnCopy() {
        this._snackBar.open("Copied!", "Done", {duration: 3000});
    }
}
