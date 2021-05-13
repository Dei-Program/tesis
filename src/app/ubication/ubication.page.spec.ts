import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UbicationPage } from './ubication.page';

describe('UbicationPage', () => {
  let component: UbicationPage;
  let fixture: ComponentFixture<UbicationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UbicationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UbicationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
