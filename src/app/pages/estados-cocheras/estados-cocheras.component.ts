import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Cochera } from '../../interfaces/cochera';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.services';

@Component({
  selector: 'app-estado-cocheras',
  standalone: true,
  imports: [RouterModule, CommonModule, HeaderComponent],
  templateUrl: './estados-cocheras.component.html',
  styleUrl: './estados-cocheras.component.scss'
})
export class EstadoCocherasComponent {

  titulo: string = "Estado de la cochera";
  header: { nro: string, disponibilidad: string, ingreso: string, acciones: string } = {
  nro: "Nro", 
  disponibilidad: "Disponibilidad",
  ingreso: 'Ingreso',
  acciones: 'Acciones',
  };
  filas: Cochera[] = [];

  ngOnInit() {
    this.traerCocheras().then(cocheras => {
      this.filas = cocheras;
    });
  }
  auth=inject(AuthService);

  traerCocheras(){
    return fetch('http://localhost:4000/cocheras', {
      method: 'GET',
      headers: {
        authorization: "Bearer " + localStorage.getItem('token')
      },
    }
    )
    .then(r => r.json())
  }

  siguienteNumero: number = 1;

  agregarFila() {
    this.filas.push({
      nro: this.siguienteNumero, 
      disponibilidad: true,
      ingreso: new Date().toLocaleTimeString(),
      acciones: '-'
    });
    this.siguienteNumero += 1;
  }

  /** Elimina la fila de la cochera seleccionada */
  borrarFila(numeroFila: number){  
    this.filas.splice(numeroFila, 1);
  }

  /** Cambia la disponibilidad de una cochera, si esta habilitada se deshabilita, y viceversa */
  cambiarDisponibilidadCocheras(numeroFila: number){
    // manera larga
    // if(this.filas[numeroFila].disponibilidad === true){
    //   this.filas[numeroFila].disponibilidad = false;
    // } else {
    //   this.filas[numeroFila].disponibilidad = true;
    this.filas[numeroFila].disponibilidad = !this.filas[numeroFila].disponibilidad;
    };
    showModal(indice: number){
      Swal.fire({
        title: "Seguro que quieres borrar la fila?",
        text: "Una vez hecho no hay vuelta atrás!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, borrar!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Listo!",
            text: "La fila fue eliminada con éxito.",
            icon: "success"
          });
          this.borrarFila(indice);
        }
      });
    }
    /** obtener las cocheras del back end */
    getCocheras(){
      fetch("http://localhost:4000/cocheras", {
        headers:{
          authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiZXNBZG1pbiI6MSwiaWF0IjoxNzI2NjcwODE0LCJleHAiOjE3MjcyNzU2MTR9.5_phgc5GM8d9i8Jks8urEViOmVcQ3FK6wSGYnOpzCik'
        },
      });
    }
  };

  // Swal.fire({
  //   title: "Are you sure?",
  //   text: "You won't be able to revert this!",
  //   icon: "warning",
  //   showCancelButton: true,
  //   confirmButtonColor: "#3085d6",
  //   cancelButtonColor: "#d33",
  //   confirmButtonText: "Yes, delete it!"
  // }).then((result) => {
  //   if (result.isConfirmed) {
  //     Swal.fire({
  //       title: "Deleted!",
  //       text: "Your file has been deleted.",
  //       icon: "success"
  //     });
  //   }
  // });

  // showModal(indice: number){
  //   Swal.fire({
  //     title: "Estas seguro que quieres borrar la fila?",
  //     text: "Una vez hecho no hay vuelta atrás!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!"
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire({
  //         title: "Listo!",
  //         text: "La fila fue eliminada con éxito.",
  //         icon: "success"
  //       });
  //       this.borrarFila(indice);
  //     }
  //   });
  
  // }

