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
import CustomAppBar from '../components/ui/CustomAppBar';

function EditProfile() {
  // states
  const [formData, setFormData] = useState<{
    name: string;
    // contactNumber: string;
  }>({
    name: '',
    // contactNumber: '',
  });
  const [error, setError] = useState<{
    name: string;
    // contactNumber: string;
  }>({
    name: '',
    // contactNumber: '',
  });

  // hooks
  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    setFormData({
      name: user?.name || '',
      // contactNumber: user?.contactNumber || '',
    })
  }, [user])

  // functions
  function handleOnChange (key: string, value: string) {
    setFormData({
      ...formData,
      [key]: value,
    })
  }

  function handleSaveNew() {
    console.log('formData', formData);

    const error = {};
    if (!formData.name) {
      error['name'] = 'Name is required';
    }
    // if (!formData.contactNumber) {
    //   error['contactNumber'] = 'Contact Number is required';
    // }

    if (Object.keys(error).length > 0) {
      setError(currErrors => ({
        ...currErrors,
        ...error,
      }))
      return;
    }

    setError({
      name: '',
      // contactNumber: '',
    })

    // dispatch(login({
    //   name: formData.name,
    //   contactNumber: formData.contactNumber,
    // }));
    navigation.goBack();
  }

  return (
    <View style={{ flex: 1 }}>
      <CustomAppBar
        onBack={() => navigation.goBack()}
        title="Edit Personal Information"
      />
      <View style={styles.container}>
        <CustomTextInput
          error={error.name}
          label="Full Name"
          value={formData.name}
          onChangeText={text => handleOnChange('name', text)}
        />
        <Button mode="contained" onPress={handleSaveNew}>
          Save
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 40,
    gap: 12,
  },
});

export default EditProfile;
