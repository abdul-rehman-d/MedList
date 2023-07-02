import { Linking, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import CustomAppBar from '../components/ui/CustomAppBar';
import { Text } from 'react-native-paper';

function About({ route, navigation }: NativeStackScreenProps<RootStackParamList, 'About'>) {

  return (
    <View style={{
      flex: 1,
    }}>
      <CustomAppBar
        onBack={() => navigation.goBack()}
        title="About"
      />
      <View style={{
        flex: 1,
        padding: 16,
        justifyContent: 'space-between',
      }}>
        <View>
          <Text variant='headlineLarge' style={{ fontWeight: '700', marginBottom: 8 }}>
            MedList
          </Text>
          <Text variant='titleLarge' style={{ fontWeight: '500' }}>
            Built by Abdul Rehman
          </Text>
          <Text variant='bodyMedium' style={{ marginTop: 8 }}>
            MedList is a simple app to help you keep track of your medications.
          </Text>
          <Text variant='bodyMedium' style={{ marginTop: 8 }}>
            I recently came across a problem that people with a lot of medications need to either type down or write down their list of medicines and/or medical supplies on a weekly or monthly basis. This is a very tedious task and can be easily automated with the help of a simple app. Especially given that most medicines remain the same for a long time and only a few medicines are added or removed from the list.
          </Text>
          <Text variant='bodyMedium' style={{ marginTop: 8 }}>
            This app can help you add your medicines and medical supplies to a list and then you can easily share that list with your doctor or pharmacist. You can select which medicines you want to share and which ones you don't want to share.
          </Text>
          <Text variant='bodyMedium' style={{ marginTop: 8 }}>
            I hope this app helps you in keeping track of your medications and medical supplies.
          </Text>
        </View>
        <View>
          <Text variant='bodyMedium'>
            Check me out at: <Text variant='bodyMedium' style={{ fontWeight: '700' }} onPress={() => {
              Linking.openURL('https://abdulrehmandev.me');
            }}>https://abdulrehmandev.me</Text>
          </Text>
        </View>
      </View>
    </View>
  )
}

export default About;
