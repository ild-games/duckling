import { Selector, Comparator, select } from '@angular-redux/store';
import { IDucklingState } from '../main.state';

export function dkSelect<T>(selector?: Selector<IDucklingState, T>, comparator?: Comparator): PropertyDecorator {
    return select(selector, comparator);
}
