import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh, PlaneGeometry, RawShaderMaterial, Vector4, Uniform, GridHelper, Vector3, PlaneBufferGeometry, ShaderMaterial } from 'three';

@Component({
    selector: 'dk-canvas',
    styleUrls: ['./canvas.component.scss'],
    template: `
        <div #container
            class='container'>
        </div>
    `
})
export class CanvasComponent implements AfterViewInit {
    @ViewChild('container') container: ElementRef;

    private _scene: Scene;
    private _camera: PerspectiveCamera;
    private _renderer: WebGLRenderer;
    private _cube: Mesh;

    ngAfterViewInit() {
        setTimeout(() => this._setupRenderer(), 0);
    }

    private _setupRenderer() {
        this._containerHTMLElement.innerHTML = '';

        this._scene = new Scene();

        this._camera = new PerspectiveCamera(
            75,
            this._containerSize.width / this._containerSize.height,
            0.1,
            1000);

        this._camera.position.x = 7.5;
        this._camera.position.y = 7.5;
        this._camera.position.z = 7.5;
        this._camera.lookAt(0, 0, 0);

        const canvas = document.createElement( 'canvas' );
        const context = canvas.getContext( 'webgl2' );

        this._renderer = new WebGLRenderer({ canvas, context });
        this._renderer.setSize(this._containerSize.width, this._containerSize.height);

        this._containerHTMLElement.appendChild(this._renderer.domElement);

        const cubeGeometry = new BoxGeometry();
        const cubeMaterial = new MeshBasicMaterial({ color: 0x00ff00 });
        this._cube = new Mesh(cubeGeometry, cubeMaterial);
        this._cube.position.y = 1;
        this._cube.position.z = 0;
        this._cube.position.x = 0;
        this._scene.add(this._cube);

        const ground = new Mesh(
            new PlaneBufferGeometry(300, 300),
            new ShaderMaterial({
                uniforms: {
                    time: { value: 0 }
                },
                vertexShader: `
                    varying vec3 vPos;
                    void main() {
                        vPos = position;
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(vPos, 1.0);
                    }
                `,
                fragmentShader: `
                    varying vec3 vPos;
                    float when_gt(float x, float y) {
                      return max(sign(x - y), 0.0);
                    }
                    float when_le(float x, float y) {
                      return 1.0 - when_gt(x, y);
                    }
                    float grid(vec3 pos, vec3 axis, float size) {
                        float width = 1.0;
                        // Grid size
                        vec3 tile = pos / size;
                        // Grid centered gradient
                        vec3 level = abs(fract(tile) - 0.5);
                        // Derivative (crisp line)
                        vec3 deri = fwidth(tile);
                        vec3 grid3D = clamp((level - deri * (width - 1.0)) / deri, 0.0, 1.0);
                        // Shorter syntax but pow(0.0) fails on some GPUs
                        // float lines = float(length(axis) > 0.0) * pow(grid3D.x, axis.x) * pow(grid3D.y, axis.y) * pow(grid3D.z, axis.z);
                        float lines = float(length(axis) > 0.0)
                            * (when_gt(axis.x, 0.0) * grid3D.x + when_le(axis.x, 0.0))
                            * (when_gt(axis.y, 0.0) * grid3D.y + when_le(axis.y, 0.0))
                            * (when_gt(axis.z, 0.0) * grid3D.z + when_le(axis.z, 0.0));
                        return 1.0 - lines;
                    }
                    void main() {
                        float l = grid(vPos, vec3(1.0, 1.0, 0.0), 1.0);
                        gl_FragColor = vec4(mix(vec3(0.1), vec3(1.0), l), 1.0);
                    }
                `,
                extensions: {
                    derivatives: true,
                },
            }),
        );
        ground.rotation.x = -Math.PI * 0.5;

        this._scene.add(ground);

        this._animate();
    }

    private _animate() {
        const animateFrame = () => {
            requestAnimationFrame(animateFrame);

            this._cube.rotation.x += 0.01;
            this._cube.rotation.y += 0.01;
            // this._camera.position.x += 0.1;
            // this._camera.position.y += 0.1;
            // this._camera.position.z += 0.1;

            this._renderer.render(this._scene, this._camera);
        }

        animateFrame();
    }

    private get _containerSize(): { width: number, height: number } {
        return {
            width: this._containerHTMLElement.offsetWidth,
            height: this._containerHTMLElement.offsetHeight
        };
    }

    private get _containerHTMLElement(): HTMLElement {
        return this.container.nativeElement;
    }
}
