from flask import Flask, jsonify
import speech_recognition as sr
import subprocess
import os

app = Flask(__name__)

documentDirectory = "/Users/janahan/Library/Developer/CoreSimulator/Devices/68D55533-B63F-4D18-86A1-CC212FC8FF14/data/Containers/Data/Application/B45DB442-E6E5-4BC1-A507-1424E80492F8/Documents/ExponentExperienceData/@anonymous/joyous-orange-bananas-a8252ddd-17e5-412d-b0a2-7506f9db0674/assets/audio-files/"

def transcribe_audio(file_path):
    r = sr.Recognizer()
    
    # Convert audio file to WAV format
    wav_file_path = file_path.replace(".m4a", ".wav")
    subprocess.run(["ffmpeg", "-i", file_path, wav_file_path])
    
    # Load audio file
    with sr.AudioFile(wav_file_path) as source:
        audio = r.record(source)

    # Transcribe audio
    try:
        transcript = r.recognize_google(audio)
        return transcript
    except sr.UnknownValueError:
        return "Unable to transcribe audio"
    except sr.RequestError:
        return "Error occurred during transcription"
    finally:
        # Clean up the WAV file
        if os.path.exists(wav_file_path):
            os.remove(wav_file_path)

@app.route('/transcribe', methods=['GET'])
def transcribe():
    file_path = documentDirectory + "recording-1724689914411.m4a"
    transcript = transcribe_audio(file_path)
    return jsonify({'transcript': transcript})

if __name__ == '__main__':
    app.run(debug=True)