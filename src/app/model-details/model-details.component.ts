import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { BackendService } from '../backend.service';


@Component({
  selector: 'app-model-details',
  templateUrl: './model-details.component.html',
  styleUrls: ['./model-details.component.css']
})
export class ModelDetailsComponent implements OnInit {

    public model: string = '';

    constructor(public router: Router, private activatedRoute: ActivatedRoute, private backend: BackendService) {}
    
    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
            this.model = param.get('model')!;
        })

        if (!this.backend.isFileExist(`assets/3D/${this.model}/obj.gltf`)) {
            this.router.navigateByUrl("404");
        }
    }
}
