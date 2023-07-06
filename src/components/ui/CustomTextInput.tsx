import React from 'react'
import { View } from 'react-native'
import { DefaultTheme, Text, TextInput } from 'react-native-paper'

function CustomTextInput({ error, label, value, mode, onChangeText, flexGrow }: {
  error?: string;
  label: string;
  value: string;
  mode?: 'outlined' | 'flat';
  flexGrow?: boolean;
  onChangeText: (text: string) => void;
}) {
  return (
    <View {...(flexGrow ? { style: { flexGrow: 1 } } : {})}>
      <TextInput
        error={Boolean(error)}
        label={label}
        value={value}
        mode={mode || 'flat'}
        onChangeText={onChangeText}
      />
      {error && <Text variant="labelMedium" style={{ color: DefaultTheme.colors.error, marginTop: 4 }} >{error}</Text>}
    </View>
  )
}

export default CustomTextInput;