import { Appbar, Divider } from "react-native-paper";

function CustomAppBar ({
  onBack,
  title,
}: {
  onBack?: () => void,
  title?: string,
}) {
  return (
  <>
    <Appbar.Header style={{
      backgroundColor: 'transparent'
    }}>
      {onBack && <Appbar.BackAction onPress={onBack} />}
      {title && <Appbar.Content title={title} />}
    </Appbar.Header>
    <Divider />
  </>

  )
}

export default CustomAppBar;
