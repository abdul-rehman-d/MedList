import { View } from 'react-native'
import { Button, Text } from 'react-native-paper'

function AdditionalFields({
  handleSubmit,
}: {
  handleSubmit: (additionalFields: string[]) => void;
}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 8 }}>
      <Text>Additional Fields</Text>
      <Button onPress={() => handleSubmit(['012 345 6789'])}>Submit</Button>
    </View>
  );
}

export default AdditionalFields