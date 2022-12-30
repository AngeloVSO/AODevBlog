import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogCreate } from './../../../models/blog/blog-create.model';
import { Blog } from './../../../models/blog/blog.model';
import { Photo } from './../../../models/photo/photo.model';
import { PhotoService } from './../../../services/photo.service';
import { BlogService } from './../../../services/blog.service';
import { ToastrService } from 'ngx-toastr';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css'],
})
export class BlogEditComponent implements OnInit {
  blogForm!: FormGroup;
  confirmImageDelete!: boolean;
  userPhotos!: Photo[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private blogService: BlogService,
    private photoService: PhotoService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.userPhotos = [];
    this.confirmImageDelete = false;

    const blogId = Number(this.route.snapshot.paramMap.get('id'));

    this.blogForm = this.formBuilder.group({
      blogId: [blogId],
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(50),
        ],
      ],
      content: [
        '',
        [
          Validators.required,
          Validators.minLength(300),
          Validators.maxLength(3000),
        ],
      ],
      photoDescription: [null],
      photoId: [null],
    });

    this.photoService.getByApplicationUserId().subscribe((userPhotos) => {
      this.userPhotos = userPhotos;
    });

    if (blogId && blogId !== -1) {
      this.blogService.get(blogId).subscribe((blog) => {
        this.updateForm(blog);
      });
    }
  }

  getPhoto(photoId: number) {
    for (let i = 0; i < this.userPhotos.length; i++) {
      if (this.userPhotos[i].photoId === photoId) {
        return this.userPhotos[i];
      }
    }

    return null;
  }

  isTouched(filed: string) {
    return this.blogForm.get(filed)?.touched;
  }

  hasErrors(filed: string) {
    return this.blogForm.get(filed)?.errors;
  }

  hasError(filed: string, error: string) {
    return this.blogForm.get(filed)?.hasError(error);
  }

  isNewBlog() {
    return Number(this.blogForm.get('blogId')?.value) === -1;
  }

  detachPhoto() {
    this.blogForm.patchValue({
      photoId: null,
      photoDescription: null,
    });
  }

  updateForm(blog: Blog) {
    let photoDescription = this.getPhoto(blog.blogId)?.description;

    this.blogForm.patchValue({
      blogId: blog.blogId,
      title: blog.title,
      content: blog.content,
      photoDescription: photoDescription,
    });
  }

  onSelect(event: TypeaheadMatch) {
    let chosenPhoto: Photo = event.item;

    this.blogForm.patchValue({
      photoId: chosenPhoto.photoId,
      photoDescription: chosenPhoto.description,
    });
  }

  onSubmit() {
    let blogCreate: BlogCreate = new BlogCreate(
      this.blogForm.get('blogId')?.value,
      this.blogForm.get('title')?.value,
      this.blogForm.get('content')?.value,
      this.blogForm.get('photoId')?.value
    );

    this.blogService.create(blogCreate).subscribe((createdBlog) => {
      // this.updateForm(createdBlog);
      this.router.navigate(['/dashboard']);
      this.toastrService.info('Blog saved.');
    });
  }
}
