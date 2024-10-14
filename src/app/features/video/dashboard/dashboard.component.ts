import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
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

    trigger('showThumbnailTrigger', [
      state(
        'clear',
        style({ filter: 'blur(0px)', opacity: 1, transform: 'scale(1)' })
      ),
      state(
        'blurred',
        style({ filter: 'blur(5px)', opacity: 0.1, transform: 'scale(0.1)' })
      ),
      transition('blurred => clear', [animate('0.7s ease-out')], {}),
      transition('clear => blurred', [animate('0.4s ease-in')], {}),
    ]),

    trigger('zoomThumbnailTrigger', [
      state('zoom-out', style({})),
      state('zoom-in', style({ zIndex: '999' })),
      transition('zoom-out => zoom-in', [
        animate('0s', style({ position: 'absolute' })),
        animate(
          '1s ease-in-out',
          style({ transform: 'scale(10)', filter: 'blur(10px)' })
        ),
      ]),
    ]),
  ],
})
export class DashboardComponent {
  router = inject(Router);

  state = 'hidden-bottom';
  teaserState = 'hidden-right';
  thumbnailState = 'blurred';
  zoomState = 'zoom-out';

  ngAfterViewInit() {
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      this.state = 'shown';
      this.thumbnailState = 'clear';
      this.teaserState = 'shown';
    }, 200);
  }

  showHero() {
    if (window.innerWidth > 769) {
      this.state = 'hidden-bottom';
      this.teaserState = 'hidden-right';
      setTimeout(() => {
        this.state = 'shown';
        this.teaserState = 'shown';
      }, 700);
    } else {
      this.thumbnailState = 'blurred';
      setTimeout(() => {
        this.redirect('/hero');
      }, 400);
    }
  }

  openVideo(target: string) {
    document.body.style.overflow = 'hidden';
    this.zoomState = 'zoom-in';
    this.thumbnailState = 'blurred';
    setTimeout(() => {
      document.body.style.overflow = 'auto';
      this.redirect(target);
    }, 1000);
  }

  logout() {
    this.state = 'hidden-bottom';
    this.thumbnailState = 'blurred';
    setTimeout(() => {
      this.redirect('/');
    }, 700);
  }

  redirect(target: string) {
    this.router.navigate([`${target}`]);
  }
}
