
export interface product {
   name_product: string;
   description: string;
   total_cost: number;
   profit_margin: number;
   image: string;
}

export interface calculation {
   id_product: number;
   price_sale: number;
   nominal_profit: number;
   working_capital: number;
}

export interface parameters {
  free_shipping_program: boolean;
  marketplace_commission: number;
  tax_rate: number;
  other_fees: number;
}
