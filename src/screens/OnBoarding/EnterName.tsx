import { View } from 'react-native'
import { Button, Text } from 'react-native-paper'

function EnterName({
  handleSubmit,
}: {
  handleSubmit: (name: string) => void;
}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 8 }}>
      <Text>Enter Name</Text>
      <Button mode='contained-tonal' onPress={() => handleSubmit('John Doe')}>Submit</Button>
    </View>
  );
}

export default EnterName