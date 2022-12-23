import { BlogCommentCreate } from './../models/blog-comment/blog-comment-create.model';
import { BlogComment } from './../models/blog-comment/blog-commnet.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlogCommentService {
  constructor(private http: HttpClient) {}

  create(model: BlogCommentCreate): Observable<BlogComment> {
    return this.http.post<BlogComment>(
      `${environment.webApi}/BlogComment`,
      model
    );
  }

  delete(blogCommentId: number): Observable<number> {
    return this.http.delete<number>(
      `${environment.webApi}/BlogComment/${blogCommentId}`
    );
  }

  getAll(blogId: number): Observable<BlogComment[]> {
    return this.http.get<BlogComment[]>(
      `${environment.webApi}/BlogComment/${blogId}`
    );
  }
}
