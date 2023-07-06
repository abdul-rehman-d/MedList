import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native'
import { Text, Button, TextInput, List } from 'react-native-paper';
import CustomTextInput from '../components/ui/CustomTextInput';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { changeName, login } from '../redux/slices/user';
import { RootStackParamList } from '../types';
import { RootState } from '../redux/store';
import CustomAppBar from '../components/ui/CustomAppBar';

function EditName() {
  // states
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<string>('');

  // hooks
  const dispatch = useDispatch();
  const prevName = useSelector((state: RootState) => state.user.user.name);

  useEffect(() => {
    setName(prevName);
  }, [prevName])

  // functions
  function handleSaveNew() {
    if (!name) {
      setError('Name is required');
      return;
    }

    setError('');
    dispatch(changeName(name));
  }

  return (
    <View style={{ padding: 20, gap: 10 }}>
      <CustomTextInput
        error={error}
        label="Full Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <Button mode="contained" onPress={handleSaveNew} disabled={prevName===name}>
        {prevName===name ? 'No changes' : 'Save'}
      </Button>
    </View>
  )
}

function EditProfile() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={{ flex: 1 }}>
      <CustomAppBar
        onBack={() => navigation.goBack()}
        title="Edit Personal Information"
      />
      <View style={styles.container}>
        <List.Accordion title='Edit Name'>
          <EditName />
        </List.Accordion>
        <List.Accordion title='Edit Other Fields'>
        </List.Accordion>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    gap: 12,
  },
});

export default EditProfile;
