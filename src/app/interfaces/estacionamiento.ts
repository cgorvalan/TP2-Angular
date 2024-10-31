export interface Estacionamiento {
    id: number;
    patente: string;
    horaIngreso: string;
    horaEgreso: string|null;
    costo: number;
    idusuarioIngreso: string;
    idUsuarioEgreso: string|null;
    idCochera: number;
    eliminado: null;
}