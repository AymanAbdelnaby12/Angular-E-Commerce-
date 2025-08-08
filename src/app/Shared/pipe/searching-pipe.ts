import { Iproducts } from '../Interfaces/iproducts';
import { Products } from './../../Features/pages/products/products';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searching'
})
export class SearchingPipe implements PipeTransform {

  transform(productsList: Iproducts[], searchTerm: string): Iproducts[] { 
    return productsList.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

}
