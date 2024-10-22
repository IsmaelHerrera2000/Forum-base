import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { AdminGuard } from './guards/admin.guard';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ForumSectionsComponent } from './components/forum-sections/forum-sections.component';
import { ForumPostsComponent } from './components/forum-posts/forum-posts.component';
import { ForumPostDetailComponent } from './components/forum-post-detail/forum-post-detail.component';
import { ForumCreateSectionComponent } from './components/forum-create-section/forum-create-section.component';

export const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'profile/:userId',
    component: ProfileComponent,
    canActivate: [AuthGuard, roleGuard],
  },
  { path: 'unauthorized', component: UnauthorizedComponent },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard],
  },
  { path: 'forum', component: ForumSectionsComponent },
  { path: 'forum/sections/:sectionId/posts', component: ForumPostsComponent },
  { path: 'forum/posts/:postId', component: ForumPostDetailComponent },
  { path: 'forum/create-section', component: ForumCreateSectionComponent } ,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
