import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Empleado {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  salario: string;
  created_at: string;
  updated_at: string;
}

export interface EmpleadoCreateDto {
  nombre: string;
  apellido: string;
  correo: string;
  salario: string;
}

export interface EmpleadoUpdateDto extends EmpleadoCreateDto {
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private apiUrl = 'http://localhost:8000/api/empleados';

  constructor(private http: HttpClient) {}

  getEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.apiUrl);
  }

  createEmpleado(empleado: EmpleadoCreateDto): Observable<Empleado> {
    return this.http.post<Empleado>(this.apiUrl, empleado);
  }

  updateEmpleado(id: number, empleado: EmpleadoUpdateDto): Observable<Empleado> {
    return this.http.put<Empleado>(`${this.apiUrl}/${id}`, empleado);
  }

  deleteEmpleado(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}