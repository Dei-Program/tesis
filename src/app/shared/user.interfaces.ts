export interface User {
    uid: string;
    email: string;
    displayName: string;
    emailVerified: boolean;

}

export interface DataUser {
    uid: string;
    email: string;
    displayName: string;
    emailVerified: boolean;

}

export interface RegisterPerson {
    nombre: string;
    cedula: number;
    fecha: string;
    hora: string;
    motivo: string;
    id: string;
}

export interface RegisterPerson1 {
    nombre: string;
    cedula: number;
    fecha: string;
    hora: string;
    motivo: string;
    id: string;
}

export interface Producto {
    name: string;
    uid: string;
    email: string;
    phone: string;
    dp: string;
    cedula: string;
}

export interface Guard {
    name: string;
    uid: string;
    time_in: string;
    time_out: string;
    obs: string;
    details: string;

}
