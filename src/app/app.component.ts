import { CaddyService } from './services/caddy.service';
import { CatalogueService } from './catalogue.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  categories;
  currentCategorie;

  constructor(
    private catService: CatalogueService,
    private router: Router,
    public authService: AuthenticationService,
    public caddyService: CaddyService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.authService.loadUser();
    //if (this.authService.authenticated)
    //this.caddyService.loadCaddyFromLocalStorage();
  }
  private getCategories() {
    this.catService.getResource('/categories').subscribe(
      (data) => {
        this.categories = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getProductsByCategorie(c) {
    this.currentCategorie = c;
    this.router.navigateByUrl('/products/2/' + c.id);

    console.log(this.currentCategorie);
  }

  getProductsByKeyword(data) {
    //TODO:use this for a search form
    this.currentCategorie = undefined;
    console.log(data.keyword);
    this.router.navigateByUrl('/products/3/' + data.keyword);
  }

  onLogin() {
    this.router.navigateByUrl('/login');
  }
  goToCart() {
    this.router.navigateByUrl('/caddy');
  }

  onUserManage(){
    this.router.navigateByUrl('/users');

  }
  onLogout() {
    //this.caddyService.emptyCaddy();
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
