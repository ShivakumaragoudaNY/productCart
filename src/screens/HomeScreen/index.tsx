/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import HomeViewModal from './HomeViewModal';
import ProductListItem from './ProductListItem'; // <-- Import the new component

export default function HomeProductList({numColumns = 1}) {
  const {products, keyExtractor} = HomeViewModal();

  const renderItem = ({item}) => (
    <ProductListItem item={item} numColumns={numColumns} />
  );

  if (!products || products.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No products to display</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      numColumns={numColumns}
      contentContainerStyle={styles.listContainer}
      ItemSeparatorComponent={() => <View style={{height: 12}} />}
      removeClippedSubviews
      initialNumToRender={8}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {padding: 12},
  emptyContainer: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  emptyText: {color: '#666'},
});
