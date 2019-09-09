import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleformComponent } from './multipleform.component';

describe('MultipleformComponent', () => {
  let component: MultipleformComponent;
  let fixture: ComponentFixture<MultipleformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipleformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
