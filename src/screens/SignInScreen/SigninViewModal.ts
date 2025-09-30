import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useState} from 'react';
import {useAuth} from '../../navigation/AuthContext';
import {Alert} from 'react-native';

function SigninViewModal() {
  const {signIn: handleSignIn} = useAuth();
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      await GoogleSignin.signIn();
      handleSignIn();
    } catch (error) {
      // Helpful error handling
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Please wait', 'Sign-in already in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert(
          'Play Services required',
          'Google Play Services are not available or outdated',
        );
      } else {
        Alert.alert('Sign-in error', error.message || String(error));
      }
    } finally {
      setLoading(false);
    }
  };

  return {signIn, loading};
}

export default SigninViewModal;
