PazhamPazhutho? 🎯

Basic Details

Team Name: North Radiant

Team Members

Team Lead: John Savio Romy - Toc-H Institute of Science and Technology 

Member 2: Ealiyas Shaji - Toc-H Institute of Science and Technology

Project Description

An innovative tool that helps determine the ripeness of a banana with a fun touch.

The Problem (that doesn't exist)

People generally find it difficult to know how ripe a banana is.

The Solution (that nobody asked for)

this tool helps people determine how ripe a banana is with all sorts of devices.

**PazhamPazhutho** (Malayalam for "Is the fruit ripe?") is an intelligent web application that uses Google's Gemini AI to analyze banana images and determine their ripeness level with audio feedback.

![PazhamPazhutho Banner](https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)

## ✨ Features

### 🔍 **AI-Powered Analysis**
- **Advanced Image Recognition**: Utilizes Google Gemini 1.5 Flash model for accurate banana ripeness detection
- **Detailed Analysis**: Provides confidence scores and detailed descriptions of ripeness indicators
- **Multiple Ripeness Levels**: Identifies green/unripe, yellow/perfect, spotted/very ripe, and brown/overripe bananas

### 📱 **User-Friendly Interface**
- **Drag & Drop Support**: Simply drag banana images onto the upload area
- **Camera Integration**: Take photos directly using device camera
- **File Upload**: Upload existing images from device storage
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### 🔊 **Audio Feedback**
- **Voice Responses**: Hear audio feedback for each ripeness level
- **Mobile Optimized**: Proper audio handling for iOS and Android devices
- **Manual Controls**: Fallback audio button for devices with restrictions

### 🎨 **Beautiful Design**
- **Modern UI**: Clean, gradient-based design with smooth animations
- **Interactive Elements**: Hover effects, scaling animations, and visual feedback
- **Accessibility**: High contrast colors and clear visual hierarchy

## 🚀 Getting Started

### Prerequisites

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- Modern web browser with JavaScript enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/pazhampazhutho.git
   cd pazhampazhutho
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Building for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## 🛠️ Technology Stack

### **Frontend Framework**
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vite** - Fast build tool and development server

### **Styling & UI**
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Lucide React** - Beautiful, customizable SVG icons
- **CSS Animations** - Smooth transitions and micro-interactions

### **AI Integration**
- **Google Gemini AI** - Advanced multimodal AI for image analysis
- **REST API** - Direct integration with Gemini API endpoints

### **Audio System**
- **Web Audio API** - Native browser audio capabilities
- **HTML5 Audio** - Cross-platform audio playback
- **Mobile Optimization** - Proper handling of mobile browser restrictions

## 📁 Project Structure

```
pazhampazhutho/
├── public/
│   ├── vite.svg
│   └── index.html
├── src/
│   ├── components/          # Reusable React components
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   ├── index.css           # Global styles and Tailwind imports
│   └── vite-env.d.ts       # Vite type definitions
├── package.json            # Project dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite build configuration
└── README.md              # Project documentation
```

## 🔧 Configuration

### Environment Variables

The application uses Google Gemini AI API. The API key is currently embedded in the code for demo purposes. For production use, create a `.env` file:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### API Configuration

The app connects to Google's Generative Language API:
- **Endpoint**: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent`
- **Model**: Gemini 1.5 Flash
- **Features**: Multimodal image and text analysis

## 📱 Mobile Compatibility

### **iOS Safari**
- ✅ Image upload and camera access
- ✅ Audio playback with user interaction
- ✅ Responsive design and touch interactions

### **Android Chrome**
- ✅ Full feature compatibility
- ✅ Camera integration
- ✅ Audio feedback system

### **Progressive Web App Features**
- Responsive design for all screen sizes
- Touch-optimized interface
- Offline-capable (with service worker implementation)

## 🎯 Usage Guide

### **Step 1: Upload Your Banana**
- **Drag & Drop**: Drag a banana image onto the upload area
- **Camera**: Click "Take Photo" to use your device camera
- **File Upload**: Click "Upload Image" to select from your device

### **Step 2: AI Analysis**
- The app automatically analyzes your image using Google Gemini AI
- Analysis typically takes 2-5 seconds depending on image size

### **Step 3: View Results**
- **Ripeness Level**: See the determined ripeness category
- **Confidence Score**: View the AI's confidence percentage
- **Detailed Description**: Read analysis of visual ripeness indicators
- **Audio Feedback**: Listen to audio response (tap "Play Audio" if needed)

### **Ripeness Categories**

| Category | Description | Visual Indicators |
|----------|-------------|-------------------|
| 🟢 **Green/Unripe** | Not ready to eat | Bright green color, firm texture |
| 🟡 **Yellow/Perfect** | Ideal for eating | Golden yellow, minimal spots |
| 🟠 **Spotted/Very Ripe** | Sweet and soft | Yellow with brown spots |
| 🟤 **Brown/Overripe** | Past prime eating | Mostly brown, very soft |

## 🔊 Audio System

### **Audio Files**
The application uses three audio files for different ripeness levels:
- `unripe.mp3` - For green/unripe bananas
- `ripe.mp3` - For yellow/perfect bananas  
- `overripe.mp3` - For spotted/very ripe and brown/overripe bananas

### **Mobile Audio Handling**
- Audio context is initialized on first user interaction
- Fallback manual play button for restricted environments
- Proper error handling for unsupported devices

## 🤝 Contributing

We welcome contributions to PazhamPazhutho! Here's how you can help:

### **Development Setup**
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

### **Contribution Guidelines**
- Follow TypeScript best practices
- Maintain consistent code formatting
- Add tests for new features
- Update documentation as needed
- Ensure mobile compatibility

## 🐛 Troubleshooting

### **Common Issues**

**Audio not playing on mobile:**
- Ensure you've interacted with the page (tap upload buttons)
- Try the manual "Play Audio" button
- Check device volume and mute settings

**Image analysis fails:**
- Verify internet connection
- Ensure image is a valid format (JPEG, PNG, WebP)
- Try with a smaller image file (< 5MB recommended)

**Camera not working:**
- Grant camera permissions when prompted
- Ensure you're using HTTPS (required for camera access)
- Try refreshing the page and granting permissions again

### **Browser Compatibility**
- **Chrome/Edge**: Full support
- **Safari**: Full support (iOS 12+)
- **Firefox**: Full support
- **Internet Explorer**: Not supported


## 🙏 Acknowledgments

- **Google Gemini AI** - For providing the powerful image analysis capabilities
- **Tailwind CSS** - For the beautiful and responsive design system
- **Lucide React** - For the clean and consistent icon set
- **Vite & React** - For the modern development experience

## 📞 Support

If you encounter any issues or have questions:

1. **Check the Issues**: Look through existing GitHub issues
2. **Create New Issue**: Report bugs or request features
3. **Documentation**: Refer to this README for common solutions

---

Screenshots:

https://github.com/breadstalker/pazhampazutho/blob/main/Screenshot%202025-08-15%20074312.png

https://github.com/breadstalker/pazhampazutho/blob/main/Screenshot%202025-08-15%20074332.png

https://github.com/breadstalker/pazhampazutho/blob/main/Screenshot%202025-08-15%20074419.png

https://github.com/breadstalker/pazhampazutho/blob/main/WhatsApp%20Image%202025-08-15%20at%207.47.05%20AM%20(1).jpeg

https://github.com/breadstalker/pazhampazutho/blob/main/WhatsApp%20Image%202025-08-15%20at%207.47.05%20AM.jpeg

https://github.com/breadstalker/pazhampazutho/blob/main/WhatsApp%20Image%202025-08-15%20at%207.47.06%20AM.jpeg

Video:

https://drive.google.com/file/d/1KBIjDLquWoq9vrX5waqvQ5yEts9A6HSL/view?usp=drivesdk

*PazhamPazhutho - Because every banana deserves the perfect timing!*

Team Contributions
John Savio Romy: UI/UX designing and prototyping

Ealiyas Shaji: Fullstack development and API integration.

Made with ❤️ at TinkerHub Useless Projects

https://camo.githubusercontent.com/a6af2288021b3c8143967be1e96f69342202f4668d59699394553db0ab955edb/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f5573656c65737350726f6a656374732d2d32352d32353f6c696e6b3d68747470732533412532462532467777772e74696e6b65726875622e6f72672532466576656e74732532465132513154514b5836512532465573656c657373253235323050726f6a65637473
