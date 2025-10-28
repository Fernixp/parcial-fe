import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ZardTableBodyComponent,
  ZardTableCellComponent,
  ZardTableComponent,
  ZardTableHeadComponent,
  ZardTableHeaderComponent,
  ZardTableRowComponent,
} from '../../shared/components/table/table.component';
import { ZardButtonComponent } from '../../shared/components/button/button.component';
import { ZardIconComponent } from '../../shared/components/icon/icon.component';
import { ZardDividerComponent } from '../../shared/components/divider/divider.component';
import { ZardDialogModule } from '../../shared/components/dialog/dialog.component';
import { ZardDialogService } from '../../shared/components/dialog/dialog.service';
import { ZardAlertDialogService } from '../../shared/components/alert-dialog/alert-dialog.service';
import { EmpleadoService, Empleado } from '../../services/empleado.service';
import { EmpleadoFormDialogComponent, EmpleadoFormData } from './empleado-form-dialog';
import { toast } from 'ngx-sonner';
@Component({
  selector: 'app-empleados',
  imports: [
    CommonModule,
    ZardTableComponent,
    ZardTableHeaderComponent,
    ZardTableBodyComponent,
    ZardTableRowComponent,
    ZardTableHeadComponent,
    ZardTableCellComponent,
    ZardButtonComponent,
    ZardIconComponent,
    ZardDividerComponent,
    ZardDialogModule,
  ],
  templateUrl: './empleados.html',
  styleUrl: './empleados.css',
})
export class Empleados implements OnInit {
  private empleadoService = inject(EmpleadoService);
  private dialogService = inject(ZardDialogService);
  private alertDialogService = inject(ZardAlertDialogService);

  empleados = signal<Empleado[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadEmpleados();
  }

  loadEmpleados(): void {
    this.loading.set(true);
    this.error.set(null);

    this.empleadoService.getEmpleados().subscribe({
      next: (data) => {
        this.empleados.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar empleados:', err);
        this.error.set('Error al cargar los empleados');
        this.loading.set(false);
      },
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialogService.create({
      zTitle: 'Nuevo Empleado',
      zDescription: 'Ingrese el nombre de la nuevo empleado.',
      zContent: EmpleadoFormDialogComponent,
      zOkText: 'Crear',
      zCancelText: 'Cancelar',
      zOnOk: (instance: EmpleadoFormDialogComponent) => {
        if (!instance.isValid()) {
          console.error('Formulario inválido');
          return false;
        }

        instance.clearServerErrors();

        const formData = instance.getValue();

        this.empleadoService
          .createEmpleado({
            nombre: formData.nombre,
            apellido: formData.apellido,
            correo: formData.correo,
            salario: formData.salario.toString(),
          })
          .subscribe({
            next: () => {
              this.showToast('Empleado creado exitosamente', 'El empleado se creó correctamente.');
              this.loadEmpleados();
              dialogRef.close();
            },
            error: (err) => {
              console.error('Error al crear categoría:', err);

              if (err.status === 422 && err.error) {
                instance.setServerErrors({
                  message: err.error.message || 'Error de validación',
                  errors: err.error.errors || {},
                });
              } else {
                instance.setServerErrors({
                  message: 'Error al crear la categoría. Intente nuevamente.',
                });
              }

              this.loading.set(false);
            },
          });

        return false;
      },
      zWidth: '450px',
    });
  }

  openEditDialog(empleado: Empleado): void {
    const dialogRef = this.dialogService.create({
      zTitle: 'Editar Empleado',
      zDescription: `Editando empleado: ${empleado.nombre}`,
      zContent: EmpleadoFormDialogComponent,
      zData: {
        id: empleado.id,
        nombre: empleado.nombre,
        apellido: empleado.apellido,
        correo: empleado.correo,
        salario: Number(empleado.salario),
      } as EmpleadoFormData,
      zOkText: 'Actualizar',
      zCancelText: 'Cancelar',
      zOnOk: (instance: EmpleadoFormDialogComponent) => {
        if (!instance.isValid()) {
          this.showToast(
            'Formulario inválido',
            'Por favor, complete todos los campos correctamente.'
          );
          return false;
        }

        instance.clearServerErrors();

        const formData = instance.getValue();

        this.empleadoService
          .updateEmpleado(empleado.id, {
            id: empleado.id,
            nombre: formData.nombre,
            apellido: formData.apellido,
            correo: formData.correo,
            salario: formData.salario.toString(),
          })
          .subscribe({
            next: () => {
              this.showToast(
                'Empleado actualizado exitosamente',
                'El empleado se actualizó correctamente.'
              );
              this.loadEmpleados();
              dialogRef.close();
            },
            error: (err) => {
              this.showToast('Error al actualizar categoría', 'Intente nuevamente.');

              if (err.status === 422 && err.error) {
                instance.setServerErrors({
                  message: err.error.message || 'Error de validación',
                  errors: err.error.errors || {},
                });
              } else {
                instance.setServerErrors({
                  message: 'Error al actualizar la categoría. Intente nuevamente.',
                });
              }

              this.loading.set(false);
            },
          });

        return false;
      },
      zWidth: '450px',
    });
  }

  deleteEmpleado(empleado: Empleado): void {
    this.alertDialogService.confirm({
      zTitle: '¿Estás seguro?',
      zDescription: `Esta acción eliminará permanentemente el empleado "${empleado.nombre}". Esta acción no se puede deshacer.`,
      zOkText: 'Eliminar',
      zCancelText: 'Cancelar',
      zOnOk: () => {
        this.loading.set(true);

        this.empleadoService.deleteEmpleado(empleado.id).subscribe({
          next: () => {
            this.showToast(
              'Empleado eliminado exitosamente',
              'El empleado se eliminó correctamente.'
            );
            this.loadEmpleados();
          },
          error: (err) => {
            this.showToast('Error al eliminar empleado', 'Intente nuevamente.');
            this.loading.set(false);

            // Opcional: Mostrar otro alert con el error
            this.alertDialogService.confirm({
              zTitle: 'Error',
              zDescription: 'No se pudo eliminar la categoría. Por favor, intente nuevamente.',
              zOkText: 'Aceptar',
              zCancelText: '',
            });
          },
        });
      },
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  }
  formatPrice(price: string): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'BOB', // Código ISO de boliviano
      currencyDisplay: 'narrowSymbol', // Muestra el símbolo corto
    }).format(Number(price));
  }
  showToast(message: string, description: string) {
    toast.error(message, {
      description: description,
      position: 'top-right',
    });
  }
}
