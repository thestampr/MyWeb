import { Component, Input } from '@angular/core';
import { SwiperOptions } from 'swiper';


@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.css']
})
export class SwiperComponent {
    @Input() name: string;
    @Input() images: string[];
    @Input() portrait?: boolean;
    
    config: SwiperOptions = {
        pagination: { 
            el: '.swiper-pagination', 
            clickable: true 
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        spaceBetween: 30
    }; 
}
