import { Product } from './../model/product.model';
import { AuthenticationService } from './../services/authentication.service';
import { CatalogueService } from './../catalogue.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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

  onAddProductToCaddy(p: Product) {
    if (!this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/login');
    } else {
      this.caddyService.addProduct(p);
    }
  }
}
