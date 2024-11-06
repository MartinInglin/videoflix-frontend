import { Component, HostListener, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VideoService } from '../../../services/video.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  animations: [
    trigger('hideShowTrigger', [
      state('shown', style({ transform: 'translateY(0%)', opacity: 1 })),
      state(
        'hidden-bottom',
        style({ transform: 'translateY(1000%)', opacity: 0.1 })
      ),
      transition('hidden-bottom => shown', [animate('0.7s ease-out')], {}),
      transition('shown => hidden-bottom', [animate('0.4s ease-in')], {}),
    ]),

    trigger('hideShowTeaser', [
      state('shown', style({ transform: 'translateX(0%)', opacity: 1 })),
      state(
        'hidden-right',
        style({ transform: 'translateX(1000%)', opacity: 0.1 })
      ),
      transition('hidden-right => shown', [animate('0.7s ease-out')], {}),
      transition('shown => hidden-right', [animate('0.4s ease-in')], {}),
    ]),
  ],
})
export class HeroComponent {
  router = inject(Router);
  videoService = inject(VideoService);

  state = 'hidden-bottom';
  teaserState = 'hidden-right';
  overflowMainContainer: string = 'hidden';

  baseUrl = environment.baseUrl;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (window.innerWidth > 769) {
      this.redirect('/dashboard')
    }
  }

  ngOnInit(): void {
    this.videoService.getHeroData()
  }

  ngAfterViewInit() {
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      this.state = 'shown';
      this.teaserState = 'shown';
    }, 200);
    setTimeout(() => {
      document.body.style.overflow = 'auto';
      this.overflowMainContainer = 'auto';
    }, 1200);
  }

  openVideo(target: string) {
    document.body.style.overflow = 'hidden';
    this.overflowMainContainer = 'hidden';
    this.state = 'hidden-bottom';
    this.teaserState = 'hidden-right';
    setTimeout(() => {
      document.body.style.overflow = 'auto';
      this.redirect(target);
    }, 1000);
  }

  redirectDashobard() {
    document.body.style.overflow = 'hidden';
    this.overflowMainContainer = 'hidden';
    this.state = 'hidden-bottom';
    this.teaserState = 'hidden-right';
    setTimeout(() => {
      this.redirect('/dashboard');
    }, 1000);
  }

  redirect(target: string) {
    this.router.navigate([`${target}`]);
  }
}
