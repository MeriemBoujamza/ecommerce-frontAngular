import { Product } from './../model/product.model';
import { AuthenticationService } from './../services/authentication.service';
import { CatalogueService } from './../catalogue.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CaddyService } from '../services/caddy.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  currentProduct;
  selectedFiles;
  progress: number;
  currentFileUpload: any;
  currentTime: number;
  editPhoto: boolean;
  mode: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public catalService: CatalogueService,
    public authService: AuthenticationService,
    public caddyService: CaddyService
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.catalService
      .getResource2(this.catalService.host + '/products/' + id)
      .subscribe(
        (data) => {
          this.currentProduct = data;
          console.log(
            this.catalService.host + '/photoProduct/' + this.currentProduct.id
          );
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getTS() {
    return Date.now();
  }

  onAddProductToCaddy(p: Product) {
    console.log(p);
    if (!this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/login');
    } else {
      this.caddyService.addProduct(p);
      console.log(this.caddyService.getSize())
    }
  }

  onEditProduct() {
    this.mode = 1;
  }

  onUpdateProduct(data) {
    let url = this.currentProduct._links.self.href;
    this.catalService.patchResource(url, data).subscribe(
      (d) => {
        this.currentProduct = d;
        this.mode = 0;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
