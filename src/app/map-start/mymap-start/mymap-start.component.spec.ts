import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MymapStartComponent } from './mymap-start.component';

describe('MymapStartComponent', () => {
  let component: MymapStartComponent;
  let fixture: ComponentFixture<MymapStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MymapStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MymapStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
