import { useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootStackParamList } from '../../types';
import EnterName from './EnterName';
import AdditionalFields from './AdditionalFields';
import { RootState } from '../../redux/store';

function OnBoardiing() {
  const [currentScreen, setCurrentScreen] = useState<number>(0);

  const { name, additionalFields } = useSelector((state: RootState) => state.onBoarding);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();

  function handleEnterNameSubmit() {
    setCurrentScreen(currentScreen + 1);
  }

  function handleAdditionalFieldsSubmit() {
    dispatch({ type: 'user/login', payload: { name, additionalFields }});
    dispatch({ type: 'onBoarding/onSuccess' });
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
