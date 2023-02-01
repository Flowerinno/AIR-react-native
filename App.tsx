import {useState, useEffect} from 'react';
import {NativeBaseProvider} from 'native-base';
import {StyleSheet, Text, View} from 'react-native';
import {fetchAPI} from './api/api';
import CameraComponent from './components/camera/Camera';
import Home from './components/home/Home';

interface RecognitionItem {
  label: string;
  confidence: number;
}

const App = (): JSX.Element => {
  const [recognition, setRecognition] = useState<RecognitionItem[] | []>([]);
  const [cameraIsOn, setCameraIsOn] = useState<boolean>(false);
  const [id, setId] = useState('');

  const fetchHandler = async () => {
    try {
      const labels = await fetchAPI(id);
      console.log(labels);
      if (labels.labels) {
        setRecognition(labels.labels);
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let interval: number;
    if (recognition.length === 0 && id !== '') {
      interval = setInterval(fetchHandler, 2000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [id, recognition]);

  return (
    <NativeBaseProvider>
      {!cameraIsOn && <Home setCameraIsOn={setCameraIsOn} />}
      {cameraIsOn && (
        <View style={styles.container}>
          <CameraComponent setRecognition={setRecognition} setId={setId} />
          {recognition.length > 0 && (
            <View style={styles.recog}>
              {recognition.map((item: RecognitionItem, index) => {
                return (
                  <Text key={index} style={{color: 'black', padding: 5}}>
                    {item.label} - {item.confidence}
                  </Text>
                );
              })}
            </View>
          )}
        </View>
      )}
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  cancelButton: {
    position: 'absolute',
    bottom: 15,
    alignSelf: 'center',
    height: 55,
    width: 120,
    padding: 20,
    borderRadius: 20,
  },
  fullscreen: {
    width: '100%',
    height: '100%',
  },
  recog: {
    height: '35%',
    width: '65%',
    position: 'absolute',
    padding: 15,
    fontWeight: 'bold',
    top: '5%',
  },
});

export default App;
