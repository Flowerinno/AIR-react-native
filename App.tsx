import {useState, useEffect} from 'react';
import {NativeBaseProvider, Badge, Box, VStack} from 'native-base';
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
  const [cameraIsOn, setCameraIsOn] = useState(false);
  const [id, setId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fetchHandler = async () => {
    try {
      const labels = await fetchAPI(id);

      if (labels.labels.length > 0) {
        setIsLoading(false);
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
          <CameraComponent
            setRecognition={setRecognition}
            setId={setId}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
          {recognition.length > 0 && (
            <Box style={styles.recog}>
              <VStack space={{base: 0, sm: 4}}>
                {recognition.map((item: RecognitionItem, index) => {
                  let confidence = item.confidence.toFixed(3) + '%';
                  return (
                    <Badge
                      variant="solid"
                      key={index}
                      shadow={2}
                      mb={0.5}
                      zIndex={1}>
                      {item.label + ' - ' + confidence}
                    </Badge>
                  );
                })}
              </VStack>
            </Box>
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
    width: '45%',
    position: 'absolute',
    top: '1%',
    fontWeight: 'bold',
  },
});

export default App;
