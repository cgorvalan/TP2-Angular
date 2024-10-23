import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Cochera } from '../../interfaces/cochera';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../../app/components/header/header.component";
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

 
  borrarFila(numeroFila: number){  
    this.filas.splice(numeroFila, 1);
  }


  cambiarDisponibilidadCocheras(numeroFila: number){

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
    
    abrirModalNuevoEstacionamiento(id:number){}
  

  getCocheras() {
    fetch("http://localhost:4000/cocheras", {
      headers: {
        authorization: "Bearer " + localStorage.getItem('token')
      }
    })
      .then(r => r.json())
      .then(data => {
        this.getCocheras = data; // Almacena todas las cocheras
        console.log('Cocheras cargadas:', this.getCocheras);
      })
      .catch(error => {
        console.error('Error al cargar las cocheras:', error);
      });
  }

  }
  