import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';

const App = () => {
  const stringToNumberArray = (stringArray: string) => {
    return stringArray.split(',').map(Number);
  };

  const pickStartIndex = (stations: number[], costs: number[]) => {
    let possibleStartPoints: number[] = [];
    for (let i: number = 0; i < stations.length; i++) {
      if (stations[i] >= costs[i]) {
        possibleStartPoints.push(i);
      }
    }
    return possibleStartPoints;
  };

  const doRoute = (stations: number[], costs: number[], startPoint: number) => {
    let currentGas: number = stations[startPoint];
    let response: number = startPoint;
    for (let i: number = startPoint; i < stations.length; i++) {
      if (i !== stations.length - 1) {
        // veo algunos casos extremos en los que esto funciona,
        // por el hecho de que la suma y la resta se efectuan a la par,
        // en lugar de verificar si la resta da mayor o igual a 0 antes de sumar.
        // esto segun logica me parece un error.
        // Por el hecho de que no deberia poder gastar lo que no tengo,
        // pero por ahora lo dejare, porque asi esta la logica de los ejemplos.
        currentGas += -costs[i] + stations[i + 1];
      } else {
        currentGas += -costs[i] + stations[0];
        if (startPoint === 0 && currentGas >= 0) {
          break;
        }
      }
      if (currentGas <= 0) {
        response = -1;
        break;
      }
    }
    if (startPoint !== 0) {
      if (currentGas > costs[costs.length - 1]) {
        for (let j: number = 0; j < startPoint; j++) {
          if (j === startPoint - 1) {
            response =
              currentGas - costs[startPoint - 1] >= 0 ? startPoint : -1;
            break;
          } else {
            currentGas += -costs[j] + stations[j + 1];
          }
        }
      } else {
        response = -1;
      }
    }
    return response;
  };

  const doTheTrick = (stations: string, costs: string) => {
    let result: number = -1;
    let stationsArray: number[] = stringToNumberArray(stations);
    let costsArray: number[] = stringToNumberArray(costs);
    // aca estaba pensando buscar el primer punto posible y luego utilizar recursividad,
    // pero luego me parecio mas eficiente buscar todos los puntos de inicio posible
    // regresarlos como array y buscar en ellos uno por uno
    // y en caso que uno funcione, hacer un break y mandar este como la solucion.
    let possibleStartPoints: number[] = pickStartIndex(
      stationsArray,
      costsArray,
    );
    if (possibleStartPoints.length > 0) {
      for (let i: number = 0; i < possibleStartPoints.length; i++) {
        result = doRoute(stationsArray, costsArray, possibleStartPoints[i]);
        if (result !== -1) break;
      }
    }
    setResult(result);
  };

  const [stations, setStations] = useState<string>('');
  const [costs, setCosts] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  return (
    <View style={styles.sectionContainer}>
      <TextInput
        value={stations}
        onChangeText={newStations => setStations(newStations)}
        placeholder="stations"
        keyboardType="numeric"
        style={styles.inputs}
      />
      <TextInput
        value={costs}
        onChangeText={newCosts => setCosts(newCosts)}
        placeholder="costs"
        keyboardType="numeric"
        style={styles.inputs}
      />
      <Button title="Calculate" onPress={() => doTheTrick(stations, costs)} />
      {result !== null && (
        <Text style={styles.result}> The Result is: {result} </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  inputs: {
    display: 'flex',
    height: 40,
    marginBottom: 10,
    width: 300,
    backgroundColor: '#000000',
    borderColor: 'gray',
    borderWidth: 1,
  },
  result: {
    backgroundColor: 'green',
    width: 300,
    height: 40,
    paddingVertical: 10,
    paddingHorizontal: 50,
    marginTop: 10,
  },
});

export default App;
