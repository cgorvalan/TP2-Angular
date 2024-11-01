import { inject,  Injectable } from "@angular/core";
import { AuthService} from "./auth.services";
import { Cochera } from "../interfaces/cochera";

    @Injectable({
        providedIn: 'root'
    })
    export class CocherasService {

        auth = inject(AuthService)
      getCocheras: any;
        
        cochera(){
            return fetch('http://localhost:4000/cocheras', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${this.auth.getToken()}`,
                },
            }).then(r => r.json());
        }

        habilitar(cochera: Cochera) {
        
            return fetch(`http://localhost:4000/cocheras/${cochera.id}/enable`, {
                method: 'POST',
                headers: {
                    'Content-Type' : "application/json",
                    'Authorization': `Bearer ${this.auth.getToken()}`
                }
            })
        }
        
          deshabilitar(cochera: Cochera) {
        
            return fetch(`http://localhost:4000/cocheras/${cochera.id}/disable`, {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${this.auth.getToken()}`
                },
            })
        }

        cocheras(): Promise<Cochera[]> {
            return fetch('http://localhost:4000/cocheras', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${this.auth.getToken()}`,
                },
            }).then(r => r.json());
        }
    }



