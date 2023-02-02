import React, {useEffect, useState, useRef, useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  useCameraDevices,
  Camera as CameraVision,
} from 'react-native-vision-camera';
import {Button} from 'native-base';
import Animated, {SlideInRight, SlideInDown} from 'react-native-reanimated';
import {uploadToBlobAPI, createBlobAPI} from '../../api/api';

type CameraPropsT = {
  setRecognition: (arg0: []) => void;
  setId: (id: string) => void;
};

const CameraComponent = ({
  setRecognition,
  setId,
}: CameraPropsT): JSX.Element => {
  const [cameraPermission, setCameraPermission] = useState('');
  const [cameraType, setCameraType] = useState<'front' | 'back'>('back');

  const ref = useRef<CameraVision | null>(null);

  const devices = useCameraDevices();
  let device = devices[cameraType];

  useEffect(() => {
    if (cameraPermission !== 'authorized') {
      cameraPermissionHandler();
    }
  }, []);

  const cameraPermissionHandler = async () => {
    try {
      console.log('test');
      let permission = await CameraVision.requestCameraPermission();
      setCameraPermission(permission);
    } catch (error) {
      setCameraPermission('null');
    }
  };

  console.log('camera permission', cameraPermission);
  const screenshotHandler = async () => {
    if (null == ref.current) {
      return;
    }
    setRecognition([]);
    try {
      const {blob_id: id, upload_url: url} = await createBlobAPI();
      setId(id);

      const photo = await ref.current?.takeSnapshot({
        quality: 85,
        skipMetadata: true,
      });

      await uploadToBlobAPI(url, photo.path);
    } catch (error) {
      console.log('error in screenshotHandler(camera.tsx L52)');
    }
  };

  const toggleCameraType = useCallback((): void => {
    setCameraType(p => (p === 'back' ? 'front' : 'back'));
  }, []);

  if (cameraPermission !== 'authorized') {
    return (
      <Animated.View
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        entering={SlideInRight.delay(250)}>
        <Text
          style={{
            width: '90%',
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            flex: 0.3,
          }}>
          Why did you decline ? You can't use it now... Try again or don't , i
          really don't care.
        </Text>
        <Button
          style={styles.button}
          colorScheme="secondary"
          onPress={cameraPermissionHandler}>
          Camera
        </Button>
      </Animated.View>
    );
  }

  if (device == null)
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Can't find your device, please restart the application.</Text>
      </View>
    );

  return (
    <Animated.View style={styles.container} entering={SlideInDown.delay(100)}>
      <CameraVision
        device={device}
        style={{flex: 1}}
        isActive={true}
        ref={ref}
        photo={false}
      />
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          colorScheme="secondary"
          onPress={toggleCameraType}>
          Flip Camera
        </Button>
        <Button
          style={styles.button}
          colorScheme="secondary"
          onPress={screenshotHandler}>
          Screenshot
        </Button>
      </View>
    </Animated.View>
  );
};

export default CameraComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    padding: 15,
  },
  button: {
    height: 55,
    width: 120,
    padding: 5,
    borderRadius: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
