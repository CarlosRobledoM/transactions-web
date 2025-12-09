# FinTracker – Frontend Personal Finance Assignment

Aplicación web para gestionar finanzas personales (ingresos, gastos y ahorros), implementada como prueba técnica con foco en:

- Arquitectura limpia y escalable.
- Buenas prácticas de React/Next.js App Router.
- Experiencia de usuario moderna, fluida y accesible.
- Código tipado, testeable y fácil de mantener.

---

## 1. Stack técnico

**Core**

- **Next.js (App Router)** + **React**
- **TypeScript**
- **Tailwind CSS** + tokens con **CSS variables**

**Estado y lógica**

- **Zustand** para estado global (auth, UI, transacciones).
- **React Hook Form** + **Zod** para formularios y validación tipada.

**UX / Animaciones**

- **Framer Motion** para modales y toasts.
- Skeleton loaders, estados vacíos y toasts globales.

**Testing**

- **Vitest**
- **React Testing Library** + **jest-dom**

### ¿Por qué Next.js App Router?

1. **Rutas + layouts anidados**  
   Permite separar claramente la app en segmentos:

   - `(public)/login` para acceso público.
   - `(private)/dashboard` para área autenticada.

   Cada segmento tiene su propio layout, lo que hace más simple proteger rutas privadas y aplicar shells de diseño distintos.

2. **React Server Components**

   - Layouts, shell y páginas se pueden renderizar en el servidor.
   - Componentes de UI interactivos (formularios, modales) se marcan como `use client`.
   - Esto optimiza el bundle y mejora la performance de forma nativa.

3. **APIs internas (`app/api`)**

   - Mock de backend dentro del mismo repo.
   - Endpoints RESTful (`/api/auth`, `/api/transactions`) preparados para sustituirse fácilmente por un backend real.

4. **Middleware de rutas protegidas**  
   Se usa `middleware.ts` para:
   - Redirigir a `/login` si el usuario no tiene cookie de sesión.
   - Impedir volver al login si ya está autenticado.

---

## 2. Arquitectura y organización del código

Se sigue una aproximación de **clean architecture orientada a features**, separando:

- **Dominio**: tipos y modelos de negocio.
- **Data / services**: acceso a APIs.
- **UI re-utilizable (design system)**: componentes base.
- **Features**: lógica y componentes propios de cada caso de uso (auth, transacciones).

```txt
src/
  app/
    (public)/
      login/
        page.tsx
    (private)/
      dashboard/
        layout.tsx
        page.tsx
    api/
      auth/
        route.ts
      transactions/
        route.ts

  domain/
    auth/
      authTypes.ts
    transactions/
      transactionTypes.ts

  features/
    auth/
      components/
        loginForm.tsx
      hooks/
        useLogin.ts
      services/
        authService.ts
    transactions/
      components/
        dashboardClient.tsx
        transactionSummaryCards.tsx
        transactionSummarySkeleton.tsx
        transactionTable.tsx
        transactionTableSkeleton.tsx
        transactionModal.tsx
        transactionForm.tsx
      hooks/
        useTransactions.ts
      services/
        transactionService.ts

  components/
    ui/
      button.tsx
      input.tsx
      badge.tsx
      modal.tsx
      skeleton.tsx
      toastContainer.tsx

  lib/
    api/
      httpClient.ts
    state/
      authStore.ts
      transactionsStore.ts
      uiStore.ts
      toastStore.ts
    utils/
      cn.ts
      currency.ts
    validation/
      authSchemas.ts
      transactionSchemas.ts

  styles/
    globals.css
    theme.css

  tests/
    ...
```

## Justificación de la arquitectura

- `domain/*`: mantiene el modelo de negocio independiente del framework (React/Next). Facilita refactor y reuso.
- `features/*`: agrupa lógica UI + servicios por caso de uso (`auth`, `transactions`). Esto escala mejor que estructuras “por tipo de archivo”.
- `components/ui/*`: mini design system (`Button`, `Input`, `Badge`, `Modal`, `Skeleton`, `Toast`) → consistencia visual y facilidad de cambios globales.
- `lib/state/*`: concentra estados globales en un solo lugar (`auth`, UI, toasts, transacciones).
- `app/api/*`: simula un backend real mediante rutas API de Next.js, preparando el proyecto para separar FE/BE más adelante.

---

## 3. Tema global, diseño y UX

### Paleta y design tokens

Se define un tema en `theme.css` usando CSS variables y se conecta a Tailwind.

**Colores semánticos:**

- `--color-income`, `--color-expense`, `--color-savings`
- `--color-brand`, `--color-brand-dark`
- `--color-bg`, `--color-surface`, `--color-text-main`, `--color-text-muted`

**Radios y sombra:**

- `--radius-lg`, `--radius-md`, `--radius-pill`
- `--shadow-soft`

**Ventaja:** cambiar la identidad visual (por ejemplo, color de gastos) se reduce a modificar una variable, sin tocar componentes.

### Componentes UI base

- **Button**: variantes `primary` y `ghost`, animación ligera de _scale/hover_, accesible con `focus-visible`.
- **Input**: estilos consistentes, soporta integración directa con `react-hook-form`.
- **Badge**: mapea `TransactionType` → estilos de color (Ingreso / Gasto / Ahorro).
- **Modal**:
  - Backdrop semitransparente y cierre clicando fuera o con botón.
  - Animación de entrada/salida con Framer Motion.
- **Skeleton**:
  - Efecto `animate-pulse` para estados de carga (summary y tabla).
- **ToastContainer**:
  - Toasts de tipo `success | error | info`.
  - Animaciones de aparición/desaparición.
  - _Auto-dismiss_ en 3 segundos.

### Detalles UX “senior”

- **Skeleton loaders**:
  - Summary y tabla muestran _skeletons_ mientras se cargan los datos.
  - Evita saltos bruscos de layout y mejora la percepción de rendimiento.
- **Estados vacíos**:
  - Tabla de transacciones muestra un estado vacío con icono, mensaje y CTA implícito (“Crea tu primera transacción…”).
- **Toasts globales**:
  - Éxito al iniciar sesión.
  - Éxito al crear una nueva transacción.
  - Mensajes de error cuando el login o la creación fallan.
- **Animaciones discretas**:
  - Botones con efecto de _scale_ mínimo.
  - Modales y toasts con transiciones suaves, sin recargar la interfaz.

---

## 4. Autenticación y rutas protegidas

### Flujo

**Login (`/login`):**

- `LoginForm` con `react-hook-form` + `zod`:
  - Validación de email requerido y formato.
  - Password mínima de 6 caracteres.
- Envía credenciales hacia `POST /api/auth`.

**API de auth:**

- Valida contra credenciales _mock_ (`demo@fintracker.com` / `fintracker123`).
- Si es válido:
  - Devuelve `user + token`.
  - Setea cookie `fintracker-token` (`httpOnly`).

**Store de auth (Zustand):**

- `authStore` guarda `user`, `token` e `isAuthenticated`.
- Persistencia con `localStorage` (name: `fintracker-auth`).

**Middleware:**

- Si no hay cookie y la ruta no es pública → redirige a `/login`.
- Si hay cookie y la ruta es `/login` → redirige a `/dashboard`.

### Justificación

- La cookie simula un backend real que maneja sesiones.
- El store de auth da acceso fácil a los datos del usuario en cualquier página.
- El Middleware centraliza la lógica de protección de rutas, evitando repetir lógica de redirección.

---

## 5. Transacciones y lógica de negocio

### Modelo de dominio

```ts
type TransactionType = "income" | "expense" | "savings";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  date: string; // 'YYYY-MM-DD'
}
```

## API de transacciones

`/api/transactions`:

- `GET` → devuelve la lista de transacciones *mockeadas*, alineadas con los montos/fechas del diseño.  
- `POST` → recibe `NewTransactionInput`, genera `id` y agrega la transacción al array en memoria.  

**Limitación conocida:** el estado en memoria se restablece cuando el proceso se reinicia (esperable en una prueba FE sin DB).

---

## Estado global de transacciones

**Zustand: `transactionsStore` contiene:**

- `transactions`, `isLoading`, `errorMessage`, `hasLoaded`.  
- `fetchTransactions`: carga inicial, idempotente.  
- `addTransaction`: crea en API + actualiza lista local.  

**Hook `useTransactions`:**

- Encapsula `useEffect` para cargar datos en el dashboard.  
- Expone `transactions`, `isLoading`, `errorMessage`, `addTransaction`.  

---

## Dashboard y componentes

- `DashboardClient` (Client Component) montado desde `dashboard/page.tsx` (Server Component).  

**TransactionSummaryCards:**

- Calcula totales de ingresos, gastos y ahorros con `useMemo`.  
- Muestra valores formateados con `formatCurrency`.  

**TransactionTable:**

- Muestra todas las transacciones.  
- Usa `Badge` para tipo (Ingreso/Gasto/Ahorro).  
- Incluye estado vacío cuando no hay datos.  

---

## Formulario de nueva transacción

- `TransactionModal` + `TransactionForm`.  

**Validación con `transactionFormSchema` (Zod):**

- `description` requerida, máximo 80 caracteres.  
- `amount` se valida como `string` pero se parsea a `number` con `parseCurrencyInput`.  
- `type` (`income | expense | savings`).  
- `date` requerida.  

**UX:**

- Selector de tipo como “chips” para Ingreso/Gasto/Ahorro.  
- Prefijo `$` en el input de monto.  
- Mensajes de errores específicos por campo.  
- Toast de éxito/error.  

---

## 6. Testing

### Stack de pruebas

- Vitest como test runner.  
- `@testing-library/react` para tests de componentes React.  
- `@testing-library/jest-dom` para *matchers* adicionales.  
- `jsdom` como entorno de ejecución.  

### Configuración

- `vitest.config.ts`:  
  - `environment: "jsdom"`.  
  - `setupFiles` → `vitest.setup.ts`.  
  - Alias `@` → `./src` para alinear con el proyecto.  
- `vitest.setup.ts`:  
  - Importa `@testing-library/jest-dom/vitest`.  

### Ejemplos de pruebas incluidas

**Utils:**

- `currency.test.ts`:  
  - `parseCurrencyInput` parsea correctamente *strings* formateados (`$1.200,50` → `1200.5`).  
  - `formatCurrency` produce un *string* razonable y localizable.  

**Lógica de negocio en UI:**

- `transactionSummaryCards.test.tsx`:  
  - Inyecta transacciones de ejemplo en `transactionsStore`.  
  - Verifica que los totales de Ingresos/Gastos/Ahorros se muestren correctamente.  

**Con más tiempo, se extenderían los tests a:**

- `LoginForm` (validaciones, estados de error).  
- `TransactionForm` (validación de campos obligatorios).  
- `TransactionTable` (estado vacío, render de filas).  

---

## 7. Cómo ejecutar el proyecto

### Prerrequisitos

- Node.js (versión LTS recomendada).  
- `npm` o `pnpm`/`yarn`.  

### Instalación

```bash
# Instalar dependencias
npm install

# Levantar el entorno de desarrollo
npm run dev

La aplicación por defecto corre en:  
http://localhost:3000

### Credenciales demo

- **Email:** `demo@fintracker.com`  
- **Password:** `fintracker123`  

### Tests

```bash
npm run test
```

---

## 8. Supuestos y limitaciones (por ser prueba técnica)

- El backend está *mockeado* y vive dentro de `app/api`:
  - No hay persistencia real (DB).
  - El estado puede reiniciarse entre ejecuciones.
  - El sistema maneja un único usuario demo.

- No se implementan:
  - Gestión real de recuperación de contraseña.
  - Paginación real en backend (la tabla muestra todos los registros simulados).
  - Filtro avanzado por tipo/fecha (se podría añadir fácilmente sobre la store).

---

## 9. Posibles mejoras y siguientes pasos

Si este proyecto evolucionara más allá de una prueba técnica, los siguientes pasos naturales serían:

### Integración con backend real

- Sustituir `app/api/*` por llamadas a un API externo.
- Añadir rutas protegidas por token JWT con *refresh tokens*.
- Persistir transacciones en una base de datos.

### Filtros y analíticas

- Filtros por rango de fechas, tipo y categoría.
- Resumen visual con gráficos (por ejemplo, con Recharts).

### Dark mode y theming avanzado

- Segunda paleta (`[data-theme="dark"]`) reutilizando las mismas CSS variables.
- *Toggle* de tema persistido por usuario.

### Accesibilidad y i18n

- Revisión exhaustiva de `aria-*`, `roles` y navegación por teclado.
- Internacionalización con `next-intl` o similar.

### Más cobertura de tests

- Tests de integración para el flujo completo (login → dashboard → nueva transacción).
- Tests e2e con Playwright o Cypress.

---

## 10. Conclusión

La solución está diseñada para:

- Cubrir todos los requerimientos de la prueba.
- Demostrar manejo de Next.js App Router, TypeScript, arquitectura limpia, manejo de estado, formularios complejos y mejora de UX.
- Dejar una base lista para ser escalada a un producto real con backend separado, más *features* y mayor profundidad en testing.

Cualquier aspecto se puede profundizar (por ejemplo, añadir filtros, gráficos o más casos de prueba) sin romper la arquitectura actual.
