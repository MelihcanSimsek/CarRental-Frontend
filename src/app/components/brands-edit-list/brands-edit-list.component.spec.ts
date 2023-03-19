import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsEditListComponent } from './brands-edit-list.component';

describe('BrandsEditListComponent', () => {
  let component: BrandsEditListComponent;
  let fixture: ComponentFixture<BrandsEditListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandsEditListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandsEditListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
