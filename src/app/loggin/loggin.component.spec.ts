import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LogginComponent } from './loggin.component';

describe('LogginComponent', () => {
  let component: LogginComponent;
  let fixture: ComponentFixture<LogginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogginComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LogginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
