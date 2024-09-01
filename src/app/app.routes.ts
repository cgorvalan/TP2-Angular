import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { EstadosCocherasComponent } from './pages/estados-cocheras/estados-cocheras.component';

export const routes: Routes = [
    {
        path: "login", 
        component: LoginComponent
    },
    {
        path: "estados-cocheras",
        component: EstadosCocherasComponent
    },
    {
        path:"",
        redirectTo: "login",
        pathMatch: "full"
    }
];
