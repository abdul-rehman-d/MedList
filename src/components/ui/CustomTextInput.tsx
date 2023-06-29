import React from 'react'
import { View } from 'react-native'
import { DefaultTheme, Text, TextInput } from 'react-native-paper'

function CustomTextInput({ error, label, value, onChangeText }: {
  error?: string;
  label: string;
  value: string;
  onChangeText: (text: string) => void;
}) {
  return (
    <View>
      <TextInput
        error={Boolean(error)}
        label={label}
        value={value}
        onChangeText={onChangeText}
      />
      {error && <Text variant="labelMedium" style={{ color: DefaultTheme.colors.error, marginTop: 4 }} >{error}</Text>}
    </View>
  )
}

export default CustomTextInput