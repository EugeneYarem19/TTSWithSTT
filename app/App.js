/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableHighlight,
} from 'react-native';

import {TTS_Service} from './services/TTS_Service';

import {Colors} from './constants/colors';

const App = () => {
  const [text, setText] = useState('Hello, world! I hate JS and love C++');
  const onChangeText = useCallback(newText => setText(newText), [setText]);
  const say = useCallback(() => TTS_Service.say(text), [text]);

  useEffect(() => {
    TTS_Service.initTTS();
    return () => TTS_Service.stopSpeaking();
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.speackingBlock}>
          <TextInput
            style={styles.input}
            multiline
            value={text}
            onChangeText={onChangeText}
          />
          <TouchableHighlight
            style={styles.buttonContainer}
            underlayColor={Colors.buttonColorUnderlay}
            onPress={say}>
            <Text style={styles.buttonText}>Say it!</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: Colors.background,
  },
  speackingBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    height: 300,
    width: '100%',

    borderColor: 'red',
    borderWidth: 2,
  },
  input: {
    width: '75%',
    borderColor: Colors.borderColor,
    borderWidth: 2,
    paddingVertical: 10,
    minHeight: 50,
  },
  buttonContainer: {
    backgroundColor: Colors.buttonColor,
    borderColor: Colors.black,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '22%',
    paddingVertical: 10,
    height: 50,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 20,
  },
});

export default App;
