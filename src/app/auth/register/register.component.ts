import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class RegisterComponent {
  newUser = {
    username: "",
    nomeDaBarbearia: "",
    nome: "",
    sobrenome: "",
    password: "",
  };
  confirmarSenha: string = "";
  showSuccessModal: boolean = false;
  router = inject(Router);
  authService = inject(AuthService);

  goBack() {
    this.router.navigate(["/login"]);
  }

  register() {
    if (this.newUser.password !== this.confirmarSenha) {
      alert("Confirmação de senha não confere!");
      return;
    }
    this.authService.register(this.newUser).subscribe({
      next: () => {
        this.showSuccessModal = true;
      },
      error: (err) => {
        alert("Erro ao cadastrar: " + err.message);
      },
    });
  }

  closeModalAndGoToLogin() {
    this.showSuccessModal = false;
    this.router.navigate(["/login"]);
  }
}
