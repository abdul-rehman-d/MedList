import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native'
import { Button, List } from 'react-native-paper';
import CustomTextInput from '../components/ui/CustomTextInput';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { updateAdditionalField, changeName } from '../redux/slices/user';
import { RootStackParamList } from '../types';
import { RootState } from '../redux/store';
import CustomAppBar from '../components/ui/CustomAppBar';
import AdditionalFieldsCRUD from '../components/AdditionalFields';

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

function EditAdditionalFields() {
  const [ additionalFields, setAdditionalFields ] = useState<string[]>([]);

  const currentAdditionalFields = useSelector((state: RootState) => state.user.user.additionalFields);
  const dispatch = useDispatch();

  useEffect(() => {
    setAdditionalFields(currentAdditionalFields);
  }, [currentAdditionalFields]);

  const hasChanges = useMemo(() => {
    if (additionalFields.length !== currentAdditionalFields.length) {
      return true;
    }

    let flag = false;
    for (let i = 0; i < additionalFields.length; i++) {
      if (additionalFields[i] !== currentAdditionalFields[i]) {
        flag = true;
        break;
      }
    }

    return flag;
  }, [additionalFields, currentAdditionalFields])

  function onAddNewFieldSubmit(value: string) {
    setAdditionalFields(curr => ([...curr, value]));
  }

  function onRemove(index: number) {
    setAdditionalFields(curr => {
      return curr.filter((_, i) => i !== index);
    });
  }

  function onSubmit() {
    dispatch(updateAdditionalField(additionalFields));
  }

  return (
    <View style={{ padding: 20, gap: 10 }}>
      <AdditionalFieldsCRUD
        additionalFields={additionalFields}
        onAddNewFieldSubmit={onAddNewFieldSubmit}
        onRemove={onRemove}
      />
      <Button mode="contained" onPress={onSubmit} disabled={!hasChanges}>
        {!hasChanges ? 'No changes' : 'Save'}
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
          <EditAdditionalFields />
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
