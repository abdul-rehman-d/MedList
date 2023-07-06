import { ScrollView, StyleSheet, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { Appbar, DefaultTheme, Divider, FAB, Text } from 'react-native-paper';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';

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
  const imageRef = useRef<View>(null);
  
  const { list } = route.params;

  const user = useSelector((state: RootState) => state.user.user);

  function onShare() {
    captureRef(imageRef, {
      format: 'png',
      quality: 1,
      result: 'tmpfile',
    }).then(async (uri) => {
      if (!(await Sharing.isAvailableAsync())) {
        alert(`Uh oh, sharing isn't available on your platform`);
        return;
      }

      await Sharing.shareAsync(uri);
      navigation.goBack();
    })
  }

  return (
    <View style={{
      flex: 1,
    }}>
      <Header onBack={() => navigation.goBack()} />
      <ScrollView style={{
        flex: 1,
        padding: 16,
      }}>
        <View ref={imageRef} style={imageStyles.wrapper}>
          <Text variant='displaySmall' style={imageStyles.heading}>
            Medicine List
          </Text>
          <Text variant='bodyLarge' style={{ textAlign: 'right' }}>{user.name}</Text>
          {user.additionalFields.map((field, index) => (
            <Text
              variant='bodyLarge'
              style={{ textAlign: 'right' }}
              key={`additional-field-${index}`}
            >{field}</Text>
          ))}
          <View style={imageStyles.tableContainer}>
            <View style={{ ...imageStyles.row, ...imageStyles.headRow }}>
              <Text style={{ ...imageStyles.col1, ...imageStyles.bold }}>Sr No</Text>
              <Text style={{ ...imageStyles.col2, ...imageStyles.bold }}>Name</Text>
              <Text style={{ ...imageStyles.col3, ...imageStyles.bold }}>Quantity</Text>
            </View>
            {
              list.map((item, index) => (
                <View style={imageStyles.row} key={index}>
                  <Text style={imageStyles.col1}>{index+1}</Text>
                  <Text style={imageStyles.col2}>{item.name}</Text>
                  <Text style={imageStyles.col3}>{item.quantity}</Text>
                </View>
              ))
            }
          </View>
        </View>
      </ScrollView>
      <FAB
        icon='share'
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
        }}
        label='Share'
        onPress={onShare}
      />
    </View>
  )
}

export default Export;

const imageStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    padding: 16,
    minHeight: 500,
  },
  heading: {
    textAlign: 'center',
    color: DefaultTheme.colors.secondary,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  tableContainer: {
    borderBottomWidth: 1,
    borderColor: DefaultTheme.colors.secondary,
    marginVertical: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: DefaultTheme.colors.secondary,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  headRow: {
    backgroundColor: DefaultTheme.colors.backdrop,
  },
  col1: {
    padding: 8,
    flex: .5,
    borderColor: DefaultTheme.colors.secondary,
    borderRightWidth: 1,
  },
  col2: {
    padding: 8,
    flex: 2,
    borderColor: DefaultTheme.colors.secondary,
    borderRightWidth: 1,
  },
  col3: {
    padding: 8,
    flex: 1,
  },
  bold: {
    fontWeight: 'bold',
  }
});
