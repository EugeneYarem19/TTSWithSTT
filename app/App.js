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

import {STT_Service} from './services/STT_Service';
import {TTS_Service} from './services/TTS_Service';

import {Colors} from './constants/colors';

const listeningButtonTitles = {
  start: 'Start listening!',
  stop: 'Stop listening!',
};

const App = () => {
  const [text, setText] = useState('Hello, world! I hate JS and love C++');
  const [recognizedText, setRecognizedText] = useState('');
  const [buttonTitle, setButtonTitle] = useState(listeningButtonTitles.start);
  const onChangeText = useCallback(newText => setText(newText), [setText]);
  const say = useCallback(() => TTS_Service.say(text), [text]);
  const listeningAction = useCallback(() => {
    if (buttonTitle === listeningButtonTitles.start) {
      setButtonTitle(listeningButtonTitles.stop);
      STT_Service.startListening();
    } else {
      setButtonTitle(listeningButtonTitles.start);
      STT_Service.stopListening();
    }
  }, [buttonTitle, setButtonTitle]);

  useEffect(() => {
    TTS_Service.initTTS();
    STT_Service.initSTT((txt, isFinished = false) => {
      setRecognizedText(txt);
      if (isFinished) {
        setButtonTitle(listeningButtonTitles.start);
      }
    });
    return () => {
      TTS_Service.stopSpeaking();
      STT_Service.destroy();
    };
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.block}>
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
        <View style={styles.block}>
          <Text style={styles.input}>{recognizedText}</Text>
          <TouchableHighlight
            style={styles.buttonContainer}
            underlayColor={Colors.buttonColorUnderlay}
            onPress={listeningAction}>
            <Text style={styles.buttonText}>{buttonTitle}</Text>
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
  block: {
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
    width: '64%',
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
    width: '35%',
    paddingVertical: 10,
    height: 50,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
  },
});

export default App;
