import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  emailValid: boolean = true;
  passwordValid: boolean = true;
  passwordVisible: boolean = false;

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validatePassword(password: string): boolean {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9]).{6,}$/;
    return passwordRegex.test(password);
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit() {
    const user = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    if (!this.validateEmail(this.email)) {
      this.toastr.error('Por favor, introduce un email válido.', 'Error de validación', {
        timeOut: 3000,
        closeButton: true,
        progressBar: true,
        progressAnimation: 'increasing',
      });
      return;
    }

    if (!this.validatePassword(this.password)) {
      this.toastr.error('La contraseña debe tener al menos 6 caracteres, un número y una mayúscula.', 'Error de validación', {
        timeOut: 3000,
        closeButton: true,
        progressBar: true,
        progressAnimation: 'increasing',
      });
      return;
    }

    this.authService.register(user).subscribe(
      response => {
        console.log('Usuario registrado con éxito');
        const credentials = { email: this.email, password: this.password };

        this.authService.login(credentials).subscribe(
          loginResponse => {
            this.authService.saveToken(loginResponse.token);
            console.log('Inicio de sesión automático exitoso');
            this.router.navigate(['/']);
          },
          error => {
            console.error('Error al iniciar sesión automáticamente', error);
          }
        );
      },
      error => {
        console.error('Error en el registro', error);
        this.toastr.error(error, 'Error en el registro', {
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
          progressAnimation: 'increasing',
        });
      }
    );
  }
}
