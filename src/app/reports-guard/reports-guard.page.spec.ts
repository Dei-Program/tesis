import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReportsGuardPage } from './reports-guard.page';

describe('ReportsGuardPage', () => {
  let component: ReportsGuardPage;
  let fixture: ComponentFixture<ReportsGuardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsGuardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportsGuardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
