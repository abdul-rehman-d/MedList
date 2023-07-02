import { useEffect, useState } from 'react';
import { View } from 'react-native'
import { Button, IconButton, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import CustomTextInput from './ui/CustomTextInput';
import cuuid from 'cuuid'
import { RootState } from '../redux/store';

function EditMedicine({
  id,
  onClose,
}: {
  id: string;
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

  const medicine = useSelector((state: RootState) => state.medicineList.list.find(medicine => medicine.id === id));
  const dispatch = useDispatch();

  useEffect(() => {
    if (medicine) {
      setName(medicine.name);
      setQuantity(medicine.quantity);
    }
  }, [medicine])

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
      type: 'medicineList/editExisting',
      payload: {
        id,
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
        <Text variant='titleLarge'>Edit Medicine</Text>
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

export default EditMedicine;
