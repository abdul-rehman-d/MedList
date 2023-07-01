import { ScrollView, StyleSheet, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { Appbar, DefaultTheme, Divider } from 'react-native-paper';

function Header ({onBack}: {onBack: () => void}) {
  return (
  <>
    <Appbar.Header style={{
      backgroundColor: 'transparent'
    }}>
      <Appbar.BackAction onPress={onBack} />
      <Appbar.Content title="Advanced Options" />
    </Appbar.Header>
    <Divider />
  </>

  )
}

function AdvancedOptions({ route, navigation }: NativeStackScreenProps<RootStackParamList, 'AdvancedOptions'>) {

  return (
    <View style={{
      flex: 1,
    }}>
      <Header onBack={() => navigation.goBack()} />
      <ScrollView style={{
        flex: 1,
        padding: 16,
      }}>
      </ScrollView>
    </View>
  )
}

export default AdvancedOptions;
