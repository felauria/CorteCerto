import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home/home.component';
import { ClientesComponent } from './clients/clients-list/clients-list.component'
import { ClientFormComponent } from './clients/client-form/client-form.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'clientes/novo', component: ClientFormComponent },
  { path: '**', redirectTo: 'login' }
];

export const appRoutingProviders = [
  provideRouter(appRoutes, withEnabledBlockingInitialNavigation())
];
