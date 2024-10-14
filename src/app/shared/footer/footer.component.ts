import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  router = inject(Router);

  route: string = '/login';

  ngOnInit(): void {
    this.route = this.router.url;
  }
}
