import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ]
})
export class LoginComponent {
  username: string = "";
  password: string = "";
  emailError: string = "";
  router = inject(Router);
  authService = inject(AuthService);

  continue() {
    if (!this.username || !this.password) {
      this.emailError = "Preencha usuário e senha!";
      return;
    }
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify(res.user)); // <-- Salva o usuário
        this.router.navigate(["/home"]);
      },
      error: (err) => {
        this.emailError = err.error?.detail || "Usuário ou senha inválidos!";
      },
    });
  }

  cadaster(){
    this.router.navigate(["/cadastro"]);
  }
}
