import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurarComponent } from './curar.component';

describe('CurarComponent', () => {
  let component: CurarComponent;
  let fixture: ComponentFixture<CurarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurarComponent]
    });
    fixture = TestBed.createComponent(CurarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
