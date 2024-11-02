import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Login } from '../../interfaces/login';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth.services';

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
  auth = inject(AuthService);

  
  Login(){
    this.auth.login(this.datosLogin)
    .then(ok => {
      if(ok) {
        this.router.navigate(['/estado-cocheras']);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Usuario o contraseña incorrecta",
        });
      }
    });
  }
}