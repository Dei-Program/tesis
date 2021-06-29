import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChatuserPage } from './chatuser.page';

describe('ChatuserPage', () => {
  let component: ChatuserPage;
  let fixture: ComponentFixture<ChatuserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatuserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatuserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
