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
                    time: { value: 0 },
                    strokeThick: { value: 0.01 },
                },
                vertexShader: `
                    varying vec3 vPos;
                    void main() {
                        vPos = position;
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(vPos, 1.0);
                    }
                `,
                fragmentShader: `
                    uniform float strokeThick;
                    varying vec3 vPos;

                    vec2 plusOrMinus(float val) {
                        return vec2(val + (val * 0.01), val - (val * 0.01));
                    }

                    void main() {
                        vec3 bgColor = vec3(.6);

                        float dNearest = min(
                            min(fract(vPos.x), 1.- fract(vPos.x)), 
                            min(fract(vPos.y), 1.-fract(vPos.y))
                            );

                        float onGrid = 1.-smoothstep(
                            strokeThick - (strokeThick * 0.1),
                            strokeThick + (strokeThick * 0.1),
                            dNearest
                        );

                        vec3 color = vec3(
                            1.-step(strokeThick, abs(vPos.x)),
                            1.-step(strokeThick, abs(vPos.y)),
                            1.
                        ) + vec3(.7);
                        


                        gl_FragColor = vec4(
                            mix(bgColor, color, onGrid), 
                            1.
                        );
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
        let timer = 0;
        const animateFrame = () => {
            requestAnimationFrame(animateFrame);
            timer++;

            this._cube.rotation.x += 0.01;
            this._cube.rotation.y += 0.01;
            // this._camera.position.x += 0.1;
            this._camera.position.y = 2* Math.sin(timer/50) + 5;
            this._camera.lookAt(0,0,0);
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
