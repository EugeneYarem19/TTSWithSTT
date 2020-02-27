import TTS from 'react-native-tts';

export const TTS_Service = {
  initTTS: (callback = () => {}) =>
    TTS.getInitStatus()
      .then(() => {
        TTS.setDefaultLanguage('en-IE');
        TTS.setDefaultVoice('com.apple.ttsbundle.Moira-compact');
        TTS.setDefaultPitch(1.5);
        TTS.setDucking(true);
        TTS.voices().then(voices => console.log(voices));
        TTS.setIgnoreSilentSwitch('ignore');

        callback();
      })
      .catch(err => {
        if (err.code === 'no_engine') {
          TTS.requestInstallEngine();
        }
      }),

  say: text =>
    TTS.speak(text, {
      androidParams: {
        KEY_PARAM_PAN: -1,
        KEY_PARAM_VOLUME: 1,
        KEY_PARAM_STREAM: 'STREAM_MUSIC',
      },
    }),

  stopSpeaking: () => TTS.stop(),
};
