# Proyecto Parcial - Sistema de Gestión de Empleados

Sistema CRUD de empleados desarrollado con Angular (Frontend).

## Descripción del Proyecto

Aplicación web para gestionar información de empleados que incluye:
- Interfaz de usuario moderna con Angular 20
- Tabla responsiva para listar empleados
- Formulario modal para registrar empleados
- Validaciones en tiempo real
- Notificaciones toast
- Integración con API REST

## Tecnologías Utilizadas

### Frontend
- Angular 20.x
- TypeScript 5.x
- Zard UI (componentes)
- Tailwind CSS 4.x
- ngx-sonner (notificaciones)
- RxJS 7.x

## Instalación y Configuración

### Frontend (Angular)

1. **Clonar el repositorio**
```bash
git clone https://github.com/Fernixp/parcial-fe
cd parcial-fe
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar servidor de desarrollo**
```bash
npm start
```

La aplicación estará disponible en: `http://localhost:4200`

## 📁 Estructura del Proyecto

```
src/app/
├── pages/
│   └── empleados/
│       ├── empleados.ts                # Componente principal
│       ├── empleados.html              # Template
│       ├── empleados.css               # Estilos
│       └── empleado-form-dialog.ts     # Formulario modal
├── services/
│   └── empleado.service.ts             # Servicio HTTP
├── layout/
│   ├── layout.ts                       # Layout principal
│   └── layout.html                     # Sidebar y navegación
├── shared/
│   └── components/                     # Componentes Zard UI
├── app.routes.ts                       # Configuración de rutas
└── app.config.ts                       # Configuración global
```

## ✅ Funcionalidades Implementadas

### Listar Empleados
- ✅ Tabla con datos desde API
- ✅ Muestra: ID, nombre completo, correo, salario
- ✅ Formato de moneda para salarios
- ✅ Estado de carga (loading spinner)
- ✅ Manejo de errores

### Registrar Empleados
- ✅ Formulario modal
- ✅ Campos: nombre, apellido, correo, salario
- ✅ Validaciones del cliente
- ✅ Validaciones del servidor (error 422)
- ✅ Notificaciones de éxito/error
- ✅ Recarga automática de tabla

## 🎨 Características de la UI

- **Responsive**: Adaptado para móvil, tablet y desktop
- **Sidebar colapsable**: En desktop
- **Menú hamburguesa**: En móvil con overlay
- **Toasts**: Notificaciones de éxito y error
- **Loading states**: Spinners durante cargas
- **Error handling**: Mensajes descriptivos de errores

## 👨‍💻 Autor

Desarrollado por [Fernixp](https://github.com/Fernixp) con ❤️ usando Angular 20 y Zard UI

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

---

## 🤝 Contribuir

¿Encontraste un bug o quieres agregar una nueva funcionalidad?

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

## 🎉 ¡Gracias por usar este proyecto!

Si te fue útil, no olvides dejar una ⭐