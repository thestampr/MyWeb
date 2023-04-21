import { Injectable } from '@angular/core';

const theme_key: string = "dark_theme";


@Injectable({
    providedIn: 'root'
})
export class AppearanceService {
    private _dark: boolean = (localStorage.getItem(theme_key) === "true");

    constructor() {}

    get is_dark(): boolean {
        return this._dark;
    }

    set is_dark(dark: boolean) {
        this._dark = dark;

        localStorage.setItem(theme_key, String(dark));
    }
}
