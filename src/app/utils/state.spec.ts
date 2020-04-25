import { immutableDelete } from "./state";

describe('state', () => {
    describe('immutableDelete', () => {
        it('removes the element in an object hash that has the provided key', () => {
            let objectToTest = {
                'a': 1,
                'b': 2,
                'c': 3,
            };

            const objectWithKeyRemoved = immutableDelete(objectToTest, 'a');

            expect((objectWithKeyRemoved as any).a).toBeUndefined();
            expect(objectWithKeyRemoved.b).toBeDefined();
            expect(objectWithKeyRemoved.c).toBeDefined();
        });

        it('does nothing when provided a key that does not exist in the given object hash', () => {
            let objectToTest = {
                'a': 1,
                'b': 2,
                'c': 3,
            };

            const objectWithKeyRemoved = immutableDelete(objectToTest, 'z');

            expect(objectWithKeyRemoved.a).toBeDefined();
            expect(objectWithKeyRemoved.b).toBeDefined();
            expect(objectWithKeyRemoved.c).toBeDefined();
            expect((objectWithKeyRemoved as any).z).toBeUndefined();
        });

        it('returns the provided object hash when the object hash is falsy', () => {
            expect(immutableDelete(undefined, 'a')).toBeUndefined();
            expect(immutableDelete(null, 'a')).toBeNull();
        });

        it('returns the provided object hash when the key is falsy', () => {
            let objectToTest = {
                'a': 1,
                'b': 2,
                'c': 3,
            };

            expect(immutableDelete(objectToTest, undefined)).toEqual(objectToTest);
            expect(immutableDelete(objectToTest, null)).toEqual(objectToTest);
            expect(immutableDelete(objectToTest, '')).toEqual(objectToTest);
        });
    });
});
