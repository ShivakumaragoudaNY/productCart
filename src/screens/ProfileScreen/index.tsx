import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import ProfileViewModal from './ProfileViewModal';

const ProfileScreen = () => {
  const {signOut, user, loading} = ProfileViewModal();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Hi,</Text>
          <Text style={styles.subtitle}>
            Happy to see you in productCartApp
          </Text>
          <View style={styles.signedInBox}>
            {user?.user?.photo && (
              <Image source={{uri: user?.user?.photo}} style={styles.avatar} />
            )}
            <Text style={styles.name}>{user?.user?.name}</Text>
            <Text style={styles.email}>{user?.user?.email}</Text>

            <TouchableOpacity
              style={styles.signOutBtn}
              onPress={signOut}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator />
              ) : (
                <Text style={styles.signOutText}>Sign out</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

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
  title: {fontSize: 26, fontWeight: '700', marginTop: 4, color: 'black'},
  subtitle: {fontSize: 14, color: '#666', marginBottom: 24},
  signedInBox: {alignItems: 'center'},
  avatar: {width: 72, height: 72, borderRadius: 36, marginBottom: 12},
  name: {fontSize: 18, fontWeight: '700', color: 'black'},
  email: {fontSize: 13, color: '#666', marginBottom: 10},
  signOutBtn: {
    marginTop: 12,
    backgroundColor: '#666',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  signOutText: {color: 'white', fontWeight: '700', color: 'black'},
});
