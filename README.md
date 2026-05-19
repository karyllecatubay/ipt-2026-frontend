# Angular 21 Auth Boilerplate

A comprehensive Angular 21 boilerplate project featuring authentication, user management, and role-based access control.

## Project Architecture

This project follows the traditional **NgModule-based** architecture. It uses:
- **NgModules** for organization and lazy loading.
- **HTTP Interceptors** for JWT handling and error management.
- **Fake Backend** for local development without an external API.

---

## Recent Fixes & Configuration Changes

The project was recently updated to resolve an issue where modules and components were not being recognized. Below are the details of the changes made.

### 1. Bootstrap Alignment (Standalone -> NgModule)

The application was mistakenly configured to bootstrap as a **Standalone** application, which caused it to ignore the `AppModule` and all its declarations.

**Before (Incorrect Standalone Bootstrap in `main.ts`):**
```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
```

**After (Correct NgModule Bootstrap in `main.ts`):**
```typescript
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch((err) => console.error(err));
```

### 2. Component Structure Correction

The root component was switched from the standalone `App` component to the proper `AppComponent` which includes the application's layout, navigation, and alert system.

- **Removed Standalone Files:** `src/app/app.ts`, `src/app/app.config.ts`, `src/app/app.routes.ts`, `src/app/app.html`, `src/app/app.css`.
- **Restored Root Component:** `src/app/app.component.ts` (and its associated template/styles).

### 3. Profile Module Fix

A build error was resolved in the Profile module where the component template filename did not match the class configuration.

- **Change:** Renamed `src/app/profile/detail.component.html` to `src/app/profile/details.component.html`.
- **Reason:** The `DetailsComponent` was looking for `details.component.html`, causing a compilation failure.

### 4. Persistent Alerts for Verification

The simulated "email" alerts for verification and password reset were disappearing too quickly for users to click the links.

- **Change:** Modified `src/app/_helpers/fake-backend.ts` to set `{ autoClose: false }` for these specific alerts.
- **Result:** Alerts containing verification and reset links will now stay on screen until manually closed or the link is clicked.

---

## Features

- **Authentication:** Login, Registration, Email Verification.
- **Password Management:** Forgot Password, Reset Password.
- **User Profile:** View and update account details.
- **Admin Panel:** User management (List, Create, Edit, Delete).
- **Security:**
  - `AuthGuard`: Protects routes based on authentication status and roles.
  - `JwtInterceptor`: Automatically attaches JWT tokens to requests.
  - `ErrorInterceptor`: Handles 401/403 errors and redirects to login.

## Getting Started

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run Development Server:**
   ```bash
   npm start
   ```
   The app will open at `http://localhost:4200/`.

3. **Build for Production:**
   ```bash
   npm run build
   ```
   The output will be in the `dist/angular-21-boilerplate` directory.

## Testing

Run unit tests via Karma:
```bash
npm test
```
