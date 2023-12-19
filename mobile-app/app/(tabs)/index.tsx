import { Button, StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import Image from 'react-native-remote-svg';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Image>

      </Image>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
