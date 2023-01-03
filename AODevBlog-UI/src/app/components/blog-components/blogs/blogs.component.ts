import { Component, OnInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { PagedResult } from './../../../models/blog/paged-result.model';
import { BlogPaging } from './../../../models/blog/blog-paging.model';
import { BlogService } from './../../../services/blog.service';
import { Blog } from './../../../models/blog/blog.model';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
})
export class BlogsComponent implements OnInit {
  blogs!: PagedResult<Blog> | any;

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    const blogPaging: BlogPaging = {
      page: 1,
      pageSize: 6,
    };

    this.loadPagedBlogs(blogPaging);
  }

  pageChanged(event: PageChangedEvent) {
    const blogPaging: BlogPaging = {
      page: event.page,
      pageSize: event.itemsPerPage,
    };
    this.loadPagedBlogs(blogPaging);
  }

  loadPagedBlogs(blogPaging: BlogPaging) {
    this.blogService.getAll(blogPaging).subscribe((blogs) => {
      this.blogs = blogs;
    });
  }
}
