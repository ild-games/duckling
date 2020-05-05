import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface IEnvironmentService {
    isProduction(): boolean;
}

@Injectable()
export class EnvironmentService implements IEnvironmentService {
    public isProduction(): boolean {
        return environment.production;
    }
}
