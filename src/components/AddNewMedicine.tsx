import { useState } from 'react';
import { View } from 'react-native'
import { Button, IconButton, Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import CustomTextInput from './ui/CustomTextInput';
import cuuid from 'cuuid'

function AddNewMedicine({
  onClose,
}: {
  onClose: () => void;
}) {
  const [name, setName] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [error, setError] = useState<{
    name: string;
    quantity: string;
  }>({
    name: '',
    quantity: '',
  });

  const dispatch = useDispatch();

  function handleSave() {
    console.log('name', name);
    console.log('quantity', quantity);

    const error = {};
    if (!name) {
      error['name'] = 'Name is required';
    }
    if (!quantity) {
      error['quantity'] = 'Quantity is required';
    }

    if (Object.keys(error).length > 0) {
      setError(currErrors => ({
        ...currErrors,
        ...error,
      }))
      return;
    }

    dispatch({
      type: 'medicineList/addNew',
      payload: {
        id: cuuid(),
        name,
        quantity,
      }
    })
    onClose();
  }

  return (
    <View style={{
      backgroundColor: 'white',
      padding: 16,
      borderRadius: 8,
    }}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Text variant='titleLarge'>Add New Medicine</Text>
        <IconButton
          mode="contained"
          icon='close'
          onPress={onClose}
        />
      </View>
      <View style={{
        gap: 16,
        marginTop: 16,
      }}>
        <CustomTextInput
          error={error.name}
          label="Name"
          value={name}
          mode="outlined"
          onChangeText={text => setName(text)}
        />
        <CustomTextInput
          error={error.quantity}
          label="Quantity"
          value={quantity}
          mode="outlined"
          onChangeText={text => setQuantity(text)}
        />
        <Button mode="contained" onPress={handleSave} style={{
          marginTop: 16,
        }}>
          Save
        </Button>
      </View>
    </View>
  )
}

export default AddNewMedicine;
