import { useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/user';
import { RootStackParamList } from '../../types';
import EnterName from './EnterName';
import AdditionalFields from './AdditionalFields';

function OnBoardiing() {
  const [currentScreen, setCurrentScreen] = useState<number>(0);
  const [name, setName] = useState<string>('');

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();

  function handleEnterNameSubmit(name: string) {
    setCurrentScreen(currentScreen + 1);
    setName(name);
  }

  function handleAdditionalFieldsSubmit(additionalFields: string[]) {
    dispatch(login({ name, additionalFields }));
    navigation.navigate('Home');
  }

  switch (currentScreen) {
    case 0:
      return <EnterName handleSubmit={handleEnterNameSubmit} />;
    case 1:
      return <AdditionalFields handleSubmit={handleAdditionalFieldsSubmit} />;
    default:
      return null;
  }
}

export default OnBoardiing;
