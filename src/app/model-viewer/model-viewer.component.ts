import { Component, AfterViewInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';

import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


@Component({
  selector: 'app-model-viewer',
  templateUrl: './model-viewer.component.html',
  styleUrls: ['./model-viewer.component.css']
})
export class ModelViewerComponent implements AfterViewInit, OnDestroy {

    @ViewChild('canvas') private canvasRef: ElementRef;

    @Input() public file: string = 'assets/3D/Auture/obj.gltf';
    @Input() public doRotate: boolean = false;
    @Input() public fieldOfView: number = 1;
    @Input('nearClipping') public nearClippingPane: number = 1;
    @Input('farClipping') public farClippingPane: number = 1000;

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

    constructor() {}

    ngAfterViewInit() {
        this._createScene();
        this._renderingLoop();
        this._createControls();
        this._loadModel();
    }

    ngOnDestroy(): void {
        cancelAnimationFrame(this.renderId);
    }

    private get canvas(): HTMLCanvasElement {
        return this.canvasRef.nativeElement;
    }

    private get aspectRatio(): number {
        return this.canvas.clientWidth / this.canvas.clientHeight;
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

    private _renderingLoop(): void {
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
        this.renderer.setPixelRatio(devicePixelRatio);
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

        let component: ModelViewerComponent = this;

        (function render() {
            component.renderer.render(component.scene, component.camera);
            component.renderId = requestAnimationFrame(render);
        }());
    }

    private _loadModel(): void {
        let preloader: HTMLElement = document.getElementById('loader')!;
        let preloaderText: HTMLElement = document.querySelector('#loader>p')!;

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
            console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
        };

        manager.onLoad = function ( ) {
            console.log( 'Loading complete!');

            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        };

        manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
            console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
        };

        manager.onError = function ( url ) {
            console.log( 'There was an error loading ' + url );

            preloaderText.innerText = 'Error';
        };
    }
}
