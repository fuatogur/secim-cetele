import {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Button = ({onPress, children}) => (
  <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={styles.button}>
    <Text style={{color: '#fff'}}>{children}</Text>
  </TouchableOpacity>
)

export default function App() {
  const [rte, setRte] = useState(0)
  const [kk, setKk] = useState(0)

  const incrementRte = async () => {
    const newValue = rte + 1

    await AsyncStorage.setItem('rte', String(newValue))
    setRte(newValue)
  }

  const incrementKk = async () => {
    const newValue = kk + 1

    await AsyncStorage.setItem('kk', String(newValue))
    setKk(newValue)
  }

  const decrementRte = async () => {
    if (rte !== 0) {
      const newValue = rte - 1

      await AsyncStorage.setItem('rte', String(newValue))
      setRte(newValue)
    }
  }

  const decrementKk = async () => {
    if (kk !== 0) {
      const newValue = kk - 1

      await AsyncStorage.setItem('kk', String(newValue))
      setKk(newValue)
    }
  }

  const resetRte = async () => {
    await AsyncStorage.setItem('rte', '0')
    setRte(0)
  }

  const resetKk = async () => {
    await AsyncStorage.setItem('kk', '0')
    setKk(0)
  }

  useEffect(() => {
    (async () => {
      const [[, rte], [, kk]] = await AsyncStorage.multiGet(['rte', 'kk'])

      if (kk) {
        setKk(Number(kk))
      }

      if (rte) {
        setRte(Number(rte))
      }
    })()
  }, [])

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View style={[styles.candidate, styles.rte]}>
            <Text style={styles.text}>RECEP TAYYİP ERDOĞAN</Text>
            <Text style={styles.text}>{rte}</Text>
            <View style={{display: 'flex', flexDirection: 'row', gap: 10}}>
              <Button onPress={incrementRte}>Arttır</Button>
              <Button onPress={decrementRte}>Azalt</Button>
              <Button onPress={resetRte}>Sıfırla</Button>
            </View>
          </View>
          <View style={[styles.candidate, styles.kk]}>
            <Text style={styles.text}>KEMAL KILIÇDAROĞLU</Text>
            <Text style={styles.text}>{kk}</Text>
            <View style={{display: 'flex', flexDirection: 'row', gap: 10}}>
              <Button onPress={incrementKk}>Arttır</Button>
              <Button onPress={decrementKk}>Azalt</Button>
              <Button onPress={resetKk}>Sıfırla</Button>
            </View>
          </View>
          <StatusBar backgroundColor="white"/>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    backgroundColor: 'green',
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12
  },
  candidate: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 25,
    color: '#fff'
  },
  rte: {
    flex: 1,
    backgroundColor: 'orange'
  },
  kk: {
    flex: 1,
    backgroundColor: 'red'
  }
});
