import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './homemenu/home.component';
import { FooterComponent } from './footer/footer.component';
import { FormsSigninComponent } from './forms-signin/forms-signin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsLoginComponent } from './forms-login/forms-login.component';
import { ForusComponent } from './forus/forus.component';
import { FormsModule } from '@angular/forms';
import { HomepageComponent } from './homepage/homepage.component';
import { FoodDetailComponent } from './food-detail/food-detail.component';
import { StoreServiceComponent } from './store-service/store-service.component';
import { ComfirmDialogComponent } from './comfirm-dialog/comfirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    FormsSigninComponent,
    FormsLoginComponent,
    ForusComponent,
    HomepageComponent,
    FoodDetailComponent,
    StoreServiceComponent,
    ComfirmDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
