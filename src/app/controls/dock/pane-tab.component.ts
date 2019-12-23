import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'dk-pane-tab',
    styleUrls: ['pane-tab.component.scss'],
    template: `
        <li
            role='presentation'
            [class]='tabCssClasses'>
            <button
                type='button'
                [class]='tabButtonCssClasses'
                (click)='onClickedTab()'
                [attr.aria-selected]='isActive'>
                {{name}}
            </button>
            <div
                *ngIf='canClose'
                class='close-button'>
                <clr-icon
                    size='16'
                    attr.shape='{{closeIconShape}}'
                    [class]='closeButtonCssClasses'
                    (mouseenter)='onMouseEnterCloseButton()'
                    (mouseleave)='onMouseLeaveCloseButton()'
                    (click)='onClickedClose()'>
                </clr-icon>
            </div>
        </li>
        <div class='divider'>
        </div>
    `
})
export class PaneTabComponent {
    @Input() isActive = false;
    @Input() canClose = true;
    @Input() name: string;
    @Output() tabClick = new EventEmitter();
    @Output() closeClick = new EventEmitter();

    private _isCloseButtonHovered = false;

    onMouseEnterCloseButton() {
        this._isCloseButtonHovered = true;
    }

    onMouseLeaveCloseButton() {
        this._isCloseButtonHovered = false;
    }

    onClickedClose() {
        this.closeClick.emit(null);
    }

    onClickedTab() {
        this.tabClick.emit(null);
    }

    get tabButtonCssClasses(): string {
        return [
            'btn',
            'btn-link',
            'nav-link',
            this.isActive ? 'active' : '',
        ].join(' ').trim();
    }

    get tabCssClasses(): string {
        return [
            'nav-item',
            this.isActive ? 'nav-item-active' : 'nav-item-inactive',
        ].join(' ').trim();
    }

    get closeIconShape(): string {
        return this._isCloseButtonHovered ? 'times-circle' : 'window-close';
    }

    get closeButtonCssClasses(): string {
        return [
            this._isCloseButtonHovered ? 'is-solid' : '',
        ].join(' ').trim();
    }
}
