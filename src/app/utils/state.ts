import { Selector, Comparator, select } from '@angular-redux/store';
import { IDucklingState } from '../main.state';

export function dkSelect<T>(selector?: Selector<IDucklingState, T>, comparator?: Comparator): PropertyDecorator {
    return select(selector, comparator);
}

export function assertNever(_: never) {
}

export function immutableDelete<T extends {}, U extends (string | number)>(object: T, key: U): Omit<T, U> {
    if (!object) {
        return object;
    }

    const {
        [key]: _removedValue,
        /* istanbul ignore next */ ...objectWithRemovedValue
    } = object;

    return objectWithRemovedValue;
}
