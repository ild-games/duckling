import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'dk-dockable-tab',
    styleUrls: ['dockable-tab.component.scss'],
    template: `
        <li
            role='presentation'
            [class]='tabCssClasses'
        >
            <button
                type='button'
                [class]='tabButtonCssClasses'
                (click)='onClickedTab()'
                [attr.aria-selected]='isActive'
            >
                {{name}}
            </button>
            <div
                class='close-button'
            >
                <clr-icon
                    size='16'
                    attr.shape='{{closeIconShape}}'
                    [class]='closeButtonCssClasses'
                    (mouseenter)='onMouseEnterCloseButton()'
                    (mouseleave)='onMouseLeaveCloseButton()'
                >
                </clr-icon>
            </div>
        </li>
    `
})
export class DockableTabComponent {
    @Input() isActive = false;
    @Input() name: string;
    @Output() tabClick = new EventEmitter();

    private _isCloseButtonHovered = false;

    onMouseEnterCloseButton() {
        this._isCloseButtonHovered = true;
    }

    onMouseLeaveCloseButton() {
        this._isCloseButtonHovered = false;
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