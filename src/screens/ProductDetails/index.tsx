import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native';
import ProductDetailsViewModal from './ProductDetailsViewModal';
import {formatPrice} from '../../utils';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function ProductDetails({route}) {
  const {
    product,
    variant,
    imageUri,
    sellingPrice,
    mrp,
    quantity,
    handleAddToCart,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
  } = ProductDetailsViewModal(route);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{paddingBottom: 40}}>
      <Image
        source={typeof imageUri === 'string' ? {uri: imageUri} : imageUri}
        style={styles.productImage}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{product?.title || product?.name}</Text>
        <Text style={styles.meta}>{product?.rawMaterialGrouping}</Text>
        {product?.storeSpecificData?.storeName ? (
          <Text style={styles.storeName}>
            Sold by {product?.storeSpecificData.storeName}
          </Text>
        ) : null}

        <View style={styles.priceRow}>
          {sellingPrice > 0 ? (
            <Text style={styles.sellingPrice}>
              ₹{formatPrice(sellingPrice)}
            </Text>
          ) : (
            <Text style={styles.sellingPrice}>Price on request</Text>
          )}
          {mrp ? <Text style={styles.mrp}>₹{formatPrice(mrp)}</Text> : null}
        </View>

        <Text style={styles.weight}>
          {variant.weight
            ? `${variant.weight} ${variant.weightUnit || ''}`
            : ''}
        </Text>

        {product?.description ? (
          <Text style={styles.description}>{product?.description}</Text>
        ) : (
          <Text style={styles.description}>No description available.</Text>
        )}

        {quantity > 0 ? (
          <View style={styles.quantityContainer}>
            <Pressable
              onPress={handleDecreaseQuantity}
              style={styles.quantityBtn}>
              <Text style={styles.quantityBtnText}>-</Text>
            </Pressable>
            <Text style={styles.quantityText}>{quantity}</Text>
            <Pressable
              onPress={handleIncreaseQuantity}
              style={styles.quantityBtn}>
              <Text style={styles.quantityBtnText}>+</Text>
            </Pressable>
          </View>
        ) : (
          <Pressable
            style={styles.addToCartBtn}
            onPress={handleAddToCart}
            accessibilityLabel={`Add ${product?.title} to cart`}>
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </Pressable>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  productImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
    backgroundColor: '#eee',
  },
  infoContainer: {padding: 16},
  title: {fontSize: 20, fontWeight: '700', marginBottom: 6, color: 'black'},
  meta: {fontSize: 14, color: '#555', marginBottom: 4},
  storeName: {fontSize: 12, color: '#888', marginBottom: 8},
  priceRow: {flexDirection: 'row', alignItems: 'center', marginBottom: 8},
  sellingPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    marginRight: 8,
  },
  mrp: {fontSize: 14, color: '#999', textDecorationLine: 'line-through'},
  weight: {fontSize: 14, color: '#555', marginBottom: 12},
  description: {fontSize: 14, color: '#333', lineHeight: 20, marginBottom: 20},
  addToCartBtn: {
    backgroundColor: '#F7C948',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  addToCartText: {fontSize: 16, fontWeight: '700', color: '#111'},
  // New styles for the quantity controls
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7C948',
    borderRadius: 8,
    overflow: 'hidden',
  },
  quantityBtn: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  quantityBtnText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
    paddingHorizontal: 10,
  },
});
