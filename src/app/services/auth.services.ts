import { Injectable } from '@angular/core';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  login(Login: Login) {
    return fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify(Login),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(r => r.json())
    .then(response => {
      if (response.status === 'ok') {
        localStorage.setItem('token', response.token);
        return true;
      } else {
        return false;
      }
    });
  }

  getToken(): string{
    return localStorage.getItem('token') ?? "";
  }
  estaLogueado(): boolean{
    if (this.getToken())
      return true;
   else
    return false;
  
  }
}

// agregar una funcion de logout