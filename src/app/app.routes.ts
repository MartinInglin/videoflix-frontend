import { Routes } from '@angular/router';
import { LandingPageComponent } from './static/landing-page/landing-page.component';
import { LoginComponent } from './features/auth/login/login.component';
import { SignUpComponent } from './features/auth/sign-up/sign-up.component';

export const routes: Routes = [
    {path: '', component: LandingPageComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signUp', component: SignUpComponent},
];
