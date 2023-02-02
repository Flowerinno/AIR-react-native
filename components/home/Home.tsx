import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Button} from 'native-base';
import Animated, {SlideInRight, SlideOutLeft} from 'react-native-reanimated';
type HomeProps = {setCameraIsOn: (arg0: boolean) => void};

const Home = ({setCameraIsOn}: HomeProps): JSX.Element => {
  return (
    <Animated.View style={styles.container} entering={SlideInRight.delay(250)}>
      <View style={styles.textWrapper}>
        <Text style={styles.header}>
          This is AIR - Artificial Intelligence Recognition
        </Text>
        <Text style={styles.text}>Point your camera and see magic happen</Text>
      </View>
      <Button
        colorScheme="secondary"
        onPress={() => setCameraIsOn(true)}
        style={styles.button}>
        Cam
      </Button>
    </Animated.View>
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
