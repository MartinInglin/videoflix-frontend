import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  router = inject(Router);
  location = inject(Location);

  route: string = '/login';

  @Output() redirectLogin = new EventEmitter();
  @Output() redirectDashboard = new EventEmitter();

  ngOnInit(): void {
    this.route = this.router.url;
  }

  goBack(): void {
    this.location.back();
  }

  sendRedirectLogin() {
    this.redirectLogin.emit();
  }

  sendRedirectDashboard() {
    this.redirectDashboard.emit();
  }
}
