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
                [title]='name'
                [class]='tabButtonCssClasses'
                [attr.aria-selected]='isActive'
                (click)='onTabClick()'
                (mouseup)='$event.which === 2 ? onCloseClick() : null'>
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
                    (click)='onCloseClick()'>
                </clr-icon>
            </div>
        </li>

        <div class='divider'>
        </div>

        <li *ngIf='isLastTab'>
            <clr-icon
                attr.shape='{{addIconShape}}'
                [class]='addButtonCssClasses'
                (mouseenter)='onMouseEnterAddButton()'
                (mouseleave)='onMouseLeaveAddButton()'
                (click)='onAddPaneClick()'>
            </clr-icon>
        </li>
    `
})
export class PaneTabComponent {
    @Input() isActive = false;
    @Input() canClose = true;
    @Input() isLastTab = false;
    @Input() name: string;
    @Output() tabClick = new EventEmitter();
    @Output() closeClick = new EventEmitter();
    @Output() addPaneClick = new EventEmitter();

    private _isCloseButtonHovered = false;
    private _isAddButtonHovered = false;

    onMouseEnterCloseButton() {
        this._isCloseButtonHovered = true;
    }

    onMouseLeaveCloseButton() {
        this._isCloseButtonHovered = false;
    }

    onCloseClick() {
        this.closeClick.emit(null);
    }

    onTabClick() {
        this.tabClick.emit(null);
    }

    onAddPaneClick() {
        this.addPaneClick.emit(null);
    }

    onMouseEnterAddButton() {
        this._isAddButtonHovered = true;
    }

    onMouseLeaveAddButton() {
        this._isAddButtonHovered = false;
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
        return this._isCloseButtonHovered ? 'times-circle' : 'times';
    }

    get closeButtonCssClasses(): string {
        return [
            this._isCloseButtonHovered ? 'is-solid' : '',
        ].join(' ').trim();
    }

    get addIconShape(): string {
        return this._isAddButtonHovered ? 'plus-circle' : 'plus';
    }

    get addButtonCssClasses(): string {
        return [
            this._isAddButtonHovered ? 'is-solid' : '',
            'add-icon'
        ].join(' ').trim();
    }
}
