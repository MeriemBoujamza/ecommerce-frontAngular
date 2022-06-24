import { CaddyService } from './../services/caddy.service';
import { OrderService } from './../services/order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Order } from './../model/order.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  paymentAmount: number;
  currentOrder: Order;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public orderService: OrderService,
    public caddyService:CaddyService
  ) {}

  ngOnInit() {
    let id = this.route.snapshot.params['orderID'];
    this.orderService.getOrder(id).subscribe(
      (data) => {
        this.currentOrder = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onPayOrder(data) {
    console.log(data);
  }
  onOrder(){};
}
