import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth-service.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
    ){

  }
  canActivate(): Promise<boolean>{
    console.log("login")
    return new Promise(resolve => {
      this.authService.getAuth().onAuthStateChanged(user =>{
        if(user) this.router.navigate(['tabs/tab1']);
        
        
        resolve(user ? false : true); 
      });;
    })
  }
  
  
}
