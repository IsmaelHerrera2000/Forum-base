import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ForumService } from '../../services/forum.service';
import { AuthService } from '../../services/auth.service'; // Importa el AuthService
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forum-post-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './forum-post-detail.component.html',
  styleUrl: './forum-post-detail.component.css'
})
export class ForumPostDetailComponent implements OnInit {
  post: any = { comments: [] };
  newComment: string = '';
  
  currentPage: number = 1;
  commentsPerPage: number = 20;
  paginatedComments: any[] = [];
  totalPages: number = 1;
  paginationArray: number[] = [];

  currentUser: any; // Añadir propiedad para el usuario logueado

  constructor(private forumService: ForumService, private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('postId')!;
    this.loadPost(postId);
    this.currentUser = this.authService.getLoggedUser(); // Obtener el usuario logueado
  }

  loadPost(postId: string) {
    this.forumService.getPost(postId).subscribe(
      (response) => {
        this.post = response;
        this.loadComments(postId);
      },
      (error) => {
        console.error('Error al cargar el post:', error);
      }
    );
  }

  loadComments(postId: string) {
    this.forumService.getComments(postId).subscribe(
      (comments) => {
        this.post.comments = comments;
        this.totalPages = Math.ceil(this.post.comments.length / this.commentsPerPage);
        this.paginationArray = Array.from({ length: this.totalPages }, (_, i) => i + 1); 
        this.paginateComments();
      },
      (error) => {
        console.error('Error al cargar los comentarios:', error);
      }
    );
  }

  paginateComments() {
    const start = (this.currentPage - 1) * this.commentsPerPage;
    const end = start + this.commentsPerPage;
    this.paginatedComments = this.post.comments.slice(start, end);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.paginateComments();
  }

  addComment() {
    if (this.newComment.trim() === '') return;

    this.forumService.createComment(this.post._id, { content: this.newComment }).subscribe(
      (response) => {
        this.newComment = '';
        this.loadComments(this.post._id); 
      },
      (error) => {
        console.error('Error al añadir comentario:', error);
      }
    );
  }
}
