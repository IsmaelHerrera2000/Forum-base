import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private toastr: ToastrService 
  ) {}

  onSubmit() {
    const credentials = {
      email: this.email,
      password: this.password
    };

    this.authService.login(credentials).subscribe(
      response => {
        this.authService.saveToken(response.token);
        console.log('Inicio de sesión exitoso');
        this.router.navigate(['/']); 
      }, 
      error => {
        console.error(error);
        this.toastr.error('Error en el inicio de sesión', '¡Oops!', {
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
          progressAnimation: 'increasing',
        });
      }
    );
  }
}
