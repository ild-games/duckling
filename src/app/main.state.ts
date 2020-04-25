import { combineReducers } from 'redux';
import { IDockState, dockReducer } from './controls/dock/dock.state';
import { IColorThemeState, colorThemeReducer } from './shell/colorthemes/color-theme.state';

export interface IDucklingState {
    dock: IDockState;
    colorTheme: IColorThemeState;
}

export const mainReducer = combineReducers({
    dock: dockReducer,
    colorTheme: colorThemeReducer,
});
