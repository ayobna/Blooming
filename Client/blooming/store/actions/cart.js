import { ADD_Product, DELETE_Product} from './types';

export const addProduct = (listProduct) => (
  {
    type: ADD_Product,
    data: listProduct
  }
);

export const deleteProduct = (key,index) => (
  {
    type: DELETE_Product,
    key: key,
  }
);