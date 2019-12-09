import { Injectable } from '@angular/core';

export type ProjectModel = {
    title: string;
};

const _projectModels: ProjectModel[] = [
    {
        title: 'Squatbot',
    },
    {
        title: 'Prospect',
    },
    {
        title: 'Ancona',
    },
    {
        title: 'Raft',
    },
    {
        title: 'Duckling',
    },
    {
        title: 'RogueZ',
    },
    {
        title: 'Untitled Microgame Project',
    },
    {
        title: 'A very long game title which took me ages to figure out how long it really should be',
    },
];

interface IProjectSerializerService {
    loadProjects(): Promise<any>;
}

@Injectable()
export class ProjectSerializerService implements IProjectSerializerService {
    loadProjects(): Promise<ProjectModel[]> {
        return null;
    }
}

@Injectable()
export class FakeProjectSerializerService implements IProjectSerializerService {
    loadProjects(): Promise<ProjectModel[]> {
        return Promise.resolve(_projectModels);
    }
}
