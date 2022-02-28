/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  stations,
  costs,
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
  title: string,
  stations: string,
  costs: string;
}> = ({children, title, firstText, secondText }) => {
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
                value={stations}
                placeholder="stations"
                style={{height: 40, borderColor: 'white', borderWidth: 1}}
                />
            <TextInput
                value={costs}
                placeholder="costs"
                style={{height: 40, borderColor: 'green', borderWidth: 1}}
                />
            <Button
                title="Calculate"
                onPress={ () => Alert.alert('Simple Button pressed')}
              />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const stringToNumberArray = (stringArray: string) => {
    return stringArray.split(",").map(elem => {
      let n = Number(elem);
      return n === 0 ? n : n || elem;
    });
}

const pickStartIndex = (stations: [], costs: [], previousIndex: number = 0 ) => {
    let startPointIndex : number = -1;
    for (let i = previousIndex; i < stationArr.length; i++) {
        startPointIndex = stations[i] > costs[i] ? startPointIndex : i;
    }
    return startPointIndex;
}

const doRoute = (stations: [], costs: [], startPoint: number) => {
    for (let i = startPoint; i < stations.length; i++) {

    }
    for (let j = 0; j = startPoint; j++) {

    }
}

const doTheTrick = (stations: string, costs: string) => {
    let stationsArray: [] = stringToNumberArray(stations);
    let costsArray: [] = stringToNumberArray(costs);
    let startPoint: number = pickStartIndex(stationsArray, costsArray);
    doRoute(stations, costsArray, startPoint);
}

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
