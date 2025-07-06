import { BasketItem } from "..";

export interface BasketReponse {
  basketId: number;  
  items: BasketItem[];
  totalPrice: number;  
}