import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';
import {map, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user$.pipe(
        take(1),
        map ((user) => {
          console.log('User=>', user);
          this.localStorageChat(user);
          if (user){
            return true;
          } else {
            this.router.navigate(['/login']);
            return false;
          }
            })
    );
  }
    public localStorageChat(chatlist) {
        localStorage.setItem('usuario', JSON.stringify(chatlist));
    }
}
