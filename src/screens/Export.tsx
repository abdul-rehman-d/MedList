import { View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { Appbar, Divider, Text } from 'react-native-paper';

function Header ({onBack}: {onBack: () => void}) {
  return (
  <>
    <Appbar.Header style={{
      backgroundColor: 'transparent'
    }}>
      <Appbar.BackAction onPress={onBack} />
    </Appbar.Header>
    <Divider />
  </>

  )
}

function Export({ route, navigation }: NativeStackScreenProps<RootStackParamList, 'Export'>) {
  const { list } = route.params;
  return (
    <View style={{
      flex: 1,
    }}>
      <Header onBack={() => navigation.goBack()} />
      <View style={{
        flex: 1,
        padding: 16,
      }}>
        {
          list.map((item, index) => (
            <Text key={index}>{item.name}</Text>
          ))
        }
      </View>
    </View>
  )
}

export default Export;
