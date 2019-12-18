import { lightTheme } from './light';
import { darkTheme } from './dark';

export interface IColorThemeSpecification {
    highlightColor: string;
    highlightColorTransparent: string;
}

export type ColorTheme = 'light' | 'dark';

const themes: { [key in ColorTheme]: IColorThemeSpecification } = {
    light: lightTheme,
    dark: darkTheme,
};

export function activate(colorTheme: ColorTheme) {
    function setCssVariable(propertyName: string, value: any) {
        document.documentElement.style.setProperty(propertyName, value);
    }

    const spec = themes[colorTheme];

    setCssVariable('--dk-highlight-color', spec.highlightColor);
    setCssVariable('--dk-highlight-color-transparent', spec.highlightColorTransparent);
}
