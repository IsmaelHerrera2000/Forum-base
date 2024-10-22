import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ForumService } from '../../services/forum.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forum-create-section',
  standalone: true,
  imports: [FormsModule, CommonModule, ToastrModule],
  templateUrl: './forum-create-section.component.html',
  styleUrl: './forum-create-section.component.css'
})
export class ForumCreateSectionComponent implements OnInit {

  sectionName: string = '';
  sectionDescription: string = ''; 
  isAdmin: boolean = false;

  constructor(
    private forumService: ForumService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService 
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
  }

  createSection() {
    if (this.sectionName.trim() === '' || this.sectionDescription.trim() === '') {
      this.toastr.error('El nombre y la descripción de la sección no pueden estar vacíos.'); 
      return;
    }

    this.forumService.createSection({ 
      name: this.sectionName, 
      description: this.sectionDescription 
    }).subscribe(
      (response) => {
        this.toastr.success('Sección creada con éxito.'); 
        this.router.navigate(['/forum']); 
      },
      (error) => {
        console.error('Error al crear la sección:', error);
        this.toastr.error('Hubo un error al crear la sección.');
      }
    );
  }
}