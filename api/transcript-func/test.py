# from flask import Flask, jsonify, request
# import speech_recognition as sr
# import subprocess
# import os

# app = Flask(__name__)

# def transcribe_audio(file_path: str):
#     r = sr.Recognizer()
    
#     # Convert audio file to WAV format
#     wav_file_path = file_path.replace(".m4a", ".wav")
#     subprocess.run(["ffmpeg", "-i", file_path, wav_file_path])
    
#     # Load audio file
#     with sr.AudioFile(wav_file_path) as source:
#         audio = r.record(source)

#     # Transcribe audio
#     try:
#         transcript = r.recognize_google(audio)
#         return transcript
#     except sr.UnknownValueError:
#         return "Unable to transcribe audio"
#     except sr.RequestError:
#         return "Error occurred during transcription"
#     finally:
#         # Clean up the WAV file
#         if os.path.exists(wav_file_path):
#             os.remove(wav_file_path)

# @app.route('/transcribe-test', methods=['POST'])
# def transcribe():
#     file_path = request.form.get('file_path')
#     transcript = transcribe_audio(file_path)
#     return jsonify({'transcript': transcript})

# if __name__ == '__main__':
#     app.run(debug=True)


from flask import Flask, jsonify, request
import speech_recognition as sr
import subprocess
import os

app = Flask(__name__)

def transcribe_audio(file_path: str):
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
    except Exception as e:
        print(e)
    finally:
        # Clean up the WAV file
        if os.path.exists(wav_file_path):
            os.remove(wav_file_path)

@app.route('/transcribe-test', methods=['POST'])
def transcribe():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file and file.filename.endswith('.m4a'):
        file_path = os.path.join('/tmp', file.filename)
        file.save(file_path)
        transcript = transcribe_audio(file_path)
        os.remove(file_path)  # Clean up the saved file
        return jsonify({'transcript': transcript})
    else:
        return jsonify({'error': 'Invalid file type'}), 400

if __name__ == '__main__':
    app.run(debug=True)