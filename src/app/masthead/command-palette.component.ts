import { Component, ElementRef, ViewChild } from '@angular/core';
import { setCssVariable } from '../utils/css';

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
                    placeholder='Quick command... (Alt-p)'
                    (focus)='focus($event)'
                    (blur)='blur($event)' />
            </div>

            <div class='expanded-rows'>
                
            </div>
        </div>
    `
})
export class CommandPaletteComponent {
    @ViewChild('input') input: ElementRef;

    constructor() {
        setCssVariable('--dk-command-palette-height', '500px');
    }

    focus() {
        this.input.nativeElement.focus();
    }

    blur() {
        this.input.nativeElement.value = '';
    }
}
