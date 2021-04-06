import { Component} from '@angular/core';
import {AuthService} from '../services/auth.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  {

  constructor(private authService: AuthService, private router: Router ) { }

async onLogin(email, password){
try{
  const user = await this.authService.login(email.value, password.value);
  if (user) {
    const isVerified = this.authService.isEmailVerified(user);
    this.redirectUser(isVerified);
  }
}
catch (error){console.log('Error-->', error);
}
}
async onLoginGoogle(){
try{
const user = await this.authService.loginGoogle();
if ( user ){
  const isVerified = this.authService.isEmailVerified(user);
  this.redirectUser(isVerified);
}
}
catch (error){
  console.log('Error-->', error);
}

}
private redirectUser(isVerified: boolean): void {
if (isVerified){
  this.router.navigate(['admin']);
} else {
  this.router.navigate(['verify-email']);
}
}
}
