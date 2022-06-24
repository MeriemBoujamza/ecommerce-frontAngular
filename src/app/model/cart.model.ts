import { Client } from "./client.model";
import { ItemProduct } from "./item-product.model";

export class Caddy {
  constructor(name: string) {
    this.name = name;
  }
  public name: string;
  public items: Map<number, ItemProduct> = new Map();
  public client: Client;
}
