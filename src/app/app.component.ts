import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = '';
  config: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('/assets/config.json').subscribe((config: any) => {
      this.config = config;
      this.applyConfig();
    });
  }

  applyConfig(): void {
    this.title = this.config.appName;
  }
}
