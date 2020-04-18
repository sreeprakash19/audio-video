import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarDetailsComponent } from './sidebar-details.component';

describe('SidebarDetailsComponent', () => {
  let component: SidebarDetailsComponent;
  let fixture: ComponentFixture<SidebarDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
