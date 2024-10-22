import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any = {};
  editMode: boolean = false;
  imageUrlValid: boolean = true;
  emailValid: boolean = true;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('userId');
    if (userId) {
      this.authService.getProfile(userId).subscribe(
        (user) => {
          this.user = user;
        },
        (error) => {
          console.error(error);
          this.router.navigate(['/login']);
        }
      );
    }
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  validateImageUrl(url: string): boolean {
    const regex = /^(http|https):\/\/.+/;
    return regex.test(url);
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailValid = emailRegex.test(email);
    return this.emailValid;
  }

  saveProfile() {
    if (!this.validateEmail(this.user.email)) {
      this.emailValid = false;
      return;
    }

    if (!this.validateImageUrl(this.user.profileImage)) {
      this.imageUrlValid = false;
      return;
    }

    const userId = this.route.snapshot.paramMap.get('userId');
    if (userId) {
      this.authService.updateProfile(userId, this.user).subscribe(
        (response) => {
          console.log('Perfil actualizado');
          this.editMode = false;
          this.imageUrlValid = true;
          this.emailValid = true;

          window.parent.postMessage(
            { type: 'user-updated', user: this.user },
            '*'
          );
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  deleteProfile() {
    const userId = this.route.snapshot.paramMap.get('userId');
    const loggedUser = this.authService.getLoggedUser();

    if (userId !== null) {
      console.log('Eliminando cuenta...', userId);
      this.authService.deleteProfile(userId).subscribe(
        () => {
          console.log('Cuenta eliminada con éxito');

          if (loggedUser && loggedUser.userId === userId) {
            this.authService.logout();
            this.router.navigate(['/login']);
          } else {
            this.router.navigate(['/admin-dashboard']);
          }
        },
        (error) => {
          console.error('Error al eliminar la cuenta:', error);
        }
      );
    } else {
      console.error('No se encontró un userId en la URL');
    }
  }

  canDeleteProfile() {
    return (
      this.authService.getLoggedUser().role === 'admin' ||
      this.authService.getLoggedUser().userId === this.user._id
    );
  }
}
