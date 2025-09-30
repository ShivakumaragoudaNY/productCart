import {IMAGES} from '../../assets/images';
import {useAppDispatch, useAppSelector} from '../../redux';
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  selectItemQuantity,
} from '../../redux/slices/productSlice';

function ProductDetailsViewModal(route) {
  const dispatch = useAppDispatch();
  const {product} = route.params || {};

  const quantity = useAppSelector(selectItemQuantity(product?.productId));

  const variant = product?.variants?.[0] || {};
  const imageUri =
    (product?.imageUrls &&
      product?.imageUrls.length &&
      product?.imageUrls[0]) ||
    IMAGES.notFound;

  const sellingPrice = variant.inventorySync?.sellingPrice || 0;
  const mrp = (variant.mrpData && variant.mrpData[0]?.mrp) || null;

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleIncreaseQuantity = () => {
    dispatch(increaseQuantity(product?.productId));
  };

  const handleDecreaseQuantity = () => {
    dispatch(decreaseQuantity(product?.productId));
  };

  return {
    product,
    variant,
    imageUri,
    sellingPrice,
    mrp,
    quantity,
    handleAddToCart,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
  };
}

export default ProductDetailsViewModal;
