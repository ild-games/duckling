import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { WindowService } from '../utils/window.service';
import { CommandPaletteComponent } from './command-palette.component';

@Component({
    selector: 'dk-masthead',
    styleUrls: [ './masthead.component.scss' ],
    template: `
        <header class='header-6'>
            <div class='header-content'>
                <div class='title'>
                    <clr-icon
                        size='48'
                        shape='scissors'>
                    </clr-icon>
                </div>

                <div class='command-palette-container'>
                    <dk-command-palette #commandPalette>
                    </dk-command-palette>
                </div>

                <div class='right'>
                </div>
            </div>
        </header>
    `
})
export class MastheadComponent implements OnInit, OnDestroy {
    @ViewChild('commandPalette') commandPalette: CommandPaletteComponent;
    private _commandPaletteHandlerId: number;

    constructor(
        private _window: WindowService,
    ) {
    }

    ngOnInit() {
        this._commandPaletteHandlerId = this._window.subscribeKeyUpHandler((event) => {
            this._commandPaletteShortcutHandler(event);
        });
    }

    ngOnDestroy() {
        this._window.unsubscribeKeyUpHandler(this._commandPaletteHandlerId);
    }

    private _commandPaletteShortcutHandler(event: KeyboardEvent) {
        if (!this._isCommandPaletteShortcut(event)) {
            return;
        }

        this.commandPalette.focus();
    }

    private _isCommandPaletteShortcut(event: KeyboardEvent) {
        return (
            event.key.toLowerCase() === 'p' && 
            event.altKey
        );
    }
}
