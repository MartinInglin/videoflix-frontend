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

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'resetPassword', component: ResetPasswordComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'videoPlayer', component: VideoPlayerComponent },
  { path: 'imprint', component: ImprintComponent },
  { path: 'privacyPolicy', component: PrivacyPolicyComponent },
];
