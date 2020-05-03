import { CommandService } from "./command.service";

describe('CommandService', () => {
    let commandService: CommandService;

    beforeEach(() => {
        commandService = new CommandService();
    });

    it('lets you register a command and retrieve it', () => {
        const spy = jasmine.createSpy('spy');
        const callback = () => {
            spy();
        };

        const id = commandService.register({
            name: 'Toggle light/dark color scheme',
            callback,
        });

        commandService.retrieve(id).callback();

        expect(spy).toHaveBeenCalled();
    });

    it('lets you deregister a previously registered command', () => {
        const spy = jasmine.createSpy('spy');
        const callback = () => {
            spy();
        };

        const id = commandService.register({
            name: 'Toggle light/dark color scheme',
            callback,
        });

        commandService.retrieve(id).callback();

        expect(spy).toHaveBeenCalled();

        commandService.deregister(id);

        expect(commandService.retrieve(id)).toBeUndefined();
    });

    it('returns undefined command if no command is registered with an id', () => {
        expect(commandService.retrieve(1)).toBeUndefined();
    });

    it('returns all commands in alphabetical order if queried with an empty search', () => {
        const command1 = {
            name: 'Toggle light/dark color scheme',
            callback: () => {}
        };
        commandService.register(command1);

        const command2 = {
            name: 'Apply this action',
            callback: () => {}
        };
        commandService.register(command2);

        const command3 = {
            name: 'Zebra-ify it',
            callback: () => {}
        };
        commandService.register(command3);

        let retrieved = commandService.search('');

        expect(retrieved).toEqual([command2, command1, command3]);

        retrieved = commandService.search();

        expect(retrieved).toEqual([command2, command1, command3]);
    });

    it('returns matching commands in alphabetical order if queried with an empty search', () => {
        const command1 = {
            name: 'a__b__c',
            callback: () => {}
        };
        commandService.register(command1);

        const command2 = {
            name: 'abc',
            callback: () => {}
        };
        commandService.register(command2);

        const command3 = {
            name: 'xyz',
            callback: () => {}
        };
        commandService.register(command3);

        const command4 = {
            name: 'xyzabc',
            callback: () => {}
        };
        commandService.register(command4);

        const retrieved = commandService.search('abc');

        expect(retrieved).toEqual([command2, command4, command1]);
    });
});
