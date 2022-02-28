/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Button
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Section: React.FC<{
  stations: string,
  costs: string;
}> = ({children, stations, costs }) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const stringToNumberArray = (stringArray: string) => {
    return stringArray.split(",").map(elem => {
      let n:number = Number(elem);
      return n === 0 ? n : n || elem;
    });
  }

  const pickStartIndex = (stations: [], costs: [], previousIndex: number = 0 ) => {
    let startPointIndex : number = -1;
    for (let i:number = previousIndex; i < stationArr.length; i++) {
      startPointIndex = stations[i] > costs[i] ? startPointIndex : i;
    }
    return startPointIndex;
 }

  const doRoute = (stations: [], costs: [], startPoint: number) => {
    let currentGas: number = stations[startPoint];
    for (let i:number = startPoint; i < stations.length; i++) {
      if (i !== stations.length-1) {
        currentGas = stations[i] - costs[i] + stations[i+1];
      } else {
        currentGas = stations[i] - costs[i] + stations[0];
      };
      if (currentGas <= 0) break;
    }
    if (currentGas>costs[costs.length]) {
      for (let j:number = 0; j = startPoint; j++) {

      }
    }
  }

  const doTheTrick = (stations: string, costs: string) => {
    console.log(stations);
    console.log(costs);
    //let stationsArray: [] = stringToNumberArray(stations);
    //let costsArray: [] = stringToNumberArray(costs);
    //let startPoint: number = pickStartIndex(stationsArray, costsArray);
    //doRoute(stations, costsArray, startPoint);
  }

  const [stations, setStations] = useState('');
  const [costs, setCosts] = useState('');
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
            <TextInput
                value={stations} onChangeText={ newStations => setStations(newStations)}
                placeholder="stations" keyboardType="numeric"
                style={{height: 40, borderColor: 'white', borderWidth: 1}}
                />
            <TextInput
                value={costs} onChangeText={ newCosts => setCosts(newCosts)}
                placeholder="costs" keyboardType="numeric"
                style={{height: 40, borderColor: 'green', borderWidth: 1}}
                />
            <Button
                title="Calculate"
                onPress={ () => doTheTrick(stations, costs)}
              />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
