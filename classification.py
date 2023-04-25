import pyaudio
import numpy as np
import librosa
import warnings
import threading

warnings.filterwarnings("ignore")
#This will ignore all DeprecationWarning warnings in your code.
CHUNKSIZE = 1024
SR = 24050

stream_active = True
stop_event = threading.Event()

def audio_callback(in_data, frame_count, time_info, status):
# if stream_active:
    audio_data = np.frombuffer(in_data, dtype=np.int16) / 32767.0 # scale audio data to [-1, 1]
    audio_data = librosa.resample(audio_data, SR, 16000) # resample audio data to 16 kHz
    mfccs_features = librosa.feature.mfcc(audio_data, sr=SR, n_mfcc=40) # compute MFCCs
    mfccs_scaled_features = np.mean(mfccs_features.T,axis=0)

    #Reshape MFCC feature to 2-D array
    mfccs_scaled_features=mfccs_scaled_features.reshape(1,-1)

    x_predict=model.predict(mfccs_scaled_features) 
    predicted_label=np.argmax(x_predict,axis=1)

    prediction_class = Label_encoder.inverse_transform(predicted_label) 
    print(prediction_class)

    # preprocess audio data and do sound classification here
    return (audio_data * 32767.0).astype(np.int16), pyaudio.paContinue

p = pyaudio.PyAudio()
stream = p.open(format=pyaudio.paInt16,
                channels=1,
                rate=SR,
                input=True,
                frames_per_buffer=CHUNKSIZE,
                stream_callback=audio_callback)

stream.start_stream()

# while stream.is_active:
#     pass
try:
    while not stop_event.is_set():
        # do other things here while audio is being recorded and processed
        pass
except KeyboardInterrupt:
    stop_event.set()

stream.stop_stream()
stream.close()
p.terminate()