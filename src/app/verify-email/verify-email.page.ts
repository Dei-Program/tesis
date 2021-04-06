import { Component, OnDestroy } from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {User} from '../shared/user.interfaces';


@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnDestroy {
 user$: Observable<User> = this.authService.afAuth.user;
  constructor(private authService: AuthService ) { }

async onSendEmail(): Promise<void>{
    try {
  await this.authService.sendVerificationEmail();

} catch (error) {
        console.log('Error->', error);
    }
}

  ngOnDestroy(): void {
    this.authService.logout();
}
}

