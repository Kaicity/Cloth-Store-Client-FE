import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './homemenu/home.component';
import { FormsSigninComponent } from './forms-signin/forms-signin.component';
import { FormsLoginComponent } from './forms-login/forms-login.component';
import { ForusComponent } from './forus/forus.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FoodDetailComponent } from './food-detail/food-detail.component';
import { StoreServiceComponent } from './store-service/store-service.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'form-signin', component: FormsSigninComponent},
  {path: 'form-login', component: FormsLoginComponent},
  {path: 'about-us', component: ForusComponent},
  {path: 'homepage', component: HomepageComponent},
  {path: 'food', component: HomeComponent},
  {path: 'food/:id', component: FoodDetailComponent},
  {path: 'store-service', component: StoreServiceComponent},
  {path: '', redirectTo: 'food', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
