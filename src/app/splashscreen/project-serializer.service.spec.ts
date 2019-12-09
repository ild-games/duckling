import { ProjectSerializerService } from './project-serializer.service';

describe('ProjectSerializerService', () => {
    let service: ProjectSerializerService;

    beforeEach(() => {
        service = new ProjectSerializerService();
    });

    it('loadProjects returns null', async () => {
        const projects = await service.loadProjects();
        expect(projects).toBeNull();
    });
});
