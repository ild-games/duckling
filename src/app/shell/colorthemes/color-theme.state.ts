import { ColorTheme } from './color-theme';
import { Action } from 'redux';
import { Injectable } from '@angular/core';

export interface IColorThemeState {
    activeColorTheme: ColorTheme;
}

export const defaultColorThemeState: IColorThemeState = {
    activeColorTheme: 'light',
};

export function colorThemeReducer(state: IColorThemeState, action: Action): IColorThemeState {
    if (action.type === ColorThemeActions.CHANGE_ACTIVE_COLOR_THEME) {
        return {
            ...state,
            activeColorTheme: (action as IActiveColorThemeAction).newActiveColorTheme,
        };
    }

    return state;
}

interface IActiveColorThemeAction extends Action {
    newActiveColorTheme: ColorTheme;
}

@Injectable()
export class ColorThemeActions {
    static CHANGE_ACTIVE_COLOR_THEME = 'CHANGE_ACTIVE_COLOR_THEME';

    changeActiveColorTheme(newActiveColorTheme: ColorTheme): IActiveColorThemeAction {
        return {
            type: ColorThemeActions.CHANGE_ACTIVE_COLOR_THEME,
            newActiveColorTheme,
        };
    }
}
