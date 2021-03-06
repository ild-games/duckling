import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { ProjectSerializerService, ProjectModel } from './project-serializer.service';

@Component({
    selector: 'dk-splash-screen',
    styleUrls: ['./splash-screen.component.scss'],
    template: `
        <clr-vertical-nav class='left-content'>
            <a
                clrVerticalNavLink
                *ngFor='let project of projects'
                (click)='openProject({title: project.title})'>
                {{project.title}}
            </a>
        </clr-vertical-nav>
    `
})
export class SplashScreenComponent implements OnInit {

    @Output() projectOpened = new EventEmitter<string>();

    projects: ProjectModel[];

    constructor(private _projectSerializer: ProjectSerializerService) {
    }

    async ngOnInit() {
        await this._loadProjects();
    }

    openProject(project: {title: string}) {
        this.projectOpened.emit(project.title);
    }

    private async _loadProjects() {
        this.projects = await this._projectSerializer.loadProjects();
    }
}
