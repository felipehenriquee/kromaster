import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth, private router: Router) { }
  login(user){
    return this.fireAuth.signInWithEmailAndPassword(user.email, user.password)
  }
  register(user){
    return this.fireAuth.createUserWithEmailAndPassword(user.email, user.password);
  }
  logout(){
    return this.fireAuth.signOut();
  }
  getAuth(){
    
    return this.fireAuth;
  }
}

