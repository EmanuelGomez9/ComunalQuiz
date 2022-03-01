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

const App = (props) => {
  const stringToNumberArray = (stringArray: string) => {
    return stringArray.split(",").map(elem => {
      let n:number = Number(elem);
      return n === 0 ? n : n || elem;
    });
  }

  const pickStartIndex = (stations: [], costs: []) => {
    let possibleStartPoints: number[] = [];
    for (let i:number = 0; i < stations.length; i++) {
      if (stations[i] >= costs[i]) {
        possibleStartPoints.push(i);
      };
    };
    return possibleStartPoints;
  }

  const doRoute = (stations: [], costs: [], startPoint: number) => {
    let currentGas: number = stations[startPoint];
    for (let i:number = startPoint; i < stations.length; i++) {
      if (i !== stations.length-1) {
        // veo algunos casos extremos en los que esto funciona,
        // por el hecho de que la suma y la resta se efectuan a la par,
        // en lugar de verificar si la resta da mayor o igual a 0 antes de sumar.
        // esto segun logica me parece un error.
        // Por el hecho de que no deberia poder gastar lo que no tengo,
        // pero por ahora lo dejare, porque asi esta la logica de los ejemplos.
        currentGas = currentGas - costs[i] + stations[i+1];
      } else {
        currentGas = currentGas - costs[i] + stations[0];
        if (startPoint===0 && currentGas>=0) {
            return startPoint;
        };
      };
      if (currentGas <= 0) return -1;
    };
    if (startPoint!==0) {
        if (currentGas>costs[costs.length-1]) {
          for (let j:number = 0; j < startPoint; j++) {
            if (j!==startPoint-1) {
                currentGas = currentGas - costs[j] + stations[j+1];
            } else {
                return currentGas - costs[startPoint-1] >= 0 ? startPoint : -1;
            };
          };
        } else {
            return -1;
        };
    };
  }

  const doTheTrick = (stations: string, costs: string) => {
    let result: number = -1;
    let stationsArray: [] = stringToNumberArray(stations);
    let costsArray: [] = stringToNumberArray(costs);
    // aca estaba pensando buscar el primer punto posible y luego utilizar recursividad,
    // pero luego me parecio mas eficiente buscar todos los puntos de inicio posible
    // regresarlos como array y buscar en ellos uno por uno
    // y en caso que uno funcione, hacer un break y mandar este como la solucion.
    let possibleStartPoints: number[] = pickStartIndex(stationsArray, costsArray);
    if (possibleStartPoints.length > 0) {
        for (let i:number = 0; i < possibleStartPoints.length; i++) {
          result = doRoute(stationsArray, costsArray, possibleStartPoints[i]);
          if (result !== -1) break;
        };
    };
    setResult(result);
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
