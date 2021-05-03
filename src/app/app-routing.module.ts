import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { LoginComponent } from './components/login/login.component';
import { PasswordUpdateComponent } from './components/password-update/password-update.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginGuard } from './guards/login.guard';
import { NotLoggedInGuard } from './guards/not-logged-in.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CarComponent },
  { path: 'cars', component: CarComponent },
  { path: 'cars/brands/:brandId', component: CarComponent },
  { path: 'cars/colors/:colorId', component: CarComponent },
  { path: 'cars/:carId', component: CarDetailComponent },
  {
    path: 'cars/:carId/rent',
    component: PaymentComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'brands/add',
    component: BrandAddComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'colors/add',
    component: ColorAddComponent,
    canActivate: [LoginGuard],
  },
  { path: 'car/add', component: CarAddComponent, canActivate: [LoginGuard] },
  { path: 'login', component: LoginComponent, canActivate: [NotLoggedInGuard] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NotLoggedInGuard],
  },
  {
    path: 'user/update-info',
    component: AccountComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'user/update-password',
    component: PasswordUpdateComponent,
    canActivate: [LoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
