import { Injectable } from '@angular/core';
import * as FuzzySearch from 'fuzzy-search';

export interface ICommand {
    name: string;
    callback: () => void;
};

Injectable()
export class CommandService {
    private _commands: ICommand[] = [];
    private _nextId = 0;
    private _fuzzySearch = new (FuzzySearch as any).default(this._commands, [ 'name' ], { sort: true });

    register(command: ICommand): number { 
        const registeredId = this._nextId;
        this._nextId++;

        this._commands[registeredId] = command;

        return registeredId;
    }

    deregister(id: number): void {
        delete this._commands[id];
    }

    retrieve(id: number): ICommand {
        return this._commands[id];
    }

    search(query: string = ''): ICommand[] {
        let results: ICommand[] = this._fuzzySearch.search(query);

        if (query === '') {
            results.sort((a, b) => a.name.localeCompare(b.name));
        }

        return results;
    }
}
