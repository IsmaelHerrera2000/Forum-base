import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.css'
})
export class UnauthorizedComponent {
  constructor(private router: Router) {}

  goToHome() {
    this.router.navigate(['/']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
