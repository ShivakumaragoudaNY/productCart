import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../redux';
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  selectItemQuantity,
} from '../../redux/slices/productSlice';
import {useNavigation} from '@react-navigation/native';
import {formatPrice} from '../../utils';
import {IMAGES} from '../../assets/images';

const SCREEN_WIDTH = Dimensions.get('window').width;

const ProductListItem = ({item, numColumns}) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const quantity = useAppSelector(selectItemQuantity(item.productId));

  const variant = item.variants?.[0] || {};
  const price = variant.inventorySync?.sellingPrice;
  const mrp = (variant.mrpData && variant.mrpData[0]?.mrp) ?? null;
  const imageUri =
    (item.imageUrls && item.imageUrls.length && item.imageUrls[0]) ||
    IMAGES.notFound;

  const onPress = () => {
    navigation.navigate('ProductDetails', {
      product: item,
    });
  };

  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, numColumns === 2 && styles.cardGrid]}
      accessibilityRole="button">
      <Image
        source={typeof imageUri === 'string' ? {uri: imageUri} : imageUri}
        style={[styles.image, numColumns === 2 && styles.imageGrid]}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title || item.name || 'Untitled product'}
        </Text>
        <Text style={styles.meta} numberOfLines={1}>
          {item.rawMaterialGrouping ? item.rawMaterialGrouping + ' • ' : ''}
          {item.storeSpecificData?.storeName || ''}
        </Text>
        <Text style={styles.weight}>
          {variant.weight
            ? `${variant.weight} ${variant.weightUnit || ''}`
            : ''}
        </Text>
        <View style={styles.priceRow}>
          {price > 0 ? (
            <Text style={styles.price}>₹{formatPrice(price)}</Text>
          ) : (
            <Text style={styles.priceUnavailable}>Price on request</Text>
          )}
          {mrp ? <Text style={styles.mrp}>₹{formatPrice(mrp)}</Text> : null}
        </View>
        <View style={styles.bottomRow}>
          {item.inStock ? (
            <Text style={styles.inStock}>In stock</Text>
          ) : (
            <Text style={styles.outOfStock}>Out of stock</Text>
          )}
          {quantity > 0 ? (
            <View style={styles.quantityContainer}>
              <Pressable
                onPress={() => dispatch(decreaseQuantity(item.productId))}
                style={styles.quantityBtn}>
                <Text style={styles.quantityBtnText}>-</Text>
              </Pressable>
              <Text style={styles.quantityText}>{quantity}</Text>
              <Pressable
                onPress={() => dispatch(increaseQuantity(item.productId))}
                style={styles.quantityBtn}>
                <Text style={styles.quantityBtnText}>+</Text>
              </Pressable>
            </View>
          ) : (
            <Pressable
              onPress={() => dispatch(addToCart(item))}
              style={styles.addBtn}
              accessibilityLabel={`Add ${item.title} to cart`}>
              <Text style={styles.addBtnText}>Add</Text>
            </Pressable>
          )}
        </View>
      </View>
    </Pressable>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    elevation: 1,
  },
  cardGrid: {
    flex: 1,
    flexDirection: 'column',
    margin: 6,
    maxWidth: (SCREEN_WIDTH - 48) / 2,
  },
  image: {width: 90, height: 90, borderRadius: 6, backgroundColor: '#eee'},
  imageGrid: {width: '100%', height: 140, borderRadius: 6, marginBottom: 8},
  info: {flex: 1, marginLeft: 12},
  title: {fontSize: 15, fontWeight: '600', color: '#111'},
  meta: {fontSize: 12, color: '#666', marginTop: 4},
  weight: {fontSize: 12, color: '#666', marginTop: 4},
  priceRow: {flexDirection: 'row', alignItems: 'center', marginTop: 8},
  price: {fontSize: 16, fontWeight: '700', marginRight: 8, color: 'black'},
  mrp: {fontSize: 12, color: '#999', textDecorationLine: 'line-through'},
  priceUnavailable: {fontSize: 14, color: '#999'},
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  inStock: {fontSize: 12, color: '#2a9d2a'},
  outOfStock: {fontSize: 12, color: '#cc2a2a'},
  addBtn: {
    backgroundColor: '#F7C948',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addBtnText: {color: '#111', fontWeight: '700'},
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7C948',
    borderRadius: 6,
    overflow: 'hidden',
  },
  quantityBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  quantityBtnText: {
    color: '#111',
    fontWeight: '700',
  },
  quantityText: {
    paddingHorizontal: 8,
    fontSize: 14,
    fontWeight: '700',
    color: '#111',
  },
  emptyContainer: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  emptyText: {color: '#666'},
});
