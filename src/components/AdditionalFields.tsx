import React, { useState } from 'react'
import CustomTextInput from './ui/CustomTextInput';
import { ScrollView, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

function AdditionalFieldInput({
  onSubmit,
}: {
  onSubmit: (value: string) => void;
}) {
  const [ value, setValue ] = useState<string>('');
  const [ error, setError ] = useState<string>('');

  function handleSubmit() {
    if (!value) {
      setError('Field is required')
      return
    }
    onSubmit(value)
    setValue('')
  }

  return (
    <View style={{ flexDirection: 'row', marginBottom: 12 }}>
      <CustomTextInput
        label='Field'
        value={value}
        onChangeText={setValue}
        error={error}
        mode='outlined'
        flexGrow
      />
      <Button
        mode='contained-tonal'
        onPress={handleSubmit}
        style={{ marginLeft: 'auto', alignSelf: 'center', marginStart: 12 }}
      >Add</Button>
    </View>
  )
}

function AdditionalFieldsCRUD({
  onAddNewFieldSubmit,
  onRemove,
  additionalFields,
}: {
  onAddNewFieldSubmit: (value: string) => void;
  onRemove: (index: number) => void;
  additionalFields: string[];
}) {
  return (
    <>
      <AdditionalFieldInput
        onSubmit={onAddNewFieldSubmit}
      />
      <ScrollView>
        {additionalFields.map((field, index) => (
          <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
            <Text variant='bodyLarge'>{field}</Text>
            <Button mode='text' onPress={() => onRemove(index)}>Remove</Button>
          </View>
        ))}
      </ScrollView>
    </>
  )
}

export default AdditionalFieldsCRUD;
