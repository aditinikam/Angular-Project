from PIL import Image
import matplotlib.pyplot as plt
import numpy as np
import onnxruntime as ort

allClasses = ['Bird', 'Flower', 'Hand', 'House','Mug','Pencil','Spoon','Sun', 'Tree', 'Umbrella']
ort_session = ort. InferenceSession('machinelearning/savedmovethedez.onnx')
def process(path):
    image = Image.fromarray(plt.imread(path)[:, :, 3])
    image = image.resize((128, 128))
    image = (np.array(image)>0).astype(np.float32)[None, :, :]
    return image[None]

def test(path):
    image = process (path)
    output = ort_session.run(None,{'data': image})[0].argmax()
    print (allClasses[output],output)
    return allClasses[output]