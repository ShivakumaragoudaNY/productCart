import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import SigninViewModal from './SigninViewModal';

const SignInScreen = () => {
  const {signIn, loading} = SigninViewModal();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.card}>
          {/* <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
          /> */}
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtitle}>
            Sign in to continue to productCartApp
          </Text>
          <TouchableOpacity
            style={styles.googleBtn}
            onPress={signIn}
            disabled={loading}
            accessibilityLabel="Sign in with Google">
            {loading ? (
              <ActivityIndicator />
            ) : (
              <>
                {/* <Image
                    source={require('../../assets/google.png')}
                    style={styles.googleIcon}
                  /> */}
                <Text style={styles.googleText}>Continue with Google</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text style={styles.small}>
            By continuing you agree to our Terms of Service
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: '#F6F8FB'},
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 6,
  },
  logo: {width: 72, height: 72, marginBottom: 12, borderRadius: 16},
  title: {fontSize: 26, fontWeight: '700', marginTop: 4, color: 'black'},
  subtitle: {fontSize: 14, color: '#666', marginBottom: 24},
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    width: '100%',
    justifyContent: 'center',
  },
  googleIcon: {width: 20, height: 20, marginRight: 10},
  googleText: {fontSize: 16, fontWeight: '600', color: 'black'},
  signedInBox: {alignItems: 'center'},
  avatar: {width: 72, height: 72, borderRadius: 36, marginBottom: 12},
  name: {fontSize: 18, fontWeight: '700'},
  email: {fontSize: 13, color: '#666', marginBottom: 10},
  signOutBtn: {
    marginTop: 12,
    backgroundColor: '#111827',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  signOutText: {color: 'white', fontWeight: '700'},
  footer: {marginTop: 18, alignItems: 'center'},
  small: {fontSize: 12, color: '#9CA3AF'},
});
