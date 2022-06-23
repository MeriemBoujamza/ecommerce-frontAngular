import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  { path: 'products/:p1/:p2', component: ProductsComponent },
  { path: '', redirectTo: 'products/1/0', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'product/:id', component: ProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
