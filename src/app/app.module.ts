import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './homemenu/home.component';
import {FooterComponent} from './footer/footer.component';
import {FormsSigninComponent} from './forms-signin/forms-signin.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsLoginComponent} from './forms-login/forms-login.component';
import {ForusComponent} from './forus/forus.component';
import {FormsModule} from '@angular/forms';
import {HomepageComponent} from './homepage/homepage.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {StoreServiceComponent} from './store-service/store-service.component';
import {ComfirmDialogComponent} from './comfirm-dialog/comfirm-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {HttpClientModule} from "@angular/common/http";
import {SpinnerComponent} from './spinner/spinner.component';
import {CustomerInfoComponent} from './customer-info/customer-info.component';
import {ShippingComponent} from './shipping/shipping.component';
import {ControlMaterial} from 'src/ui-component/ControlMaterial';
import {SucessStatusComponent} from './sucess-status/sucess-status.component';
import {ModalWrapperComponent} from './modal-wrapper/modal-wrapper.component';
import {AlertComponent} from './Share/Component/alert/alert.component';
import {CartComponent} from './cart/cart.component';
import {PageErrorComponent} from './page-error/page-error.component';
import {ContactComponent} from './contact/contact.component';
import {OrderHistoryComponent} from './order-history/order-history.component'
import {AngularFireModule} from "@angular/fire/compat";
import {FirebaseEnvironment} from "../firebase/firebase-environment";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import { TestComponent } from './test/test.component';


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
    ProductDetailComponent,
    StoreServiceComponent,
    ComfirmDialogComponent,
    SpinnerComponent,
    CustomerInfoComponent,
    ShippingComponent,
    SucessStatusComponent,
    ModalWrapperComponent,
    AlertComponent,
    CartComponent,
    PageErrorComponent,
    ContactComponent,
    OrderHistoryComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
    HttpClientModule,
    ControlMaterial,
    AngularFireModule.initializeApp(FirebaseEnvironment.firebaseConfig),
    AngularFireStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
