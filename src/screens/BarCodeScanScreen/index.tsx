import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Dimensions,
  Pressable,
} from 'react-native';
import {
  useCameraDevices,
  Camera,
  useCodeScanner,
  useCameraPermission,
} from 'react-native-vision-camera';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '../../redux';

const {height} = Dimensions.get('window');

export default function BarcodeScannerScreen() {
  const navigation = useNavigation();
  const devices = useCameraDevices();
  const {products} = useAppSelector(state => state.productSlice);
  const {hasPermission, requestPermission} = useCameraPermission();

  const [hasScanned, setHasScanned] = useState(false);

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  useEffect(() => {
    if (!hasPermission) {
      requestPermission().then(result =>
        console.log('Permission result:', result),
      );
    }
  }, [hasPermission, requestPermission]);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13', 'upc-a', 'code-128'],
    onCodeScanned: codes => {
      if (codes.length > 0 && !hasScanned) {
        setHasScanned(true);
        const scannedBarcode = codes[0];
        console.log(`Barcode found: ${scannedBarcode.value}`);

        if (products && products.length > 0) {
          const randomIndex = Math.floor(Math.random() * products.length);
          const randomProduct = products[randomIndex];
          Alert.alert(
            'Product Found!',
            `A product was found for this barcode.`,
            [
              {
                text: 'View Product',
                onPress: () => {
                  navigation.navigate('ProductDetails', {
                    product: randomProduct,
                  });
                },
              },
            ],
          );
        } else {
          Alert.alert('No Products Found', 'The product list is empty.');
        }
      }
    },
  });

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>
          We need your permission to access the camera.
        </Text>
        <Pressable onPress={requestPermission} style={styles.permissionButton}>
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </Pressable>
      </View>
    );
  }

  const cameraDevice = devices.back;

  if (!cameraDevice) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.text}>Finding camera device...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={cameraDevice}
        isActive={!hasScanned}
        codeScanner={codeScanner}
      />
      <View style={styles.overlay}>
        <Text style={styles.scanText}>Scan a Barcode</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  overlay: {
    position: 'absolute',
    top: height * 0.2,
    alignItems: 'center',
  },
  scanText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
  },
  text: {
    color: '#fff',
    marginTop: 10,
  },
  permissionText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
  },
  permissionButton: {
    backgroundColor: '#F7C948',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: '#111',
    fontWeight: '700',
  },
});
