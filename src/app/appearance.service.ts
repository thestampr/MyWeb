import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class AppearanceService {
    private _dark: boolean;

    constructor() {}

    get is_dark(): boolean {
        return this._dark;
    }

    set is_dark(dark: boolean) {
        this._dark = dark;
    }
}
