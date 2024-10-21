import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent implements OnInit {
  users: any[] = [];
  currentPage: number = 1;  
  totalUsers: number = 0;   
  pageSize: number = 10;    
  
  showAddUserModal = false; 
  newUser = { username: '', email: '', password: '', role: 'user' }; 

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(page: number = 1) {
    this.authService.getAllUsers(page, this.pageSize).subscribe(
      (response) => {
        this.users = response.users; 
        this.totalUsers = response.total;
        this.currentPage = page;
      },
      (error) => {
        console.error('Error al obtener los usuarios:', error);
      }
    );
  }

  goToProfile(userId: string) {
    this.router.navigate(['/profile', userId]);
  }

  changePage(page: number) {
    this.loadUsers(page);
  }

  openAddUserModal() {
    this.showAddUserModal = true;
  }

  closeAddUserModal() {
    this.showAddUserModal = false;
    this.resetNewUser();
  }

  resetNewUser() {
    this.newUser = { username: '', email: '', password: '', role: 'user' };
  }

  addUser() {
    this.authService.addUser(this.newUser).subscribe(
      (response) => {
        this.loadUsers(); 
        this.closeAddUserModal(); 
      },
      (error) => {
        console.error('Error al añadir usuario:', error);
      }
    );
  }
}
