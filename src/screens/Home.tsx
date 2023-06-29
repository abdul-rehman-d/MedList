import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Checkbox, DataTable, FAB, Modal, Portal } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootState } from '../redux/store';
import AddNewMedicine from '../components/AddNewMedicine';

function Medicine({
  id,
  name,
  quantity,
  checked,
  onCheck,
}: {
  id: string;
  name: string;
  quantity: string;
  checked: boolean;
  onCheck: (id: string) => void;
}) {
  return (
    <DataTable.Row>
      <DataTable.Cell style={{
        flex: .5,
      }}>
        <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => onCheck(id)}
        />
      </DataTable.Cell>
      <DataTable.Cell>{name}</DataTable.Cell>
      <DataTable.Cell numeric>{quantity}</DataTable.Cell>
    </DataTable.Row>
  )
}

function Home() {
  const [checkedMedicines, setCheckedMedicines] = useState<string[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  const medList = useSelector((state: RootState) => state.medicineList.list);

  useEffect(() => {
    setCheckedMedicines(medList.map(med => med.id))
  }, [medList])

  function onCheck(id: string) {
    if (checkedMedicines.includes(id)) {
      setCheckedMedicines(checkedMedicines.filter(medId => medId !== id))
    } else {
      setCheckedMedicines([...checkedMedicines, id])
    }
  }

  return (
    <SafeAreaView style={{
      flex: 1,
      padding: 16,
    }}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={{
            flex: .5,
          }}>{''}</DataTable.Title>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title numeric>Quantity</DataTable.Title>
        </DataTable.Header>
        {medList.map((medicine, medicineIdx) => (
          <Medicine
            key={medicine.id}
            {...medicine}
            checked={checkedMedicines.includes(medicine.id)}
            onCheck={onCheck}
          />
        ))}
      </DataTable>
      <Portal>
        <Modal
          visible={showModal}
          dismissable={false}
          style={{
            margin: 16,
          }}
        >
          <AddNewMedicine onClose={() => setShowModal(false)} />
        </Modal>
      </Portal>
      <FAB
        icon='plus'
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
        }}
        onPress={() => setShowModal(true)}
      />
    </SafeAreaView>
  )
}

export default Home;
