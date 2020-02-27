import Voice from '@react-native-community/voice';

export const STT_Service = {
  initSTT: async onEventCallback => {
    await Voice.isAvailable()
      .then(result => {
        console.warn('isAvailable result: ', result);
        if (result) {
          console.warn('GRANTED!');
          Voice.onSpeechStart = () => {
            console.warn('onSpeechStart');
            onEventCallback('Listening...');
          };
          Voice.onSpeechError = ({error}) => {
            console.warn('onSpeechError=', error);
            onEventCallback(error.message, true);
          };
          Voice.onSpeechResults = ({value}) => {
            console.warn('onSpeechResults =', value);
            onEventCallback(value[0], true);
          };
        }
      })
      .catch(error => {
        console.warn('isAvailable error: ', error);
      });
  },
  startListening: () => Voice.start('en-IE'),
  stopListening: () => Voice.stop(),
  destroy: async () => {
    await Voice.removeAllListeners();
    Voice.destroy();
  },
};
