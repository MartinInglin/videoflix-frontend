import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  router =  inject(Router)

  route:string = '/login'

  ngOnInit(): void {
    this.route = this.router.url
    console.log(this.route);
  }

}
