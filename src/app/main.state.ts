import { Action } from 'redux';
import { IDockState, defaultDockState, dockReducer, ITabAction } from './controls/dock/dock.state';
import { IColorThemeState, defaultColorThemeState, colorThemeReducer } from './shell/colorthemes/color-theme.state';

export interface IDucklingState {
    dock: IDockState;
    colorTheme: IColorThemeState;
}

export const INITIAL_DUCKLING_STATE: IDucklingState = {
    dock: defaultDockState,
    colorTheme: defaultColorThemeState,
};

export function mainReducer(state: IDucklingState, action: Action) {
    return {
        dock: dockReducer(state.dock, action as ITabAction),
        colorTheme: colorThemeReducer(state.colorTheme, action),
    };
}
