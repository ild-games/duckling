import { Selector, Comparator } from '@angular-redux/store';
import { IDucklingState } from '../main.state';

export declare function dkSelect<T>(selector?: Selector<IDucklingState, T>, comparator?: Comparator): PropertyDecorator;
