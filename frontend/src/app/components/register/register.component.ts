import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] 
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {} 

  onSubmit() {
    const user = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.authService.register(user).subscribe(response => {
      console.log('Usuario registrado con éxito');

      const credentials = { email: this.email, password: this.password };

      this.authService.login(credentials).subscribe(loginResponse => {
        this.authService.saveToken(loginResponse.token);
        console.log('Inicio de sesión automático exitoso');

        this.router.navigate(['/']); 
      }, error => {
        console.error('Error al iniciar sesión automáticamente', error);
      });
    }, error => {
      console.error('Error en el registro', error);
    });
  }
}
