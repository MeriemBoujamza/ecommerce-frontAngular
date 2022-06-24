import { CaddyService } from './../services/caddy.service';
import { CatalogueService } from './../catalogue.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products;
  editPhoto: boolean;
  currentProduct;
  selectedFiles;
  progress: number;
  currentFileUpload: any;
  currentTime: number;
  title: string;
  constructor(
    public catService: CatalogueService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthenticationService,
    public caddyService:CaddyService
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        let url = val.url;
        console.log(url);
        let p1 = this.route.snapshot.params['p1'];

        if (p1 == 1) {
          //afficher tous les produits
          this.title = 'Our Products Collection';
          this.getProducts('/products/search/selectedProducts');
        } else if (p1 == 2) {
          //afficher par categorie
          this.title = 'Products By Category';
          let idCat = this.route.snapshot.params['p2'];
          this.getProducts('/categories/' + idCat + '/products');
        }
      }
    });
    let p1 = this.route.snapshot.params['p1'];
    if (p1 == 1) {
      this.title = 'Our Products Collection';

      this.getProducts('/products/search/selectedProducts');
    } else if (p1 == 3) {
      //afficher par categorie
      this.title = 'Your Search Result';

      let keyword = this.route.snapshot.params['p2'];
      console.log(p1);
      console.log(keyword);
      this.getProducts('/products/search/productsByKeyword?keyword=' + keyword);
    }
  }

  onEditPhoto(p) {
    this.currentProduct = p;
    this.editPhoto = true;
  }

  onSelectedFile(event) {
    this.selectedFiles = event.target.files;
  }
  upload() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.catService
      .uploadPhotoProduct(this.currentFileUpload, this.currentProduct.id)
      .subscribe(
        (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round((100 * event.loaded) / event.total);
          } else if (event instanceof HttpResponse) {
            //console.log(this.router.url);
            //this.getProducts(this.currentRequest);
            //this.refreshUpdatedProduct();
            this.currentTime = Date.now();
          }
        },
        (err) => {
          alert('Problème de chargement');
        }
      );

    this.selectedFiles = undefined;
  }

  getTS() {
    return Date.now();
  }

  onAddProductToCaddy(p) {
    if (!this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/login');
    } else {
      this.caddyService.addProduct(p);
    }
  }

  // onProductDetails(p:Product){

  //   let url =  btoa(p._links.product.href);
  //   this.router.navigateByUrl("/product/"+url);

  // }

  onProductDetails(p) {
    this.router.navigateByUrl('/product/' + p.id);
  }
  getProducts(url) {
    this.catService.getResource(url).subscribe(
      (data) => {
        this.products = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
