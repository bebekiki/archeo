import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecouvertesComponent } from './decouvertes.component';

describe('DecouvertesComponent', () => {
  let component: DecouvertesComponent;
  let fixture: ComponentFixture<DecouvertesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecouvertesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DecouvertesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
