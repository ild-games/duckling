import { Injectable } from '@angular/core';
import { activate as activateColorScheme, ColorTheme } from './color-theme';

@Injectable()
export class ColorThemeService {
    public activate(colorTheme: ColorTheme) {
        activateColorScheme(colorTheme);
    }
}
