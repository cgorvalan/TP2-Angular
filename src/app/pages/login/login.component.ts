import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Login } from '../../interfaces/login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  datosLogin: Login = {
    username: '',
    password: '',
  }

  router = inject(Router);

  
  Login(){
    console.log("Login");
    fetch("http://localhost:4000/login",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.datosLogin),
    }).then(res => {
      res.json().then(resJson => {
        if(resJson.status === 'ok'){
          
          this.router.navigate(['/estado-cocheras']);
          localStorage.setItem('token', resJson.token);
         
        } else {
          
        }
        console.log("recibi respuesta del back", resJson)
      })
    })
  }
}