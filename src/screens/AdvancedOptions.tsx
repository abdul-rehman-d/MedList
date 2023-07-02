import { useState } from 'react';
import { View } from 'react-native'
import { ActivityIndicator, Button, Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import cuuid from 'cuuid';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Medicine, RootStackParamList } from '../types';

import CustomAppBar from '../components/ui/CustomAppBar';
import { addBunch } from '../redux/slices/medicineList';

function AdvancedOptions({ route, navigation }: NativeStackScreenProps<RootStackParamList, 'AdvancedOptions'>) {
  const [ loading, setLoading ] = useState<string>('');

  const dispatch = useDispatch();

  function addToMedicineList(list: string) {
    const medList: Medicine[] = [];
    for (const line of list.split('\n')) {
      const [ name, quantity ] = line.split(',');
      console.log(line, '\n', name, '\n', quantity, '\n');
      if (name && quantity) {
        medList.push({
          id: cuuid(),
          name,
          quantity: quantity,
        })
      }
    }
    if (medList.length > 0) {
      dispatch(addBunch(medList));
    }
  }

  async function onImport() {
    try {
      setLoading('Picking file');
      const file = await DocumentPicker.getDocumentAsync({
        type: 'text/*',
        copyToCacheDirectory: false,
      });
  
      if (file.type === 'success') {
        // if file is successfully picked, copy it to the app's document directory
        // and delete it after reading
        const uri = FileSystem.documentDirectory+file.name;
        setLoading('Copying file');
        await FileSystem.copyAsync({
          from: file.uri,
          to: uri
        });
        setLoading('Reading file');
        const content = await FileSystem.readAsStringAsync(uri);
        setLoading('Adding to list');
        addToMedicineList(content);
        setLoading('Deleting temp file');
        await FileSystem.deleteAsync(uri);
        setLoading('');
        navigation.goBack();
      } else {
        setLoading('');
      }
    } catch (error) {
      console.log(error);
      setLoading('');
    }
  }

  return (
    <View style={{
      flex: 1,
    }}>
      <CustomAppBar
        onBack={() => navigation.goBack()}
        title='Advanced Options'
      />
      <View style={{
        flex: 1,
        padding: 16,
        gap: 16,
      }}>
        <Button mode='contained-tonal' onPress={onImport} disabled={Boolean(loading)}>Import List from CSV file</Button>

        {
          loading && <View style={{ flexDirection: 'row', gap: 12, justifyContent: 'center', alignContent: 'center', marginVertical: 24 }}>
            <ActivityIndicator />
            <Text>{loading}</Text>
          </View>
        }
      </View>
    </View>
  )
}

export default AdvancedOptions;
