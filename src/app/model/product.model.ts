export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  promotion: boolean;
  selected: boolean;
  available: boolean;
  imgURL: string;
  quantity: number;
  _links: {
    self: {
      href: string;
    };
    product: {
      href: string;
    };
    category: {
      href: string;
    };
  };
}
