import os 
from flask import Flask,request
import json
from flask_cors import CORS
import base64

app = Flask(__name__)
cors = CORS(app)
datasetPath = 'data'
 
@app.route('/upload_canvas', methods=['POST'])
def upload_canvas():
    data = json.loads(request.data.decode('UTF-8'))
    image_data = data['image'].split(',')[1].encode('UTF-8')
    filename = data['filename']
    classname = data['className']
    os.makedirs(f'{datasetPath}/{classname}/image',exist_ok=True)
    with open (f'{datasetPath}/{classname}/image/{filename}',"wb") as fh:
        fh.write(base64.decodebytes(image_data))
    return "Got the Image"
