import { useState } from 'react';
import { StyleSheet, View } from 'react-native'
import { Button, DefaultTheme, Text } from 'react-native-paper'
import CustomTextInput from '../../components/ui/CustomTextInput';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

function EnterName({
  handleSubmit,
}: {
  handleSubmit: () => void;
}) {
  const [ error, setError ] = useState<string>('')

  const name = useSelector((state: RootState) => state.onBoarding.name);
  const dispatch = useDispatch();

  function setName(name: string) {
    dispatch({ type: 'onBoarding/setName', payload: name });
  }

  function onSubmit() {
    if (!name) {
      setError('Please enter a name')
      return
    }
    handleSubmit()
  }

  return (
    <View style={styles.container}>
      {/* top container */}
      <View style={styles.top}>
        <Text variant='displayMedium' style={styles.text}>Welcome to <Text>MedList</Text></Text>
        <Text variant='bodyLarge'>Where you can add your medicines all at one place and select which ones you want to export.</Text>
      </View>

      {/* bottom container */}
      <View style={styles.bottom}>
        <CustomTextInput
          label='Full Name'
          value={name}
          onChangeText={setName}
          error={error}
        />
        <Button mode='contained' onPress={onSubmit} style={{ alignSelf: 'center' }}>
          Submit
        </Button>
        <View style={{ marginTop: 'auto' }}>
          <Text variant='bodyLarge' style={{ fontWeight: '700' }}>Note: </Text>
          <Text variant='bodyLarge'>
            Your information is only stored locally and is used on the exporting image. Your data isn't shared or collected by us.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    backgroundColor: DefaultTheme.colors.primaryContainer,
    flex: .4,
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  text: {
    color: DefaultTheme.colors.primary,
    fontWeight: '400'
  },
  bottom: {
    flex: .6,
    padding: 20,
    gap: 12,
  },
});

export default EnterName