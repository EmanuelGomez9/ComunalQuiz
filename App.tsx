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
} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const stringToNumberArray = (stringArray: string) => {
    return stringArray.split(",").map(elem => {
      let n:number = Number(elem);
      return n === 0 ? n : n || elem;
    });
  }

  const pickStartIndex = (stations: [], costs: [], previousIndex: number = 0 ) => {
    let startPointIndex : number = -1;
    for (let i:number = previousIndex; i < stations.length; i++) {
      if (stations[i] > costs[i]) {
        startPointIndex = i;
        break;
      }
    }
    return startPointIndex;
 }

  const doRoute = (stations: [], costs: [], startPoint: number) => {
    let currentGas: number = stations[startPoint];
    for (let i:number = startPoint; i < stations.length; i++) {
      if (i !== stations.length-1) {
        currentGas = currentGas - costs[i] + stations[i+1];
      } else {
        currentGas = currentGas - costs[i] + stations[0];
      };
      if (currentGas <= 0) return -1;
    };
    if (startPoint!==0) {
        if (currentGas>costs[costs.length-1]) {
          for (let j:number = 0; j < startPoint; j++) {
            if (j!==startPoint-1) {
                currentGas = currentGas - costs[j] + stations[j+1];
            } else {
                if (currentGas - costs[startPoint-1] >= 0) {
                    return startPoint;
                };
            };
          };
        } else {
            return -1
        };
    };
  }

  const doTheTrick = (stations: string, costs: string) => {
    let result: number = -1;
    let stationsArray: [] = stringToNumberArray(stations);
    let costsArray: [] = stringToNumberArray(costs);
    let startPoint: number = pickStartIndex(stationsArray, costsArray);
    if (startPoint > -1) {
        let result = doRoute(stationsArray, costsArray, startPoint);

    }
  }

  const [stations, setStations] = useState('');
  const [costs, setCosts] = useState('');
  const [result, setResult] = useState('');
  return (
        <View style={styles.sectionContainer}>
            <TextInput
                value={stations} onChangeText={ newStations => setStations(newStations)}
                placeholder="stations" keyboardType="numeric"
                style={styles.inputs}
                />
            <TextInput
                value={costs} onChangeText={ newCosts => setCosts(newCosts)}
                placeholder="costs" keyboardType="numeric"
                style={styles.inputs}
                />
            <Button
                title="Calculate"
                onPress={ () => doTheTrick(stations, costs)}
              />
            <Text style={styles.result}> The Result is: {result} </Text>
        </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  inputs: {
    display: "flex",
    height: 40,
    marginBottom: 10,
    width: 300,
    backgroundColor: "#000000",
    borderColor: "gray",
    borderWidth: 1
  },
  result: {
    backgroundColor: "green",
    width: 300,
    height: 40,
    paddingVertical: 10,
    paddingHorizontal: 50,
    marginTop: 10,
  }
});

export default App;
