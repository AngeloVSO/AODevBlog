import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Photo } from './../../models/photo/photo.model';
import { PhotoService } from './../../services/photo.service';

@Component({
  selector: 'app-photo-album',
  templateUrl: './photo-album.component.html',
  styleUrls: ['./photo-album.component.css'],
})
export class PhotoAlbumComponent implements OnInit {
  @ViewChild('photoForm') photoForm!: NgForm;
  @ViewChild('photoUploadElement') photoUploadElement!: ElementRef;

  photos!: Photo[];
  photoFile: any;
  newPhotoDescription!: string;

  constructor(
    private photoService: PhotoService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.photos = [];
    this.photoService.getByApplicationUserId().subscribe((userPhotos) => {
      this.photos = userPhotos;
    });
  }

  confirmDelete(photo: Photo) {
    photo.deleteConfirm = true;
  }

  cancelDeleteConfirm(photo: Photo) {
    photo.deleteConfirm = false;
  }

  deletePhoto(photo: Photo) {
    this.photoService.delete(photo.photoId).subscribe(() => {
      this.photos = this.photos.filter((p) => p.photoId !== photo.photoId);

      this.toastrService.info('Photo deleted.');
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.photoFile = file;
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.photoFile, this.newPhotoDescription);

    this.photoService.create(formData).subscribe((createdPhoto) => {
      this.photoForm.reset();
      this.photoUploadElement.nativeElement.value = '';

      this.toastrService.info('Photo uploaded.');
      this.photos.unshift(createdPhoto);
    });
  }
}
