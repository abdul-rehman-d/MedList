import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Appbar, Button, Checkbox, DataTable, DefaultTheme, Dialog, Divider, FAB, IconButton, Menu, Modal, Portal, Text } from 'react-native-paper';
import { RootState } from '../redux/store';
import AddNewMedicine from '../components/AddNewMedicine';
import EditMedicine from '../components/EditMedicine';
import { Platform, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { logout } from '../redux/slices/user';
import { clearAll, remove } from '../redux/slices/medicineList';

function Header ({
  onExport,
  editMode,
  setEditMode,
}: {
  onExport: () => void;
  editMode: boolean;
  setEditMode: (state: boolean) => void;
}) {
  const [ moreMenuVisible, setMoreMenuVisible ] = useState<boolean>(false);
  const [ logoutDialogVisible, setLogoutDialogVisible ] = useState<boolean>(false);
  const [ deleteAllDialogVisible, setDeleteAllDialogVisible ] = useState<boolean>(false);
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

  function onAdvancedOptions() {
    setMoreMenuVisible(false);
    navigation.navigate('AdvancedOptions');
  }

  function onAboutApp() {
    setMoreMenuVisible(false);
    navigation.navigate('About');
  }

  function onEditList() {
    setMoreMenuVisible(false);
    setEditMode(true);
  }

  function onDeleteAllDialog() {
    setDeleteAllDialogVisible(true);
  }

  function onDeleteAll() {
    setDeleteAllDialogVisible(false);
    setEditMode(false);
    dispatch(clearAll());
  }

  return (
    <>
      <Appbar.Header style={{
        backgroundColor: 'transparent'
      }}>
        {
          editMode ? (
            <>
              <Appbar.Content title="Edit List" />
              <Button
                mode="text"
                onPress={onDeleteAllDialog}
                style={{ marginRight: 10 }}
              >Delete All</Button>
              <Button
                mode='contained-tonal'
                onPress={() => setEditMode(false)}
              >Done</Button>
            </>
          ) : (
            <>
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
                <Menu.Item onPress={onEditList} title="Edit List" />
                <Menu.Item onPress={onEditProfile} title="Edit Profile" />
                <Menu.Item onPress={onAdvancedOptions} title="Advanced Options" />
                <Menu.Item onPress={onAboutApp} title="About App" />
                <Menu.Item onPress={onLogoutDialog} title="Logout" />
              </Menu>
            </>
          )
        }
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
        <Dialog visible={deleteAllDialogVisible} onDismiss={() => setDeleteAllDialogVisible(false)}>
          <Dialog.Title>Delete All</Dialog.Title>
          <Dialog.Content>
              <Text variant="bodyMedium">Are you sure you want to clear the entire list? This action is irresible.</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                style={{ minWidth: 50 }}
                onPress={onDeleteAll}
              >Yes</Button>
              <Button
                style={{ minWidth: 50 }}
                mode='contained'
                onPress={() => setDeleteAllDialogVisible(false)}
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
  editMode,
}: {
  id: string;
  name: string;
  quantity: string;
  checked: boolean;
  onCheck: (id: string) => void;
  editMode: boolean;
}) {
  const [ editMedicineModal, setEditMedicineModal ] = useState<boolean>(false);
  const dispatch = useDispatch();

  function onDelete() {
    dispatch(remove(id))
  }

  function onEdit() {
    setEditMedicineModal(true);
  }

  return (
    <DataTable.Row onPress={() => onCheck(id)}>
      {
        !editMode && (
          <DataTable.Cell style={{
            flex: .5,
          }}>
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => onCheck(id)}
            />
          </DataTable.Cell>
        )
      }
      <DataTable.Cell>{name}</DataTable.Cell>
      <DataTable.Cell numeric>{quantity}</DataTable.Cell>
      {
        editMode && (
          <>
            <DataTable.Cell style={{
              flex: .6,
              justifyContent: 'flex-end',
            }}>
                <IconButton
                  icon="pencil"
                  iconColor={DefaultTheme.colors.primary}
                  onPress={() => onEdit()}
                />
                <IconButton
                  icon="delete"
                  iconColor={DefaultTheme.colors.error}
                  onPress={() => onDelete()}
                />
            </DataTable.Cell>
            <Portal>
              <Modal
                visible={editMedicineModal}
                dismissable={false}
                style={{
                  margin: 16,
                }}
              >
                <EditMedicine onClose={() => setEditMedicineModal(false)} id={id} />
              </Modal>
            </Portal>
          </>
        )
      }
    </DataTable.Row>
  )
}

function Home() {
  const [checkedMedicines, setCheckedMedicines] = useState<string[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

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
      <Header
        onExport={onExport}
        editMode={editMode}
        setEditMode={setEditMode}
      />
      <ScrollView style={{
        paddingHorizontal: 16,
      }}>
        <DataTable>
          <DataTable.Header>
            {
              !editMode && (
                <DataTable.Title style={{
                  flex: .5,
                }}>{'#'}</DataTable.Title>
              )
            }
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title numeric>Quantity</DataTable.Title>
            {
              editMode && (
                <DataTable.Title style={{
                  flex: .25,
                }}>{''}</DataTable.Title>
              )
            }
          </DataTable.Header>
          {medList.map((medicine) => (
            <Medicine
              key={medicine.id}
              {...medicine}
              checked={checkedMedicines.includes(medicine.id)}
              onCheck={onCheck}
              editMode={editMode}
            />
          ))}
        </DataTable>
        <View style={{ height: 84 }} />
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
