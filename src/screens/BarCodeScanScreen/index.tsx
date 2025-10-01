import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Dimensions,
  Pressable,
  Animated, // Import Animated for the scanning line
} from 'react-native';
import {
  useCameraDevices,
  Camera,
  useCodeScanner,
  useCameraPermission,
} from 'react-native-vision-camera';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '../../redux';

const {height, width} = Dimensions.get('window');

const VIEW_FINDER_SIZE = width * 0.7;

export default function BarcodeScannerScreen() {
  const navigation = useNavigation();
  const devices = useCameraDevices();
  const {products} = useAppSelector(state => state.productSlice);
  const {hasPermission, requestPermission} = useCameraPermission();

  const [hasScanned, setHasScanned] = useState(false);
  const [scanLineAnimation] = useState(new Animated.Value(0));

  const startScanLineAnimation = () => {
    scanLineAnimation.setValue(0); // Reset animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineAnimation, {
          toValue: 1,
          duration: 2000, // Duration for one scan pass
          useNativeDriver: false, // Must be false for layout properties like top
        }),
        Animated.delay(500), // Optional delay before looping
      ]),
      {iterations: -1}, // Loop indefinitely
    ).start();
  };

  useEffect(() => {
    if (hasPermission) {
      startScanLineAnimation();
    }
    return () => {
      scanLineAnimation.stopAnimation();
    };
  }, [hasPermission]);

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

        scanLineAnimation.stopAnimation();

        const scannedBarcode = codes[0];
        console.log(`Barcode found: ${scannedBarcode.value}`);

        if (products && products.length > 0) {
          const randomIndex = Math.floor(Math.random() * products.length);
          const randomProduct = products[randomIndex];
          Alert.alert(
            'Product Found!',
            `A product was found for this barcode: ${scannedBarcode.value}.`,
            [
              {
                text: 'View Product',
                onPress: () => {
                  navigation.navigate('HomeTab', {
                    screen: 'ProductDetails',
                    params: {
                      product: randomProduct,
                    },
                  });
                  setHasScanned(false);
                  startScanLineAnimation(); // Restart animation for next scan
                },
              },
              {
                text: 'Cancel',
                onPress: () => {
                  setHasScanned(false);
                  startScanLineAnimation(); // Restart animation
                },
                style: 'cancel',
              },
            ],
          );
        } else {
          Alert.alert('No Products Found', 'The product list is empty.', [
            {
              text: 'OK',
              onPress: () => {
                setHasScanned(false);
                startScanLineAnimation(); // Restart animation
              },
            },
          ]);
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

  const cameraDevice = devices.find(device => device.position === 'back');

  if (!cameraDevice) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.text}>Finding camera device...</Text>
      </View>
    );
  }

  const animatedStyle = {
    transform: [
      {
        translateY: scanLineAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, VIEW_FINDER_SIZE], // Animate from top to bottom of the viewfinder area
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={cameraDevice}
        isActive={!hasScanned}
        codeScanner={codeScanner}
      />

      <View style={StyleSheet.absoluteFillObject}>
        <View style={styles.topOverlay} />

        <View style={styles.middleOverlayRow}>
          <View style={styles.sideOverlay} />

          <View style={styles.viewFinderBox}>
            <Animated.View style={[styles.scanLine, animatedStyle]} />
          </View>
          <View style={styles.sideOverlay} />
        </View>

        <View style={styles.bottomOverlay} />
      </View>

      <View style={styles.scanTextContainer}>
        <Text style={styles.scanText}>
          {hasScanned ? 'Processing...' : 'Align Barcode'}
        </Text>
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
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent black background
  },
  topOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  middleOverlayRow: {
    flexDirection: 'row',
    height: VIEW_FINDER_SIZE, // Fixed height for the scanning area
  },
  sideOverlay: {
    width: (width - VIEW_FINDER_SIZE) / 2, // Left and right side fills
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  viewFinderBox: {
    width: VIEW_FINDER_SIZE,
    height: VIEW_FINDER_SIZE,
    borderColor: '#F7C948', // Highlighting color for the box
    borderWidth: 2,
    backgroundColor: 'transparent',
    overflow: 'hidden', // Crucial to keep the scan line inside
  },
  bottomOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    paddingTop: 20,
  },
  scanLine: {
    position: 'absolute',
    left: 0,
    width: '100%',
    height: 3,
    backgroundColor: '#F7C948',
    opacity: 0.8,
  },

  scanTextContainer: {
    position: 'absolute',
    bottom: height * 0.15, // Positioned near the bottom for a clean look
    alignItems: 'center',
  },
  scanText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
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
