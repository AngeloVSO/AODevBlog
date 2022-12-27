import { Blog } from './../../models/blog/blog.model';
import { AccountService } from './../../services/account.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BlogService } from './../../services/blog.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userBlogs!: Blog[];

  constructor(
    private blogService: BlogService,
    private router: Router,
    private toastrService: ToastrService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.userBlogs = [];

    const currentApplicationUserId =
      this.accountService.currentUserValue.applicationUserId;

    this.blogService
      .getByApplicationUserId(currentApplicationUserId)
      .subscribe((userBlogs) => {
        this.userBlogs = userBlogs;
      });
  }

  confirmDelete(blog: Blog) {
    blog.deleteConfirm = true;
  }

  cancelDeleteConfirm(blog: Blog) {
    blog.deleteConfirm = false;
  }

  deleteBlog(blog: Blog, blogs: Blog[]) {
    this.blogService.delete(blog.blogId).subscribe(() => {
      this.userBlogs = blogs.filter((b) => b.blogId !== blog.blogId);
      this.toastrService.info('Blog deleted.');
    });
  }

  editBlog(blogId: number) {
    this.router.navigate([`/dashboard/${blogId}`]);
  }

  createBlog() {
    this.router.navigate(['/dashboard/-1']); //ver melhor forma de tratar isso aqui
  }
}
