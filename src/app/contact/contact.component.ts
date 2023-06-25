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

    HireMe() {
        utils.animateCSS("#personal_wrapper", "pulse");
    }

    OnCopy() {
        this._snackBar.open("Copied!", "Done", {
            duration: 3000, 
            horizontalPosition: "center", 
            verticalPosition: "bottom"
        });
    }
}
