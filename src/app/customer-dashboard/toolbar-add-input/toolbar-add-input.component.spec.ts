import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarAddInputComponent } from './toolbar-add-input.component';

describe('ToolbarAddInputComponent', () => {
  let component: ToolbarAddInputComponent;
  let fixture: ComponentFixture<ToolbarAddInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarAddInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarAddInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
