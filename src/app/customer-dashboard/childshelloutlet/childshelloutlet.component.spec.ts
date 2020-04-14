import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildshelloutletComponent } from './childshelloutlet.component';

describe('ChildshelloutletComponent', () => {
  let component: ChildshelloutletComponent;
  let fixture: ComponentFixture<ChildshelloutletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildshelloutletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildshelloutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
