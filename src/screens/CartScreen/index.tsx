import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from '../../redux/slices/productSlice';
import {useAppDispatch, useAppSelector} from '../../redux';
import {formatPrice} from '../../utils';
import {IMAGES} from '../../assets/images';

export default function CartScreen() {
  const dispatch = useAppDispatch();
  const {cartItems} = useAppSelector(state => state.productSlice);

  const calculateSubtotal = () => {
    return cartItems?.reduce((total, item) => {
      const price = item?.variants?.[0]?.inventorySync?.sellingPrice || 0;
      return total + price * item.quantity;
    }, 0);
  };

  const renderCartItem = ({item}) => {
    const price = item.variants?.[0]?.inventorySync?.sellingPrice;
    const imageUri = item.imageUrls?.[0] || IMAGES.notFound;

    return (
      <View style={styles.cartItemContainer}>
        <Image
          source={typeof imageUri === 'string' ? {uri: imageUri} : imageUri}
          style={styles.cartItemImage}
        />
        <View style={styles.cartItemDetails}>
          <Text style={styles.cartItemTitle} numberOfLines={2}>
            {item.title || item.name || 'Untitled product'}
          </Text>
          {price > 0 ? (
            <Text style={styles.cartItemPrice}>₹{formatPrice(price)}</Text>
          ) : (
            <Text style={styles.cartItemPrice}>Price on request</Text>
          )}

          <View style={styles.quantityControl}>
            <Pressable
              onPress={() => dispatch(decreaseQuantity(item.productId))}>
              <Text style={styles.quantityBtn}>-</Text>
            </Pressable>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <Pressable
              onPress={() => dispatch(increaseQuantity(item.productId))}>
              <Text style={styles.quantityBtn}>+</Text>
            </Pressable>
          </View>
        </View>
        <Pressable
          onPress={() => dispatch(removeFromCart(item.productId))}
          style={styles.removeBtn}>
          <Text style={styles.removeBtnText}>Remove</Text>
        </Pressable>
      </View>
    );
  };

  if (cartItems?.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Your cart is empty 😔</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={item => item.productId}
        contentContainerStyle={styles.listContainer}
      />
      <View style={styles.summaryContainer}>
        <View style={styles.subtotalRow}>
          <Text style={styles.subtotalText}>Subtotal:</Text>
          <Text style={styles.subtotalPrice}>
            ₹{formatPrice(calculateSubtotal())}
          </Text>
        </View>
        <Pressable
          style={styles.proceedToBuyBtn}
          onPress={() => Alert.alert('Proceeding to buy... (Not implemented)')}>
          <Text style={styles.proceedToBuyText}>Proceed to Buy</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f5f5f5'},
  listContainer: {padding: 10},
  cartItemContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
    elevation: 1,
  },
  cartItemImage: {
    width: 80,
    height: 80,
    borderRadius: 6,
    backgroundColor: '#eee',
  },
  cartItemDetails: {flex: 1, marginLeft: 10},
  cartItemTitle: {fontSize: 16, fontWeight: '600', color: '#111'},
  cartItemPrice: {fontSize: 14, color: '#555', marginTop: 4},
  quantityControl: {flexDirection: 'row', alignItems: 'center', marginTop: 8},
  quantityBtn: {
    fontSize: 20,
    color: '#0a84ff',
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
    color: 'black',
  },
  removeBtn: {
    backgroundColor: '#ccc',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
  removeBtnText: {fontSize: 12, color: '#444'},
  summaryContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  subtotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  subtotalText: {fontSize: 18, fontWeight: '600', color: 'black'},
  subtotalPrice: {fontSize: 18, fontWeight: '700', color: '#0a84ff'},
  proceedToBuyBtn: {
    backgroundColor: '#F7C948',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  proceedToBuyText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {fontSize: 18, color: '#888'},
});
