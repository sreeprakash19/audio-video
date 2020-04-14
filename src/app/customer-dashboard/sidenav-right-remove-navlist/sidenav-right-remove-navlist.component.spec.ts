import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavRightRemoveNavlistComponent } from './sidenav-right-remove-navlist.component';

describe('SidenavRightRemoveNavlistComponent', () => {
  let component: SidenavRightRemoveNavlistComponent;
  let fixture: ComponentFixture<SidenavRightRemoveNavlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavRightRemoveNavlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavRightRemoveNavlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
