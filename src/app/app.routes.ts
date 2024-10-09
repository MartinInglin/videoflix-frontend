import { Routes } from '@angular/router';
import { LandingPageComponent } from './static/landing-page/landing-page.component';
import { LoginComponent } from './features/auth/login/login.component';

export const routes: Routes = [
    {path: '', component: LandingPageComponent},
    {path: 'login', component: LoginComponent}
];
