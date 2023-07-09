import { Image, ScrollView, StyleSheet, View } from 'react-native'
import { Button, DefaultTheme, Text } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import AdditionalFieldsCRUD from '../../components/AdditionalFields';

function AdditionalFields({
  handleSubmit,
}: {
  handleSubmit: () => void;
}) {
  const additionalFields = useSelector((state: RootState) => state.onBoarding.additionalFields);
  const dispatch = useDispatch();

  function onAddNewFieldSubmit(value: string) {
    dispatch({ type: 'onBoarding/addAdditionalField', payload: value })
  }

  function onRemove(index: number) {
    dispatch({ type: 'onBoarding/removeAdditionalField', payload: index })
  }

  function onSubmit() {
    handleSubmit()
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.top}>
        <Text variant='headlineLarge' style={styles.text}>Addtional Fields</Text>
        <Text variant='bodyLarge'>
          Additional Fields are any additional information you want to add on the export image.
        </Text>
        <Text variant='bodyLarge' style={{ fontWeight: '700' }}>
          If you do not wish to add any, just click Next!
        </Text>
        <View style={styles.imageContainer}>
          <View style={{ flexShrink: 1 }}>
            <Text variant='bodyLarge' style={{ fontWeight: '700' }}>Example:</Text>
            <Text variant='bodyLarge'>
              You can add your phone number, email, etc.
            </Text>
          </View>
          <Image
            source={require('../../../assets/additional-fields-demo.jpg')}
            style={{ height: '100%', width: 'auto', aspectRatio: '1541 / 750', marginLeft: 'auto' }}
          />
        </View>
      </View>
      <View style={styles.bottom}>
        <AdditionalFieldsCRUD
          onAddNewFieldSubmit={onAddNewFieldSubmit}
          onRemove={onRemove}
          additionalFields={additionalFields}
        />
        <Button mode='contained' onPress={onSubmit} style={{ alignSelf: 'center' }}>Next</Button>
        <View>
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
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '35%',
    marginTop: 20,
    alignItems: 'center',
  },
  bottom: {
    flex: .6,
    padding: 20,
    gap: 12,
  },
});

export default AdditionalFields