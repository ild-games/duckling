import { Component, ElementRef, ViewChild } from '@angular/core';
import { setCssVariable } from '../utils/css';
import { ICommand, CommandService } from '../command.service';
import { WindowService } from '../utils/window.service';

@Component({
    selector: 'dk-command-palette',
    styleUrls: [ './command-palette.component.scss' ],
    template: `
        <div class='container'>

            <div class='first-row'>
                <div
                    class='icon'
                    (click)='focus()'>

                    <clr-icon
                        shape='scroll'
                        size='32'>
                    </clr-icon>
                </div>

                <input #input
                    class='command-input'
                    id='search_input'
                    type='text'
                    placeholder='Quick command... (Alt)'
                    (click)='focus()'
                    (focus)='focus()'
                    (blur)='blur($event)'
                    (input)='queryUpdated($event)' />
            </div>

            <div class='expanded-rows'>
                <a 
                    *ngFor='let row of queriedRows; let i = index'
                    class='{{queryRowCssClasses(i)}}'
                    (mousedown)='runCommand(row)'>

                    {{row.name}}
                </a>
            </div>
        </div>
    `
})
export class CommandPaletteComponent {
    @ViewChild('input') input: ElementRef;
    queriedRows: ICommand[] = [];
    private _quickSelectRow = 0;
    private _keyDownSubscription: number;
    private _focused = false;

    constructor(
        private _commandService: CommandService,
        private _windowService: WindowService,
    ) {
    }

    focus() {
        if (this._focused) {
            return;
        }
        console.log('focus');

        this._focused = true;
        this.input.nativeElement.focus();

        this._keyDownSubscription = this._windowService.subscribeKeyDownHandler((event) => {
            this._keyDownWhileActive(event);
        });

        this._search('');
    }

    blur() {
        if (!this._focused) {
            return;
        }

        console.log('blur');
        this._focused = false;

        this.input.nativeElement.value = '';

        this._windowService.unsubscribeKeyDownHandler(this._keyDownSubscription);
    }

    queryUpdated(query: InputEvent) {
        this._search((query.target as any).value);
    }

    runCommand(command: ICommand) {
        command.callback();
    }

    private _search(query: string) {
        this.queriedRows = this._commandService.search(query);

        this._resetUI();
    }

    private _resetUI() {
        this._setHeight();
        this._quickSelectRow = 0;
    }

    private _setHeight() {
        let newHeight = this.queriedRows.length === 0 
            ? 50
            : 60 + (23 * this.queriedRows.length);
        newHeight = Math.min(newHeight, 500)

        setCssVariable('--dk-command-palette-height', `${newHeight}px`);
    }

    queryRowCssClasses(rowIndex: number): string {
        return [
            'queried-row',
            rowIndex === this._quickSelectRow ? 'quick-select-row' : '',
        ].join(' ');
    }

    private _keyDownWhileActive(event: KeyboardEvent): void {
        if (event.key.toLowerCase() === 'escape') {
            this._blurNativeElement();
        }

        if (!this.queriedRows || this.queriedRows.length === 0) {
            return;
        }

        switch (event.key.toLowerCase()) {
            case 'enter':
                this.runCommand(this.queriedRows[this._quickSelectRow]);
                this._blurNativeElement();
                break;

            case 'arrowdown':
                this._incrementQuickSelectRow();
                break;

            case 'arrowup':
                this._decrementQuickSelectRow();
                break;
        }
    }

    private _blurNativeElement() {
        (document.activeElement as any).blur();
    }

    private _incrementQuickSelectRow() {
        this._quickSelectRow === this.queriedRows.length - 1
            ? this._quickSelectRow = 0
            : this._quickSelectRow++;
    }

    private _decrementQuickSelectRow() {
        this._quickSelectRow === 0
            ? this._quickSelectRow = this.queriedRows.length - 1
            : this._quickSelectRow--;
    }
}
