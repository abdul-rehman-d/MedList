import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native'
import { Text, Button, TextInput } from 'react-native-paper';
import CustomTextInput from '../components/ui/CustomTextInput';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/slices/user';
import { RootStackParamList } from '../types';
import { RootState } from '../redux/store';

function Register() {
  // states
  const [formData, setFormData] = useState<{
    name: string;
    contactNumber: string;
  }>({
    name: '',
    contactNumber: '',
  });
  const [error, setError] = useState<{
    name: string;
    contactNumber: string;
  }>({
    name: '',
    contactNumber: '',
  });
  
  const isSignedIn = useSelector((state: RootState) => Boolean(state.user.user));

  // hooks
  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    console.log('isSignedIn', isSignedIn);
  }, [isSignedIn])

  // functions
  function handleOnChange (key: string, value: string) {
    setFormData({
      ...formData,
      [key]: value,
    })
  }

  function handleLogin () {
    console.log('formData', formData);

    const error = {};
    if (!formData.name) {
      error['name'] = 'Name is required';
    }
    if (!formData.contactNumber) {
      error['contactNumber'] = 'Contact Number is required';
    }

    if (Object.keys(error).length > 0) {
      setError(currErrors => ({
        ...currErrors,
        ...error,
      }))
      return;
    }

    setError({
      name: '',
      contactNumber: '',
    })

    dispatch(login({
      id: '1',
      name: formData.name,
      contactNumber: formData.contactNumber,
    }));
  }

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall">Welcome</Text>
      <CustomTextInput
        error={error.name}
        label="Full Name"
        value={formData.name}
        onChangeText={text => handleOnChange('name', text)}
      />
      <CustomTextInput
        error={error.contactNumber}
        label="Contact Number"
        value={formData.contactNumber}
        onChangeText={text => handleOnChange('contactNumber', text)}
      />
      <Button mode="contained" onPress={handleLogin} style={{
        marginTop: 8,
        alignSelf: 'center',
      }}>
        Register
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 40,
    justifyContent: 'center',
    gap: 12,
  },
});

export default Register;
