import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DaysSelectComponent} from './days-select.component';

describe('DaysSelectComponent', () => {
  let component: DaysSelectComponent;
  let fixture: ComponentFixture<DaysSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DaysSelectComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DaysSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
