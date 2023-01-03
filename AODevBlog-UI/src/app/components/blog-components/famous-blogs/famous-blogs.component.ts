import { BlogService } from 'src/app/services/blog.service';
import { Blog } from './../../../models/blog/blog.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-famous-blogs',
  templateUrl: './famous-blogs.component.html',
  styleUrls: ['./famous-blogs.component.css'],
})
export class FamousBlogsComponent implements OnInit {
  famousBlogs$!: Observable<Blog[]>;

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.famousBlogs$ = this.blogService.getMostFamous();
  }
}
