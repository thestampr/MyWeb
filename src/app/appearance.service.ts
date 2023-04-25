import { Injectable } from '@angular/core';

const theme_key: string = "dark_theme";

const dark: string = "#111111";
const white: string = "#E0E0E0";


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

    get primary_color(): string {
        return this._dark? dark: white;
    }
}