import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from "@angular/router";
import { Routes } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { HomeComponent } from "./home/home/home.component";
import { ClientesComponent } from "./clients/clients-list/clients-list.component";
import { ClientFormComponent } from "./clients/client-form/client-form.component";
import { RegisterComponent } from "./auth/register/register.component";
import { authGuard } from "./auth/auth.guard";
import { ClientViewComponent } from "./clients/client-view/client-view.component";
import { AppointmentFormComponent } from "./appointments/appointment-form/appointment-form.component";
import { AppointmentListComponent } from "./appointments/appointment-list/appointment-list.component"
import { AppointmentViewComponent } from "./appointments/appointment-view/appointment-view.component"


export const appRoutes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "cadastro", component: RegisterComponent },
  { path: "home", component: HomeComponent, canActivate: [authGuard] },
  { path: "clientes", component: ClientesComponent, canActivate: [authGuard] },
  {
    path: "clientes/novo",
    component: ClientFormComponent,
    canActivate: [authGuard],
  },
  {
    path: "clientes/editar/:id",
    component: ClientFormComponent,
    canActivate: [authGuard],
  },
  {
    path: "clientes/visualizar/:id",
    component: ClientViewComponent,
    canActivate: [authGuard],
  },
  {
    path: "agendamentos/novo",
    component: AppointmentFormComponent,
    canActivate: [authGuard],
  },
  {
    path: "agendamentos/visualizar/:id",
    component: AppointmentViewComponent,
    canActivate: [authGuard],
  },
  {
    path: "agendamentos/editar/:id",
    component: AppointmentFormComponent,
    canActivate: [authGuard],
  },
  {
    path: "agendamentos/lista",
    component: AppointmentListComponent,
    canActivate: [authGuard],
  },
  { path: "**", redirectTo: "login" },
];

export const appRoutingProviders = [
  provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
];
