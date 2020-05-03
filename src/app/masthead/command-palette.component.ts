import { Component, ElementRef, ViewChild } from '@angular/core';
import { setCssVariable } from '../utils/css';
import { ICommand, CommandService } from '../command/command.service';
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
                    (blur)='blur()'
                    (input)='search($event.target.value)' />
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
    private _rowHeight = 23;
    private _queryRowHeight = 50;
    private _queryRowExpandedHeight = 60;
    private _maxExpandedHeight = 500;

    constructor(
        private _commandService: CommandService,
        private _windowService: WindowService,
    ) {
        setCssVariable(
            '--dk-command-palette-row-height',
            `${this._rowHeight}px`);

        setCssVariable(
            '--dk-command-palette-expanded-rows-max-height',
            `${this._maxExpandedHeight - this._queryRowHeight}px`);
    }

    focus() {
        if (this._focused) {
            return;
        }

        this._focused = true;
        this.input.nativeElement.focus();

        this._keyDownSubscription = this._windowService.subscribeKeyDownHandler((event) => {
            this._keyDownWhileActive(event);
        });

        this.search('');
    }

    blur() {
        if (!this._focused) {
            return;
        }

        this._focused = false;

        (document.activeElement as any).blur();

        this.input.nativeElement.value = '';

        this._windowService.unsubscribeKeyDownHandler(this._keyDownSubscription);
    }

    search(query: string) {
        this.queriedRows = this._commandService.search(query);

        this._resetUI();
    }

    runCommand(command: ICommand) {
        command.callback();
    }

    queryRowCssClasses(rowIndex: number): string {
        return [
            'queried-row',
            rowIndex === this._quickSelectRow ? 'quick-select-row' : '',
        ].join(' ').trim();
    }

    private _resetUI() {
        this._setHeight();
        this._quickSelectRow = 0;
    }

    private _setHeight() {
        let newHeight = this.queriedRows.length === 0
            ? this._queryRowHeight
            : this._queryRowExpandedHeight + (this._rowHeight * this.queriedRows.length);
        newHeight = Math.min(newHeight, this._maxExpandedHeight)

        setCssVariable('--dk-command-palette-height', `${newHeight}px`);
    }

    private _keyDownWhileActive(event: KeyboardEvent): void {
        if (event.key.toLowerCase() === 'escape') {
            this.blur();
            return;
        }

        if (!this.queriedRows || this.queriedRows.length === 0) {
            return;
        }

        this._processKeyAction(event.key);
    }

    private _processKeyAction(key: string) {
        switch (key.toLowerCase()) {
            case 'enter':
                this.runCommand(this.queriedRows[this._quickSelectRow]);
                this.blur();
                break;

            case 'arrowdown':
                this._incrementQuickSelectRow();
                break;

            case 'arrowup':
                this._decrementQuickSelectRow();
                break;
        }
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
