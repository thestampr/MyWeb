import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexCardBoxComponent } from './flex-card-box.component';

describe('FlexCardBoxComponent', () => {
  let component: FlexCardBoxComponent;
  let fixture: ComponentFixture<FlexCardBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlexCardBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlexCardBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
