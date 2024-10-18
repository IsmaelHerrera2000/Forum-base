import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  name: string = '';
  users: string[] = [];
  userssorted: string[] = [];

  constructor(private apiService: ApiService) {
    this.getUsers();
    this.getUsersSorted();
  }

  addUser() {
    if (this.name) {
      this.apiService.addUser(this.name).subscribe((user) => {
        this.users.push(user.name);  
        this.name = '';  
      });
    }
  }


  getUsers() {
    this.apiService.getUsers().subscribe((data: any[]) => {
      this.users = data.map(user => user.name);  
    });
  }

  getUsersSorted() {
    this.apiService.getUsersSorted().subscribe((data: any[]) => {
      this.userssorted = data.map(user => user.name); 
    });
  }
}
