import { ArrayType } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CatalogueService } from '../catalogue.service';
import { Caddy } from '../model/cart.model';
import { ItemProduct } from '../model/item-product.model';
import { AuthenticationService } from '../services/authentication.service';
import { CaddyService } from '../services/caddy.service';

@Component({
  selector: 'app-caddy',
  templateUrl: './caddy.component.html',
  styleUrls: ['./caddy.component.css'],
})
export class CaddyComponent implements OnInit {
  public caddy: Caddy;
  public products: ItemProduct[] = new Array();

  constructor(
    public catService: CatalogueService,
    private router: Router,
    public caddyService: CaddyService,
    public authService: AuthenticationService
  ) {}

  ngOnInit() {
    if (!this.authService.isAuthenticated())
      this.router.navigateByUrl('/login');
    this.caddy = this.caddyService.getCaddy();

    for (let key in this.caddyService.getCaddy().items) {
      let p = new ItemProduct();
      p.id = this.caddy.items[key]['id'];
      p.name = this.caddy.items[key]['name'];
      p.price = this.caddy.items[key]['price'];
      p.quantity = this.caddy.items[key]['quantity'];
      this.products.push(p);
    }
    console.log(this.products);
  }

  onRemoveProductFromCaddy(p: ItemProduct) {
    this.caddyService.removeProduct(p.id);
    this.router.navigateByUrl('/caddy');
  }

  getValues(): Array<ItemProduct> {
    return Array.from(this.caddy.items.values());
  }
  getTotal() {
    return this.caddyService.getTotalCurrentCaddy();
  }

  onNewOrder() {
    this.router.navigateByUrl('/client');
  }

  onAddCaddy() {
    let size = this.caddyService.listCaddies.length;
    let index: number = this.caddyService.listCaddies[size - 1].num;
    this.caddyService.addNewCaddy({
      num: index + 1,
      name: 'Caddy' + (index + 1),
    });
  }

  onSelectCaddy(c: { num: number; name: string }) {
    this.caddyService.currentCaddyName = c.name;
    this.caddy = this.caddyService.getCaddy();
  }
}