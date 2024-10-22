import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../services/forum.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forum-sections',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './forum-sections.component.html',
  styleUrls: ['./forum-sections.component.css']
})
export class ForumSectionsComponent implements OnInit {
  sections: any[] = [];
  isAdmin: boolean = false;

  constructor(private forumService: ForumService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadSections();
    this.isAdmin = this.authService.isAdmin(); 
  }

  loadSections() {
    this.forumService.getAllSections().subscribe(
      (response) => {
        this.sections = response;
      },
      (error) => {
        console.error('Error al cargar las secciones:', error);
      }
    );
  }

  public navigateToCreateSection(): void {

    this.router.navigate(['/forum/create-section']);

  }

  goToPosts(sectionId: string) {
    this.router.navigate([`/forum/sections/${sectionId}/posts`]);
  }
}
