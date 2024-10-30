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

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'verification/:userId/:token', component: VerificationComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'hero', component: HeroComponent },
  { path: 'video-player', component: VideoPlayerComponent },
  { path: 'imprint', component: ImprintComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
];
