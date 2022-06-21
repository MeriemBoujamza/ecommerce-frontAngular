import { CatalogueService } from './catalogue.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  categories;
  currentCategorie;

  constructor(private catService: CatalogueService, private router: Router) {}

  ngOnInit(): void {
    this.getCategories();
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

  getProductsByKeyword(keyword) { //TODO:use this for a search form
    this.currentCategorie = undefined; 
    this.router.navigateByUrl('/products/3/'+keyword);
  }
 //TODO: logout 
  onLogout(){
    this.router.navigateByUrl('/login');

  }
}
