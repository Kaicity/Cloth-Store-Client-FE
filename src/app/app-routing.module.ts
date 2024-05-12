import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './homemenu/home.component';
import {FormsSigninComponent} from './forms-signin/forms-signin.component';
import {FormsLoginComponent} from './forms-login/forms-login.component';
import {ForusComponent} from './forus/forus.component';
import {HomepageComponent} from './homepage/homepage.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {StoreServiceComponent} from './store-service/store-service.component';
import {CustomerInfoComponent} from './customer-info/customer-info.component';
import {ShippingComponent} from './shipping/shipping.component';
import {SucessStatusComponent} from './sucess-status/sucess-status.component';
import {CartComponent} from "./cart/cart.component";
import {PageErrorComponent} from "./page-error/page-error.component";
import {ContactComponent} from "./contact/contact.component";
import {OrderHistoryComponent} from "./order-history/order-history.component";
import {TestComponent} from "./test/test.component";


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'form-signin', component: FormsSigninComponent},
  {path: 'form-login', component: FormsLoginComponent},
  {path: 'about-us', component: ForusComponent},
  {path: 'homepage', component: HomepageComponent},
  {path: 'product', component: HomeComponent},
  {path : 'cart', component: CartComponent},
  {path: 'product/:id', component: ProductDetailComponent},
  {path: 'store-service', component: StoreServiceComponent},
  {path : 'customer-info', component: CustomerInfoComponent},
  {path: 'shipping', component: ShippingComponent},
  {path: 'success-order', component: SucessStatusComponent},
  {path: 'page-error', component: PageErrorComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'order-history', component: OrderHistoryComponent},
  {path: 'test', component: TestComponent},
  {path: '', redirectTo: 'product', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
