import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ZardInputDirective } from '../../shared/components/input/input.directive';
import { ZardIconComponent } from '../../shared/components/icon/icon.component';
import { Z_MODAL_DATA } from '../../shared/components/dialog/dialog.service';

export interface EmpleadoFormData {
  id?: number;
  nombre: string;
  apellido: string;
  correo: string;
  salario: number;
}

@Component({
  selector: 'app-empleado-form-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ZardInputDirective, ZardIconComponent],
  template: `
    <form [formGroup]="form" class="grid gap-4">
      <!-- Error general del servidor -->
      @if (serverError()) {
        <div class="flex items-center gap-2 p-3 rounded-md bg-destructive/10 text-destructive text-sm">
          <z-icon zType="circle-x" zSize="sm" />
          <span>{{ serverError() }}</span>
        </div>
      }

      <!-- Nombre -->
      <div class="grid gap-3">
        <label 
          for="nombre" 
          class="flex items-center gap-2 text-sm leading-none font-medium select-none"
        >
          Nombre <span class="text-destructive">*</span>
        </label>
        <input 
          z-input 
          id="nombre"
          formControlName="nombre" 
          placeholder="Ej: Juan"
          class="w-full"
          [class.border-destructive]="form.get('nombre')?.invalid && form.get('nombre')?.touched"
        />
        
        @if (form.get('nombre')?.touched && form.get('nombre')?.hasError('required')) {
          <span class="text-xs text-destructive flex items-center gap-1">
            <z-icon zType="triangle-alert" zSize="sm" />
            El nombre es requerido
          </span>
        }
        @if (form.get('nombre')?.touched && form.get('nombre')?.hasError('minlength')) {
          <span class="text-xs text-destructive flex items-center gap-1">
            <z-icon zType="triangle-alert" zSize="sm" />
            El nombre debe tener al menos 3 caracteres
          </span>
        }
        
        @if (fieldErrors()['nombre']) {
          <span class="text-xs text-destructive flex items-center gap-1">
            <z-icon zType="circle-x" zSize="sm" />
            {{ fieldErrors()['nombre'][0] }}
          </span>
        }
      </div>

      <!-- Apellido -->
      <div class="grid gap-3">
        <label 
          for="apellido" 
          class="flex items-center gap-2 text-sm leading-none font-medium select-none"
        >
          Apellido <span class="text-destructive">*</span>
        </label>
        <input 
          z-input 
          id="apellido"
          formControlName="apellido" 
          placeholder="Ej: Pérez"
          class="w-full"
          [class.border-destructive]="form.get('apellido')?.invalid && form.get('apellido')?.touched"
        />
        
        @if (form.get('apellido')?.touched && form.get('apellido')?.hasError('required')) {
          <span class="text-xs text-destructive flex items-center gap-1">
            <z-icon zType="triangle-alert" zSize="sm" />
            El apellido es requerido
          </span>
        }
        @if (form.get('apellido')?.touched && form.get('apellido')?.hasError('minlength')) {
          <span class="text-xs text-destructive flex items-center gap-1">
            <z-icon zType="triangle-alert" zSize="sm" />
            El apellido debe tener al menos 3 caracteres
          </span>
        }
        
        @if (fieldErrors()['apellido']) {
          <span class="text-xs text-destructive flex items-center gap-1">
            <z-icon zType="circle-x" zSize="sm" />
            {{ fieldErrors()['apellido'][0] }}
          </span>
        }
      </div>

      <!-- Correo -->
      <div class="grid gap-3">
        <label 
          for="correo" 
          class="flex items-center gap-2 text-sm leading-none font-medium select-none"
        >
          Correo electrónico <span class="text-destructive">*</span>
        </label>
        <input 
          z-input 
          id="correo"
          type="email"
          formControlName="correo" 
          placeholder="Ej: juan@example.com"
          class="w-full"
          [class.border-destructive]="form.get('correo')?.invalid && form.get('correo')?.touched"
        />
        
        @if (form.get('correo')?.touched && form.get('correo')?.hasError('required')) {
          <span class="text-xs text-destructive flex items-center gap-1">
            <z-icon zType="triangle-alert" zSize="sm" />
            El correo es requerido
          </span>
        }
        @if (form.get('correo')?.touched && form.get('correo')?.hasError('email')) {
          <span class="text-xs text-destructive flex items-center gap-1">
            <z-icon zType="triangle-alert" zSize="sm" />
            Ingrese un correo válido
          </span>
        }
        
        @if (fieldErrors()['correo']) {
          <span class="text-xs text-destructive flex items-center gap-1">
            <z-icon zType="circle-x" zSize="sm" />
            {{ fieldErrors()['correo'][0] }}
          </span>
        }
      </div>

      <!-- Salario -->
      <div class="grid gap-3">
        <label 
          for="salario" 
          class="flex items-center gap-2 text-sm leading-none font-medium select-none"
        >
          Salario <span class="text-destructive">*</span>
        </label>
        <input 
          z-input 
          id="salario"
          type="number"
          formControlName="salario" 
          placeholder="Ej: 5000"
          step="0.01"
          min="0"
          class="w-full"
          [class.border-destructive]="form.get('salario')?.invalid && form.get('salario')?.touched"
        />
        
        @if (form.get('salario')?.touched && form.get('salario')?.hasError('required')) {
          <span class="text-xs text-destructive flex items-center gap-1">
            <z-icon zType="triangle-alert" zSize="sm" />
            El salario es requerido
          </span>
        }
        @if (form.get('salario')?.touched && form.get('salario')?.hasError('min')) {
          <span class="text-xs text-destructive flex items-center gap-1">
            <z-icon zType="triangle-alert" zSize="sm" />
            El salario debe ser mayor a 0
          </span>
        }
        
        @if (fieldErrors()['salario']) {
          <span class="text-xs text-destructive flex items-center gap-1">
            <z-icon zType="circle-x" zSize="sm" />
            {{ fieldErrors()['salario'][0] }}
          </span>
        }
      </div>
    </form>
  `,
})
export class EmpleadoFormDialogComponent {
  private zData: EmpleadoFormData | null = inject(Z_MODAL_DATA);

  isEditMode = false;
  serverError = signal<string | null>(null);
  fieldErrors = signal<Record<string, string[]>>({});

  form = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    apellido: new FormControl('', [Validators.required, Validators.minLength(3)]),
    correo: new FormControl('', [Validators.required, Validators.email]),
    salario: new FormControl<number | null>(null, [Validators.required, Validators.min(0.01)]),
  });

  constructor() {
    // Si hay datos (edición), pre-llenar el formulario
    if (this.zData && this.zData.id) {
      this.isEditMode = true;
      this.form.patchValue(this.zData);
    }
  }

  isValid(): boolean {
    return this.form.valid;
  }

  getValue(): EmpleadoFormData {
    const formValue = this.form.value;
    
    return {
      ...this.zData,
      nombre: formValue.nombre!,
      apellido: formValue.apellido!,
      correo: formValue.correo!,
      salario: formValue.salario!,
    };
  }

  // Método para setear errores desde el componente padre
  setServerErrors(errors: { message?: string; errors?: Record<string, string[]> }): void {
    if (errors.message) {
      this.serverError.set(errors.message);
    }
    
    if (errors.errors) {
      this.fieldErrors.set(errors.errors);
    }
  }

  // Limpiar errores del servidor
  clearServerErrors(): void {
    this.serverError.set(null);
    this.fieldErrors.set({});
  }
}