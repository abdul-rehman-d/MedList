import { ScrollView, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import CustomAppBar from '../components/ui/CustomAppBar';

function About({ route, navigation }: NativeStackScreenProps<RootStackParamList, 'About'>) {

  return (
    <View style={{
      flex: 1,
    }}>
      <CustomAppBar
        onBack={() => navigation.goBack()}
        title="About"
      />
      <ScrollView style={{
        flex: 1,
        padding: 16,
      }}>
      </ScrollView>
    </View>
  )
}

export default About;
