import Decimal from 'decimal.js-light';

export interface OrderBookProps {
  orders: Order[];
  type: 'bids' | 'asks';
}

export interface Order {
  price: string;
  quantity: string;
  percentage?: Decimal;
}

export interface OrderBookState {
  bids: Order[];
  asks: Order[];
}
