export interface User{
    uid: string;
    email: string;
    displayName: string;
    emailVerified: boolean;

}

export interface DataUser{
    uid: string;
    email: string;
    displayName: string;
    emailVerified: boolean;

}

export interface RegisterPerson{
    nombre: string;
    cedula: number;
    fecha: string;
    hora: string;
    motivo: string;
    id: string;
}
