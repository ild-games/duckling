import { lightTheme } from './light';
import { darkTheme } from './dark';

export interface IColorThemeSpecification {
    //#region TODO REMOVE
    TODO_REMOVE_highlightColor: string;
    TODO_REMOVE_highlightColorTransparent: string;
    //#endregion

    //#region Typography
    typographyUnderstated: string;
    typographyDefault: string;
    typographyEmphasized: string;
    //#endregion

    //#region Backgrounds and borders
    backgroundPrimary: string;
    backgroundSecondary: string;
    //#endregion

    //#region Row hover, selection
    rowHover: string;
    rowSelection: string;
    //#endregion

    //#region Buttons
    neutralButton: string;
    ////#endregion
}

export type ColorTheme = (
    | 'light' 
    | 'dark'
);

const themes: { [key in ColorTheme]: IColorThemeSpecification } = {
    light: lightTheme,
    dark: darkTheme,
};

export function activate(colorTheme: ColorTheme) {
    function setCssVariable(propertyName: string, value: any) {
        document.documentElement.style.setProperty(propertyName, value);
    }

    const spec = themes[colorTheme];

    //#region TODO REMOVE
    setCssVariable('--TODO_REMOVE_dk-highlight-color', spec.TODO_REMOVE_highlightColor);
    setCssVariable('--TODO_REMOVE_dk-highlight-color-transparent', spec.TODO_REMOVE_highlightColorTransparent);
    //#endregion

    //#region Typography
    setCssVariable('--dk-typography-understated', spec.typographyUnderstated);
    setCssVariable('--dk-typography-default', spec.typographyDefault);
    setCssVariable('--dk-typography-emphasized', spec.typographyEmphasized);
    //#endregion

    //#region Background and borders
    setCssVariable('--dk-background-primary', spec.backgroundPrimary);
    setCssVariable('--dk-background-secondary', spec.backgroundSecondary);
    //#endregion

    //#region Row hover, selection
    setCssVariable('--dk-row-hover', spec.rowHover);
    setCssVariable('--dk-row-selection', spec.rowSelection);
    //#endregion

    //#region Buttons
    setCssVariable('--dk-neutral-button', spec.neutralButton);
    //#endregion
}
