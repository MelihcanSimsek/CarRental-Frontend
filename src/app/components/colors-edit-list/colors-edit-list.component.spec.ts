import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorsEditListComponent } from './colors-edit-list.component';

describe('ColorsEditListComponent', () => {
  let component: ColorsEditListComponent;
  let fixture: ComponentFixture<ColorsEditListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorsEditListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorsEditListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
