import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Button} from 'native-base';

type HomeProps = {setCameraIsOn: (arg0: boolean) => void};

const Home = ({setCameraIsOn}: HomeProps): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.textWrapper}>
        <Text style={styles.header}>
          This is AIR - Artificial Intelligence Recognition
        </Text>
        <Text style={styles.text}>
          You forgot how da fak any thing is called?
        </Text>
        <Text style={styles.text}>
          Point your camera on it and see magic happen
        </Text>
      </View>
      <Button
        colorScheme="secondary"
        onPress={() => setCameraIsOn(true)}
        style={styles.button}>
        Cam
      </Button>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  textWrapper: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexWrap: 'wrap',
    padding: 8,
    fontWeight: 'bold',
    fontSize: 25,
    letterSpacing: 3,
  },
  text: {
    flexWrap: 'wrap',
    padding: 5,
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 2,
  },
  button: {
    width: 150,
    height: 45,
    padding: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
