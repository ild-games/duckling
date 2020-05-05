import { Injectable } from '@angular/core';

export type KeyboardHandler = (event: KeyboardEvent) => void;
type RegisteredKeyboardHandlers = { [id: number]: KeyboardHandler };

export interface IWindowService {
    subscribeKeyDownHandler(event: KeyboardHandler): number;
    unsubscribeKeyDownHandler(handlerId: number): void;

    subscribeKeyPressHandler(event: KeyboardHandler): number;
    unsubscribeKeyPressHandler(handlerId: number): void;

    subscribeKeyUpHandler(event: KeyboardHandler): number;
    unsubscribeKeyUpHandler(handlerId: number): void;
}

@Injectable()
export class WindowService implements IWindowService {
    private _nextKeyDownHandlerId = 0;
    private _keyDownHandlers: RegisteredKeyboardHandlers = {};

    private _nextKeyPressHandlerId = 0;
    private _keyPressHandlers: RegisteredKeyboardHandlers = {};

    private _nextKeyUpHandlerId = 0;
    private _keyUpHandlers: RegisteredKeyboardHandlers = {};

    constructor() {
        window.onkeydown = (event: KeyboardEvent) => this._keyDownMultiplexer(event);
        window.onkeypress = (event: KeyboardEvent) => this._keyPressMultiplexer(event);
        window.onkeyup = (event: KeyboardEvent) => this._keyUpMultiplexer(event);
    }

    subscribeKeyDownHandler(event: KeyboardHandler): number {
        const id = this._nextKeyDownHandlerId;

        this._keyDownHandlers[id] = event;

        this._nextKeyDownHandlerId++;
        return id;
    }

    unsubscribeKeyDownHandler(handlerId: number) {
        delete this._keyDownHandlers[handlerId];
    }

    private _keyDownMultiplexer(event: KeyboardEvent) {
        for (let handler of Object.values(this._keyDownHandlers)) {
            handler(event);
        }
    }

    subscribeKeyPressHandler(event: KeyboardHandler): number {
        const id = this._nextKeyPressHandlerId;

        this._keyPressHandlers[id] = event;

        this._nextKeyPressHandlerId++;
        return id;
    }

    unsubscribeKeyPressHandler(handlerId: number) {
        delete this._keyPressHandlers[handlerId];
    }

    private _keyPressMultiplexer(event: KeyboardEvent) {
        for (let handler of Object.values(this._keyPressHandlers)) {
            handler(event);
        }
    }

    subscribeKeyUpHandler(event: KeyboardHandler): number {
        const id = this._nextKeyUpHandlerId;

        this._keyUpHandlers[id] = event;

        this._nextKeyUpHandlerId++;
        return id;
    }

    unsubscribeKeyUpHandler(handlerId: number) {
        delete this._keyUpHandlers[handlerId];
    }

    private _keyUpMultiplexer(event: KeyboardEvent) {
        for (let handler of Object.values(this._keyUpHandlers)) {
            handler(event);
        }
    }
}
