import { Blog } from './../../../models/blog/blog.model';
import { ActivatedRoute } from '@angular/router';
import { PhotoService } from './../../../services/photo.service';
import { BlogService } from './../../../services/blog.service';
import { Component, OnInit } from '@angular/core';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  blog!: Blog;
  blogPhotoUrl!: string;

  constructor(
    private blogService: BlogService,
    private photoService: PhotoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const blogId = Number(this.route.snapshot.paramMap.get('id'));

    this.blogService
      .get(blogId)
      .pipe(tap((blog) => (this.blog = blog)))
      .subscribe(() => {
        if (!!this.blog.photoId) {
          this.photoService.get(this.blog.photoId).subscribe((photo) => {
            this.blogPhotoUrl = photo.imageUrl;
          });
        }
      });
  }
}
