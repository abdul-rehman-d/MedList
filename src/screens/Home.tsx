import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Appbar, Button, Checkbox, DataTable, Dialog, Divider, FAB, Menu, Modal, Portal, Text } from 'react-native-paper';
import { RootState } from '../redux/store';
import AddNewMedicine from '../components/AddNewMedicine';
import { Platform, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { logout } from '../redux/slices/user';
import { clearAll } from '../redux/slices/medicineList';

function Header ({
  onExport
}: {
  onExport: () => void;
}) {
  const [ moreMenuVisible, setMoreMenuVisible ] = useState<boolean>(false);
  const [ logoutDialogVisible, setLogoutDialogVisible ] = useState<boolean>(false);
  const name = useSelector((state: RootState) => state.user.user.name);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();

  function onLogoutDialog() {
    setMoreMenuVisible(false);
    setLogoutDialogVisible(true);
  }

  function onLogout() {
    setLogoutDialogVisible(false);
    dispatch(logout());
    dispatch(clearAll());
  }

  function onEditProfile() {
    setMoreMenuVisible(false);
    navigation.navigate('EditProfile');
  }

  return (
    <>
      <Appbar.Header style={{
        backgroundColor: 'transparent'
      }}>
        <Appbar.Content title={`Welcome, ${name}`} />
        <Button
          mode="contained-tonal"
          onPress={onExport}
        >Export</Button>
        <Menu
          visible={moreMenuVisible}
          onDismiss={() => setMoreMenuVisible(false)}
          anchor={<Appbar.Action
            icon={Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical'}
            onPress={() => setMoreMenuVisible(true)}
          />}>
          <Menu.Item onPress={onEditProfile} title="Edit Profile" />
          <Menu.Item onPress={onLogoutDialog} title="Logout" />
        </Menu>
      </Appbar.Header>
      <Divider />
      <Portal>
        <Dialog visible={logoutDialogVisible} onDismiss={() => setLogoutDialogVisible(false)}>
          <Dialog.Title>Logout</Dialog.Title>
          <Dialog.Content>
              <Text variant="bodyMedium">Are you sure you want to log out?</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                style={{ minWidth: 50 }}
                onPress={onLogout}
              >Yes</Button>
              <Button
                style={{ minWidth: 50 }}
                mode='contained'
                onPress={() => setLogoutDialogVisible(false)}
              >No</Button>
            </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  )
}

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
    <DataTable.Row onPress={() => onCheck(id)}>
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
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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

  function onExport() {
    navigation.navigate('Export', {
      list: medList.filter(med => checkedMedicines.includes(med.id))
    });
  }

  return (
    <View style={{
      flex: 1,
    }}>
      <Header onExport={onExport} />
      <ScrollView style={{
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
      </ScrollView>
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
    </View>
  )
}

export default Home;
