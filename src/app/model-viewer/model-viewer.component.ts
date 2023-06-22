import { Component, AfterViewInit, Input, ViewChild, ElementRef, OnDestroy, HostListener } from '@angular/core';

import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ConnectionPositionPair } from '@angular/cdk/overlay';

import { BackendService } from '../backend.service';


@Component({
  selector: 'app-model-viewer',
  templateUrl: './model-viewer.component.html',
  styleUrls: ['./model-viewer.component.css']
})
export class ModelViewerComponent implements AfterViewInit, OnDestroy {

    @ViewChild('canvas') private canvasRef: ElementRef;

    @Input() file: string = '';
    @Input() doRotate: boolean = false;
    @Input() fieldOfView: number = 1;
    @Input() resolution: number = 1;
    @Input('nearClipping') nearClippingPane: number = 1;
    @Input('farClipping') farClippingPane: number = 1000;

    public positions = [
        new ConnectionPositionPair(
            { originX: 'end', originY: 'top' },
            { overlayX: 'end', overlayY: 'bottom' }
        ),
    ];

    public Resolutions: number[] = [
        0.1, 
        0.25, 
        0.5, 
        0.75, 
        1
    ];

    private light1: THREE.PointLight;
    private light2: THREE.PointLight;
    private light3: THREE.PointLight;
    private light4: THREE.PointLight;
    private ambientLight: THREE.AmbientLight;
    private directionalLight: THREE.DirectionalLight;

    private modelLoader = new GLTFLoader();

    private scene: THREE.Scene;
    private controler: OrbitControls;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private renderId: number;

    constructor(private backend: BackendService) {}

    ngAfterViewInit() {
        if (this.backend.isHardwareAccelerationEnabled) {
            this._createScene();
            this._createRenderer();
            this._createControls();
            this._loadModel();
        } else {
            this._shouldEnableHardwareAcceleration();
        }
    }

    ngOnDestroy(): void {
        cancelAnimationFrame(this.renderId);
    }

    private get canvas(): HTMLCanvasElement {
        return this.canvasRef.nativeElement;
    }

    private get viewPort(): HTMLDivElement {
        return <HTMLDivElement>document.getElementById('viewport')!;
    }

    private get aspectRatio(): number {
        return this.viewPort.clientWidth / this.viewPort.clientHeight;
    }

    public get isFullscreen(): boolean {
        return (window.innerWidth === screen.width) && (window.innerHeight === screen.height)
        && (this.viewPort.clientWidth === screen.width) && (this.viewPort.clientHeight === screen.height);
    }

    @HostListener('window:resize')
    private onResize(): void {
        this.renderer.setSize(this.viewPort.clientWidth, this.viewPort.clientHeight);

        this.camera.aspect = this.aspectRatio;
        this.camera.updateProjectionMatrix();
    }

    @HostListener('document:fullscreenchange') 
    @HostListener('document:mozfullscreenchange') 
    @HostListener('document:webkitfullscreenchange') 
    @HostListener('document:msfullscreenchange') 
    private onFullscreenChanged(event: KeyboardEvent): void {
        if (!this.isFullscreen) {
            this.leaveFullscreen();
        }
    }

    private _createControls(): void {
        this.controler = new OrbitControls(this.camera, this.renderer.domElement);
        this.controler.autoRotate = this.doRotate;
        this.controler.enableZoom = true;
        this.controler.enablePan = true;
        this.controler.update();
    };

    private _createScene(): void {
        //* Scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xd4d4d8)
        
        //*Camera
        let aspectRatio = this.aspectRatio;
        this.camera = new THREE.PerspectiveCamera(
            this.fieldOfView,
            aspectRatio,
            this.nearClippingPane,
            this.farClippingPane
        )
        this.camera.position.set(200, 200, 200);
        this.camera.lookAt(0, 0, 0);

        this.ambientLight = new THREE.AmbientLight(0x00000, 100);
        this.scene.add(this.ambientLight);
        
        this.directionalLight = new THREE.DirectionalLight(0xffdf04, 0.4);
        this.directionalLight.position.set(0, 1, 0);
        this.directionalLight.castShadow = true;
        this.scene.add(this.directionalLight);

        this.light1 = new THREE.PointLight(0x4b371c, 10);
        this.light1.position.set(0, 200, 400);
        this.scene.add(this.light1);

        this.light2 = new THREE.PointLight(0x4b371c, 10);
        this.light2.position.set(500, 100, 0);
        this.scene.add(this.light2);

        this.light3 = new THREE.PointLight(0x4b371c, 10);
        this.light3.position.set(0, 100, -500);
        this.scene.add(this.light3);

        this.light4 = new THREE.PointLight(0x4b371c, 10);
        this.light4.position.set(-500, 300, 500);
        this.scene.add(this.light4);
    }

    private _createRenderer(): void {
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
        this.renderer.setPixelRatio(devicePixelRatio * this.resolution);
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

        let component: ModelViewerComponent = this;

        (function render() {
            component.renderer.render(component.scene, component.camera);
            component.renderId = requestAnimationFrame(render);
        }());
    }

    private _loadModel(): void {
        let preloader: HTMLElement = document.getElementById('loader')!;
        let loading_status: HTMLElement = document.getElementById('loading-state')!;
        let loader_bar: HTMLElement = document.getElementById('loader-bar')!;
        let loader_bar_progress: HTMLElement = document.getElementById('loader-bar-progress')!;

        this.modelLoader.load(
            this.file, (gltf: GLTF) => {
                let box = new THREE.Box3().setFromObject(gltf.scene);
                box.getCenter(gltf.scene.position);
                gltf.scene.position.multiplyScalar(-1);

                this.scene.add(gltf.scene);
            }
        );
        
        const manager = new THREE.LoadingManager();
        this.modelLoader.manager = manager;

        manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
            // console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
        };

        manager.onLoad = function ( ) {
            // console.log( 'Loading complete!');

            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        };

        manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
            // console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );

            loader_bar_progress.style.width = String(itemsLoaded/itemsTotal*100) + '%';
        };

        manager.onError = function ( url ) {
            // console.log( 'There was an error loading ' + url );

            loader_bar.style.display = 'none';
            loading_status.innerText = 'Error';
        };
    }

    private _shouldEnableHardwareAcceleration(): void {
        let loading_status: HTMLElement = document.getElementById('loading-state')!;
        let loader_bar: HTMLElement = document.getElementById('loader-bar')!;

        loader_bar.style.display = 'none';
        loading_status.innerText = 'Please turn on "Hardware Acceleration"';
    }

    public setResolution(res: number): void {
        this.renderer.setPixelRatio(devicePixelRatio * res);
        this.resolution = res;
    }

    public toggleFullscreen(): void {
        if (this.isFullscreen) {
            this.leaveFullscreen();
        } else {
            this.enterFullscreen();
        }

        window.dispatchEvent(new Event('resize'));
    }

    public enterFullscreen(): void {
        let topbar = document.getElementById('topbar')!;

        const docElmWithBrowsersFullScreenFunctions = document.documentElement as HTMLElement & {
            mozRequestFullScreen(): Promise<void>;
            webkitRequestFullscreen(): Promise<void>;
            msRequestFullscreen(): Promise<void>;
        };

        if (docElmWithBrowsersFullScreenFunctions.requestFullscreen) {
            docElmWithBrowsersFullScreenFunctions.requestFullscreen();
        } else if (docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen) { /* Firefox */
            docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen();
        } else if (docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen();
        } else if (docElmWithBrowsersFullScreenFunctions.msRequestFullscreen) { /* IE/Edge */
            docElmWithBrowsersFullScreenFunctions.msRequestFullscreen();
        }

        topbar.style.marginTop = "-100%";
        topbar.style.visibility = "hidden";

        this.viewPort.classList.add('fullscreen');

        window.dispatchEvent(new Event('resize'));
    }

    public leaveFullscreen(): void {
        let topbar = document.getElementById('topbar')!;

        const docWithBrowsersExitFunctions = document as Document & {
            mozCancelFullScreen(): Promise<void>;
            webkitExitFullscreen(): Promise<void>;
            msExitFullscreen(): Promise<void>;
        };

        if (docWithBrowsersExitFunctions.exitFullscreen) {
            docWithBrowsersExitFunctions.exitFullscreen();
        } else if (docWithBrowsersExitFunctions.mozCancelFullScreen) { /* Firefox */
            docWithBrowsersExitFunctions.mozCancelFullScreen();
        } else if (docWithBrowsersExitFunctions.webkitExitFullscreen) { /* Chrome, Safari and Opera */
            docWithBrowsersExitFunctions.webkitExitFullscreen();
        } else if (docWithBrowsersExitFunctions.msExitFullscreen) { /* IE/Edge */
            docWithBrowsersExitFunctions.msExitFullscreen();
        }

        topbar.style.marginTop = "unset";
        topbar.style.visibility = "visible";

        this.viewPort.classList.remove('fullscreen');

        window.dispatchEvent(new Event('resize'));
    }
}
