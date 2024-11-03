import { Routes } from '@angular/router';
import { LandingPageComponent } from './static/landing-page/landing-page.component';
import { LoginComponent } from './features/auth/login/login.component';
import { SignUpComponent } from './features/auth/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './features/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './features/auth/reset-password/reset-password.component';
import { DashboardComponent } from './features/video/dashboard/dashboard.component';
import { VideoPlayerComponent } from './features/video/video-player/video-player.component';
import { ImprintComponent } from './static/imprint/imprint.component';
import { PrivacyPolicyComponent } from './static/privacy-policy/privacy-policy.component';
import { HeroComponent } from './features/video/hero/hero.component';
import { VerificationComponent } from './features/auth/verification/verification.component';
import { AuthGuardService } from './services/guards/auth-guard.service';
import { AuthRedirectService } from './services/guards/auth-redirect.service';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    canActivate: [AuthRedirectService],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthRedirectService],
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [AuthRedirectService],
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [AuthRedirectService],
  },
  {
    path: 'reset-password',
    component: LoginComponent,
    canActivate: [AuthRedirectService],
  },
  {
    path: 'reset-password/:token',
    component: ResetPasswordComponent,
    canActivate: [AuthRedirectService],
  },
  {
    path: 'reset-password/:token',
    component: ResetPasswordComponent,
    canActivate: [AuthRedirectService],
  },
  {
    path: 'verification',
    component: LoginComponent,
    canActivate: [AuthRedirectService],
  },
  {
    path: 'verification/:token',
    component: VerificationComponent,
    canActivate: [AuthRedirectService],
  },


  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'hero', component: HeroComponent, canActivate: [AuthGuardService] },
  {
    path: 'video-player',
    component: VideoPlayerComponent,
    canActivate: [AuthGuardService],
  },

  { path: 'imprint', component: ImprintComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
];
