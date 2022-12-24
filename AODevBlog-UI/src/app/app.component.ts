import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'AODevBlog-UI';
  private dateNow = new Date(Date.now());
  currentYear = this.dateNow.getFullYear();
}
