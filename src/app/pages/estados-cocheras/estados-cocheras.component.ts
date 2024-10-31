import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Cochera } from '../../interfaces/cochera';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.services';
import { CocherasService } from '../../services/cocheras.service';
import { EstacionamientosService } from '../../services/estacionamiento.service';



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
  estacionamientos: any;
  cocheras: Cochera[] = []; 
  currentCocheraIndex: number = 0; 

  auth=inject(AuthService);
  cocherasService = inject(CocherasService);
  estacionamientosService = inject(EstacionamientosService);
  
  ngOnInit() {
    this.traerCocheras().then(cocheras => {
      this.filas = cocheras;
    });
  }
 

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
  datosEstadoCocheras = {
    descripcion: "AAA000"
  }

  agregarFila() {
    return fetch("http://localhost:4000/cocheras/", {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${this.auth.getToken()}`,
      },
      body: JSON.stringify(this.datosEstadoCocheras),
    }).then(res => {
      if (!res.ok) {
        throw new Error("Error al agregar nueva fila: " + res.statusText);
      }
      return res.json();
    })
      .then(data => {
        console.log(data);
        this.ngOnInit();
      })
      .catch(error => {
        console.error('Hubo un problema con la operación fetch:', error);
      })
  }
  

 
  borrarFila(cocheraId: number) {
    fetch('http://localhost:4000/cocheras/' + cocheraId, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ` + this.auth.getToken(),
      },
    }).then(() => {
      this.traerCocheras();
    });
    
  }


  cambiarDisponibilidadCocheras(cocheraId: number) {
    const cochera = this.filas.find(cochera => cochera.id === cocheraId)!;
    if (cochera.deshabilitada) {
      this.cocherasService.habilitar(cochera).then(() => this.traerCocheras());
    } else {
      this.cocherasService.deshabilitar(cochera).then(() => this.traerCocheras());
    };
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
            text: "La fila ha sido eliminada con éxito.",
            icon: "success"
          });
          this.borrarFila(indice);
        }
      });
    };
    
    
    abrirModalNuevoEstacionamiento(idCochera:number){
      Swal.fire({
        title: "Ingrese su patente",
        input: "text",
        showCancelButton: true,
        inputValidator: (value) => { 
          if (!value) {
            return "Necesitás escribir algo!";
          }
          return
        }
      }).then(res =>{
        if(res.isConfirmed){
          console.log("Tengo que estacionar la patente", res.value);
          this.estacionamientos.estacionarAuto(res.value,idCochera).then(()=> {
            this.traerCocheras()
          });
          
        }
      }) 
    }
  

cerrarModalEstacionamiento(idCochera: number, patente: string) {
  Swal.fire({
    title: '¿Deseas cerrar el estacionamiento?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Cerrar'
  }).then((res) => {
    if (res.isConfirmed) {
      this.estacionamientos.cerrarEstacionamiento(patente, idCochera)
        .then((r: { ok: any; json: () => any; }) => {
          if (!r.ok) throw new Error("Error en la respuesta del servidor"); // Maneja respuestas no OK
          return r.json(); // Convertimos a JSON
        })
        .then((rJson: { costo: any; }) => {
          const costo = rJson.costo;
          this.traerCocheras();
          Swal.fire({
            title: 'La cochera ha sido cerrada',
            text: `El precio a cobrar es ${costo}`,
            icon: 'info'
          });
        });
    } else if (res.dismiss) {
      Swal.fire({
        title: 'Cancelado',
        text: 'La cochera no ha sido cerrada.',
        icon: 'info'
      });
}
});
}

  getCocheras() {
    fetch("http://localhost:4000/cocheras", {
      headers: {
        authorization: "Bearer " + localStorage.getItem('token')
      }
    })
      .then(r => r.json())
      .then(data => {
        this.getCocheras = data; 
        console.log('Cocheras cargadas:', this.getCocheras);
      })
      .catch(error => {
        console.error('Error al cargar las cocheras:', error);
      });
  }




  



}
  
  