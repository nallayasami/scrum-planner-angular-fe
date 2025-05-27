import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FireworksAnimationComponent } from './fireworks-animation.component';

describe('FireworksAnimationComponent', () => {
  let component: FireworksAnimationComponent;
  let fixture: ComponentFixture<FireworksAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FireworksAnimationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FireworksAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
