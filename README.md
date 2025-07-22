# 🎵 AcousticNet

[![Python 3.8+](https://img.shields.io/badge/python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![PyTorch](https://img.shields.io/badge/PyTorch-2.0+-red.svg)](https://pytorch.org/)
[![Modal](https://img.shields.io/badge/Modal-Cloud-purple.svg)](https://modal.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> A powerful deep learning system that can identify and classify environmental sounds using advanced neural networks

## 🌟 What is AcousticNet?

AcousticNet is an intelligent audio classification system that can listen to sounds and tell you what they are! Built with cutting-edge deep learning technology, it can recognize 50 different types of environmental sounds - from barking dogs to chirping birds, from car engines to rainfall.

**Think of it as "Shazam for environmental sounds"** - but instead of identifying music, it identifies the sounds of the world around us.

## ✨ Key Features

### 🧠 **Smart AI Brain**
- Custom-built neural network with ResNet-inspired architecture
- Trained on thousands of real-world audio samples
- Provides confidence scores for each prediction

### 🎼 **Advanced Audio Processing**
- Converts sound waves into visual spectrograms
- Handles any audio format automatically
- Optimized for real-world audio conditions

### ⚡ **Lightning-Fast Deployment**
- Serverless deployment on Modal cloud platform
- GPU-accelerated inference for instant results
- RESTful API ready for integration

### 📊 **Comprehensive Analysis**
- Returns top 3 most likely predictions
- Includes confidence scores for each guess
- Visualizes internal model thinking process

## 🎯 What Sounds Can It Recognize?

AcousticNet is trained on the ESC-50 dataset and can identify 50 different sound categories:

### 🐾 **Animals**
- Dogs barking, cats meowing, birds chirping
- Cows mooing, frogs croaking, crickets chirping
- And many more!

### 🌿 **Nature Sounds**
- Rain, wind, thunderstorms
- Ocean waves, water drops
- Fire crackling

### 🏠 **Household Sounds**
- Door knocks, clock ticking, vacuum cleaner
- Glass breaking, can opening
- Keyboard typing, mouse clicks

### 🚗 **Urban Environment**
- Car horns, engines, sirens
- Construction sounds, helicopters
- Street noise and traffic

### 👥 **Human Sounds**
- Coughing, sneezing, laughing
- Crying babies, footsteps
- Hand clapping, breathing

## 🚀 Quick Start

### Prerequisites

Before you begin, make sure you have:
- Python 3.8 or higher installed
- A Modal account (free tier available)
- Basic familiarity with command line

### 1️⃣ Get the Code

```bash
# Clone the repository
git clone https://github.com/AbhayPrasad25/AcousticNet.git
cd AcousticNet
```

### 2️⃣ Set Up Your Environment

```bash
# Create a virtual environment (recommended)
python -m venv acousticnet-env

# Activate it
# On Windows:
acousticnet-env\Scripts\activate
# On Mac/Linux:
source acousticnet-env/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3️⃣ Configure Modal

```bash
# Install Modal
pip install modal

# Set up your Modal account
modal setup
```

### 4️⃣ Train the Model (Optional)

```bash
# Train on Modal's cloud GPUs
modal run train.py
```

### 5️⃣ Deploy the API

```bash
# Deploy to Modal cloud
modal deploy main.py
```

## 💻 How to Use

### Using the API

Once deployed, you can classify any audio file by sending it to the API:

```python
import base64
import requests

# Read your audio file
with open("my_audio.wav", "rb") as audio_file:
    # Convert to base64 (required format)
    audio_data = base64.b64encode(audio_file.read()).decode()

# Send to AcousticNet
response = requests.post(
    "YOUR_MODAL_ENDPOINT/inference",
    json={"audio_data": audio_data}
)

# Get the results
result = response.json()

# Print the top prediction
top_prediction = result['predictions'][0]
print(f"I think this sound is: {top_prediction['class']}")
print(f"Confidence: {top_prediction['confidence']:.1%}")
```

### Example Response

```json
{
  "predictions": [
    {
      "class": "dog",
      "confidence": 0.89
    },
    {
      "class": "cat", 
      "confidence": 0.07
    },
    {
      "class": "bird",
      "confidence": 0.04
    }
  ],
  "processing_time": "0.23 seconds",
  "audio_duration": "3.2 seconds"
}
```

## 🏗️ How It Works

### The Science Behind AcousticNet

1. **🎵 Audio Input**: You provide an audio file in any common format
2. **🔄 Preprocessing**: The system converts audio to a standard format
3. **📊 Spectrogram Creation**: Sound waves become visual patterns (like a fingerprint)
4. **🧠 Neural Network**: Our AI analyzes these patterns
5. **🎯 Classification**: Returns the most likely sound categories

### Model Architecture

```
Input Audio → Mel Spectrogram → CNN Layers → Residual Blocks → Classification
     ↓              ↓              ↓             ↓              ↓
   Raw sound    Visual pattern   Feature maps   Deep features   Predictions
```

**Technical Details:**
- **Input**: Mel spectrograms (128 frequency bands)
- **Architecture**: 4-layer CNN with ResNet-style residual connections
- **Training**: 2,000 audio samples across 50 categories
- **Augmentation**: Mixup technique for better generalization

## 📁 Project Structure

```
AcousticNet/
├── 📄 main.py           # API deployment and inference
├── 🏋️ train.py          # Model training script  
├── 🧠 model.py          # Neural network architecture
├── 📋 requirements.txt  # Python dependencies
├── 📖 README.md         # This documentation
└── 🎨 audio-cnn-visualization/  # Optional web interface
```

## ⚙️ Technical Specifications

### Model Configuration
- **Sample Rate**: 44.1 kHz (automatically adjusted)
- **Audio Length**: Variable (automatically handled)
- **Spectrogram**: 128 mel bands, 1024 FFT size
- **Model Size**: ~2.3M parameters
- **Inference Time**: ~200ms on GPU

### Training Details
- **Dataset**: ESC-50 (Environmental Sound Classification)
- **Training Samples**: 1,600 audio clips
- **Validation**: 400 audio clips  
- **Epochs**: 50 with early stopping
- **Optimizer**: AdamW with OneCycle learning rate
- **Hardware**: Modal A10G GPU

## 🛠️ Requirements

The project uses these main dependencies:

```txt
torch>=2.0.0          # Deep learning framework
torchaudio>=2.0.0     # Audio processing
librosa>=0.10.0       # Audio analysis
fastapi>=0.100.0      # Web API framework
modal>=0.50.0         # Cloud deployment
pandas>=1.5.0         # Data manipulation
numpy>=1.24.0         # Numerical computing
pydantic>=2.0.0       # Data validation
soundfile>=0.12.0     # Audio file I/O
```

## 📈 Model Performance

- **Accuracy**: ~85% on ESC-50 test set
- **Inference Speed**: 200ms average per audio clip
- **Memory Usage**: <1GB GPU memory
- **Supported Formats**: WAV

## 🚨 Known Limitations

- Works best with audio clips under 10 seconds
- Performance may vary with background noise
- Optimized for environmental sounds (not music or speech)
- Requires internet connection for Modal deployment

## 🤝 Support & Community

- 🐛 **Bug Reports**: [Create an issue](https://github.com/AbhayPrasad25/AcousticNet/issues)
- 💡 **Feature Requests**: [Start a discussion](https://github.com/AbhayPrasad25/AcousticNet/discussions)
- 📧 **Direct Contact**: [Email the maintainer](mailto:your-email@example.com)
- ⭐ **Star the repo** if you find it useful!

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **ESC-50 Dataset** creators for providing excellent training data
- **Modal Labs** for cloud infrastructure and GPU access
- **PyTorch Team** for the deep learning framework
- **Open Source Community** for tools and inspiration

---
