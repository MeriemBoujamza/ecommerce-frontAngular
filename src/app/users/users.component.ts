import { CaddyService } from './../services/caddy.service';
import { AuthenticationService } from './../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogueService } from './../catalogue.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {

  constructor(
    public catService: CatalogueService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthenticationService,
    public caddyService: CaddyService
  ) {}

  ngOnInit(): void {
   this.authService.getUsers();

  }
}
