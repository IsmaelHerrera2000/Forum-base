import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ForumService } from '../../services/forum.service';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forum-posts',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './forum-posts.component.html',
  styleUrl: './forum-posts.component.css'
})
export class ForumPostsComponent implements OnInit {
  posts: any[] = [];
  sectionId: string = '';
  section: any;
  newPost = { title: '', content: '' }; 
  showCreatePostForm: boolean = false; 

  constructor(
    private forumService: ForumService,
    private route: ActivatedRoute,
    public authService: AuthService, 
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.sectionId = this.route.snapshot.paramMap.get('sectionId')!;
    this.loadSection();
    this.loadPosts();
  }

  loadSection() {
    this.forumService.getSectionById(this.sectionId).subscribe(
      (response) => {
        this.section = response; 
      },
      (error) => {
        console.error('Error al cargar la sección:', error);
      }
    );
  }

  loadPosts() {
    this.forumService.getPostsBySection(this.sectionId).subscribe(
      (response) => {
        this.posts = response;
      },
      (error) => {
        console.error('Error al cargar los posts:', error);
      }
    );
  }

  createPost() {
    if (!this.authService.isLoggedIn()) {
        this.toastr.error('Debes estar logueado para crear un post.'); 
        return;
    }

    const postData = {
        title: this.newPost.title,
        content: this.newPost.content,
    };

    this.forumService.createPost(this.sectionId, postData).subscribe(
        (response) => {
            this.posts.push(response);
            this.newPost.title = '';
            this.newPost.content = '';
            this.showCreatePostForm = false;
            this.toastr.success('Post creado exitosamente.'); 
        },
        (error) => {
            console.error('Error al crear el post:', error);
            this.toastr.error('Error al crear el post.'); 
        }
    );
}

}