import { WindowService } from './window.service';

describe('WindowService', () => {
    let service: WindowService;

    beforeEach(() => {
        service = new WindowService();
    });

    it('lets you subscribe a key down handler', () => {
        const spy = jasmine.createSpy('spy');
        const keyDownEvent = (event: KeyboardEvent) => {
            expect(event.key.toLowerCase() === 'p');
            spy();
        };

        const handlerId = service.subscribeKeyDownHandler(keyDownEvent);
        window.dispatchEvent(new KeyboardEvent('keydown', {key: 'p'}));
        expect(spy).toHaveBeenCalled();

        service.unsubscribeKeyDownHandler(handlerId);
    });

    it('lets you subscribe a key up handler', () => {
        const spy = jasmine.createSpy('spy');
        const keyUpEvent = (event: KeyboardEvent) => {
            expect(event.key.toLowerCase() === 'p');
            spy();
        };

        const handlerId = service.subscribeKeyUpHandler(keyUpEvent);
        window.dispatchEvent(new KeyboardEvent('keyup', {key: 'p'}));
        expect(spy).toHaveBeenCalled();

        service.unsubscribeKeyUpHandler(handlerId);
    });

    it('lets you subscribe a key press handler', () => {
        const spy = jasmine.createSpy('spy');
        const keyPressEvent = (event: KeyboardEvent) => {
            expect(event.key.toLowerCase() === 'p');
            spy();
        };

        const handlerId = service.subscribeKeyPressHandler(keyPressEvent);
        window.dispatchEvent(new KeyboardEvent('keypress', {key: 'p'}));
        expect(spy).toHaveBeenCalled();

        service.unsubscribeKeyPressHandler(handlerId);
    });

    it('lets you subscribe to multiple handlers', () => {
        const spyDownOne = jasmine.createSpy('spyDownOne');
        const keyDownEventOne = (event: KeyboardEvent) => {
            expect(event.key.toLowerCase() === 'p');
            spyDownOne();
        };
        const spyDownTwo = jasmine.createSpy('spyDownTwo');
        const keyDownEventTwo = (event: KeyboardEvent) => {
            expect(event.key.toLowerCase() === 'p');
            spyDownTwo();
        };
        const spyUpOne = jasmine.createSpy('spyUpTwo');
        const keyUpEventOne = (event: KeyboardEvent) => {
            expect(event.key.toLowerCase() === 'p');
            spyUpOne();
        };

        const handlerIdDownOne = service.subscribeKeyDownHandler(keyDownEventOne);
        const handlerIdDownTwo = service.subscribeKeyDownHandler(keyDownEventTwo);
        const handlerIdUpOne = service.subscribeKeyUpHandler(keyUpEventOne);

        window.dispatchEvent(new KeyboardEvent('keydown', {key: 'p'}));
        window.dispatchEvent(new KeyboardEvent('keydown', {key: 'p'}));
        window.dispatchEvent(new KeyboardEvent('keyup', {key: 'p'}));

        expect(spyDownOne).toHaveBeenCalledTimes(2);
        expect(spyDownTwo).toHaveBeenCalledTimes(2);
        expect(spyUpOne).toHaveBeenCalledTimes(1);

        service.unsubscribeKeyDownHandler(handlerIdDownOne);
        service.unsubscribeKeyDownHandler(handlerIdDownTwo);
        service.unsubscribeKeyUpHandler(handlerIdUpOne);
    });

    it('lets you unsubscribe previously subscribed handlers', () => {
        const spy = jasmine.createSpy('spy');
        const keyDownEvent = (event: KeyboardEvent) => {
            expect(event.key.toLowerCase() === 'p');
            spy();
        };

        const handlerId = service.subscribeKeyDownHandler(keyDownEvent);
        window.dispatchEvent(new KeyboardEvent('keydown', {key: 'p'}));

        expect(spy).toHaveBeenCalled();

        service.unsubscribeKeyDownHandler(handlerId);

        window.dispatchEvent(new KeyboardEvent('keydown', {key: 'p'}));

        expect(spy).toHaveBeenCalledTimes(1);
    });
});
