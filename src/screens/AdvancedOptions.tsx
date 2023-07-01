import { ScrollView, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import CustomAppBar from '../components/ui/CustomAppBar';

function AdvancedOptions({ route, navigation }: NativeStackScreenProps<RootStackParamList, 'AdvancedOptions'>) {

  return (
    <View style={{
      flex: 1,
    }}>
      <CustomAppBar
        onBack={() => navigation.goBack()}
        title='Advanced Options'
      />
      <ScrollView style={{
        flex: 1,
        padding: 16,
      }}>
      </ScrollView>
    </View>
  )
}

export default AdvancedOptions;
