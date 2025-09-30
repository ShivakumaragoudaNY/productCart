import {useEffect, useState} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Alert} from 'react-native';
import {useAuth} from '../../navigation/AuthContext';

function ProfileViewModal() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const {signOut: handleSignOut} = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const current = GoogleSignin.getCurrentUser();
        if (current) {
          setUser(current);
        } else {
          Alert.alert('No user is currently signed in');
        }
      } catch (e) {
        console.log('getCurrentUser error', e);
      }
    })();
  }, []);

  const signOut = async () => {
    try {
      setLoading(true);
      await GoogleSignin.signOut();
      setUser(null);
      handleSignOut();
    } catch (e) {
      Alert.alert('Sign-out error', e.message || String(e));
    } finally {
      setLoading(false);
    }
  };

  return {signOut, user, loading, setLoading, setUser};
}

export default ProfileViewModal;
