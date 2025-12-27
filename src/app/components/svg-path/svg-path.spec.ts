import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgPath } from './svg-path';

describe('SvgPath', () => {
  let component: SvgPath;
  let fixture: ComponentFixture<SvgPath>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SvgPath]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SvgPath);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
