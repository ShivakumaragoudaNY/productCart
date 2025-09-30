import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import MainNavigator from '../MainNavigator';
import AuthNavigator from '../AuthNavigator';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {AuthContext} from '../AuthContext';

export default function AppNavigator() {
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '190263812693-2u967b2j1e5lvbtkndscr5lsvk13ot6r.apps.googleusercontent.com',
      offlineAccess: true,
    });

    (async () => {
      try {
        const user = GoogleSignin.getCurrentUser();
        setIsSignedIn(!!user);
      } catch (e) {
        console.log('getCurrentUser error', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        signIn: () => setIsSignedIn(true),
        signOut: () => setIsSignedIn(false),
      }}>
      <NavigationContainer>
        {isSignedIn ? <MainNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
