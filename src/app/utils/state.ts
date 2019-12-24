import { Selector, Comparator, select } from '@angular-redux/store';
import { IDucklingState } from '../main.state';

export function dkSelect<T>(selector?: Selector<IDucklingState, T>, comparator?: Comparator): PropertyDecorator {
    return select(selector, comparator);
}

export function assertNever(_: never) {
}

type ObjectHash<ValueType> = { [objKey in (string | number)]: ValueType };
export function removeByKey<ValueType>(object: ObjectHash<ValueType>, key: (string | number)): ObjectHash<ValueType> {
    const { [key]: removedValue, ...objectWithRemovedValue } = object;
    return objectWithRemovedValue;
}

export function removeByKeys<ValueType>(object: ObjectHash<ValueType>, keys: (string | number)[]): ObjectHash<ValueType> {
    for (let key in keys) {
        object = removeByKey(object, key);
    }

    return object;
}
