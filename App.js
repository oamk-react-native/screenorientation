import { useState,useEffect } from 'react'; 
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

export default function App() {
  const [screenOrientation, setScreenOrientation] = useState('portrait');
  const [isPortrait, setIsPortrait] = useState(true);

  useEffect(() => {
    const subscription = ScreenOrientation.addOrientationChangeListener((value) => {
    if (value.orientationInfo.orientation === ScreenOrientation.Orientation.PORTRAIT_UP) {
      setScreenOrientation("portrait");
      setIsPortrait(true);
    } else if (value.orientationInfo.orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT) {
      setScreenOrientation("landscape");
      setIsPortrait(false);
    }
    });
    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  
  }, []);

 
  const lockToPortrait = async () => {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }
  
  return (
    <View style={[styles.container,isPortrait ? styles.portrait : styles.landscape]}>
      <Text>{screenOrientation}</Text>

      {(() => {
        if (isPortrait) {
          return <Text>This content is only for portrait</Text>
        } else {
          return <Text>This content is only for landscape</Text>
        }
      })()}

     {/*  {isPortrait ===true && 
        <Text>This content is only for portrait</Text>
      } */}
      <Button onPress={lockToPortrait} title="Lock to portrait"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  portrait: {
    backgroundColor: '#ccc',
  },
  landscape: {
    backgroundColor: '#999',
  }
});
