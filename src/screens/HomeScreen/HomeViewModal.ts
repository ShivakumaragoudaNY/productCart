import {useEffect} from 'react';
import {fetchProducts} from '../../lib/api/fetchProduct';

import {setProducts} from '../../redux/slices/productSlice';
import {useAppDispatch, useAppSelector} from '../../redux';

function HomeViewModal() {
  const dispatch = useAppDispatch();
  const {products} = useAppSelector(state => state.productSlice);

  useEffect(() => {
    (async () => {
      const page = 1;
      const result = await fetchProducts(page);

      if (result) {
        console.log(`Fetched ${result?.data?.data?.length} products.`);
        dispatch(setProducts(result?.data?.data));
      } else {
        console.log('Failed to fetch products.');
      }
    })();
  }, [dispatch]);

  const keyExtractor = i =>
    i.productId ||
    i.id ||
    (i.variants && i.variants[0]?.variantId) ||
    Math.random().toString();

  return {products, keyExtractor};
}

export default HomeViewModal;
