import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FirebaseAuthService from './config/firebaseAuthService';
import LoginForm from './components/LoginForm';

function App() {
  const [user, setUser] = useState(null);
  const [recording, setRecording] = useState(false);
  const [audioStream, setAudioStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [transcription, setTranscription] = useState('');


  FirebaseAuthService.subscribetoAuthChanges(setUser);
  
  async function sendAudioForTranscription(audioBlob) {
    try {
      const apiKey = "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"; // Replace with your OpenAI API key
      const apiUrl = 'https://api.openai.com/v1/audio/transcriptions';

      const formData = new FormData();
      formData.append('file', audioBlob, 'audio.wav');
      formData.append('model', 'whisper-1')

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setTranscription(data.text);

        //console.log(data.text);
      } else {
        console.error('Error transcribing audio:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending audio for transcription:', error);
    }
  }

  useEffect(() => {
    async function startRecording() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setAudioStream(stream);

        const chunks = [];
        const mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunks.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(chunks, { type: 'audio/wav' });
          const url = URL.createObjectURL(audioBlob);
          setAudioUrl(url);

          // Send the recorded audio for transcription
          sendAudioForTranscription(audioBlob);
        };

        mediaRecorder.start();
        setMediaRecorder(mediaRecorder);
        setRecording(true);
      } catch (error) {
        console.error('Error accessing microphone:', error);
      }
    }

    if (recording) {
      startRecording();
    } else if (audioStream) {
      mediaRecorder.stop();
      audioStream.getTracks().forEach((track) => track.stop());
    }

    return () => {
      if (audioStream) {
        audioStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [recording]);

  const toggleRecording = () => {
    setAudioUrl(null);
    setRecording(!recording);
    setTranscription("");
  };

  return (
    <div className="container">
      
      <LoginForm existingUser={user}></LoginForm>
      
      { user ?
            <><button
          type="button"
          className="btn btn-primary mb-1 mt-2"
          onClick={toggleRecording}
        >
          {recording ? 'Comenzar a grabar' : 'Dejar de grabar'}
        </button><div className="input-group">
            <span className="input-group-text">Contenido</span>
            <textarea className="form-control" id="textarea1" value={transcription}></textarea>
            <button className='btn btn-success'>Subir mensaje a Base de datos</button>
          </div></>

      : null}

    </div>
  );
}

export default App;
