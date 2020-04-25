import { ColorTheme } from './color-theme';

export interface IColorThemeState {
    activeColorTheme: ColorTheme;
}

export const defaultColorThemeState: IColorThemeState = {
    activeColorTheme: 'light',
};

export function colorThemeReducer(state: IColorThemeState = defaultColorThemeState, action: IColorThemeAction): IColorThemeState {
    switch (action.type) {
        case 'CHANGE_ACTIVE_COLOR_THEME': {
            return {
                ...state,
                activeColorTheme: action.newActiveColorTheme,
            };
        }

        // when a second action is added, change to: `default: assertNever(action)`
        default: return state;
    }
}

export type IColorThemeAction = (
    | ReturnType<typeof colorThemeActions.changeActiveColorTheme>
);

export const colorThemeActions = {
    changeActiveColorTheme(newActiveColorTheme: ColorTheme) {
        return {
            type: 'CHANGE_ACTIVE_COLOR_THEME' as const,
            newActiveColorTheme,
        };
    },
};
