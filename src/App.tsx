import React, { useState, useRef } from 'react';
import { Camera, Upload, Banana, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';

interface AnalysisResult {
  ripeness: string;
  confidence: number;
  description: string;
}

function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const analyzeImage = async (imageBase64: string) => {
    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAsyUMnls1LfXltlCn-rlk9sGKbG2XmPbU`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [
              {
                text: `Analyze this banana image and determine its ripeness level. Please respond in the following JSON format:
                {
                  "ripeness": "one of: green/unripe, yellow/perfect, spotted/very ripe, brown/overripe",
                  "confidence": "confidence percentage as number 0-100",
                  "description": "detailed description of the banana's appearance and ripeness indicators"
                }`
              },
              {
                inline_data: {
                  mime_type: imageBase64.startsWith('data:image/png') ? "image/png" : "image/jpeg",
                  data: imageBase64.split(',')[1]
                }
              }
            ]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        const resultText = data.candidates[0].content.parts[0].text;
        console.log('API Response:', resultText);
        
        // Extract JSON from the response
        const jsonMatch = resultText.match(/\{[\s\S]*?\}/);
        if (jsonMatch) {
          try {
            const parsedResult = JSON.parse(jsonMatch[0]);
            if (parsedResult.ripeness && parsedResult.confidence && parsedResult.description) {
              setResult(parsedResult);
              playAudioForRipeness(parsedResult.ripeness);
            } else {
              throw new Error('Invalid response format - missing required fields');
            }
          } catch (parseError) {
            console.error('Parse error:', parseError);
            throw new Error('Could not parse analysis result');
          }
        } else {
          console.error('No JSON found in response:', resultText);
          throw new Error('Could not find JSON in response');
        }
      } else if (data.error) {
        throw new Error(`API Error: ${data.error.message || 'Unknown API error'}`);
      } else {
        console.error('Unexpected API response structure:', data);
        throw new Error('No analysis result received from API');
      }
    } catch (err) {
      console.error('Analysis error:', err);
      if (err instanceof Error) {
        if (err.message.includes('fetch') || err.message.includes('NetworkError')) {
          setError('Network error. Please check your internet connection and try again.');
        } else if (err.message.includes('API')) {
          setError('API service error. Please try again in a moment.');
        } else {
          setError(err.message);
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const playAudioForRipeness = (ripeness: string) => {
    let audioUrl: string | null = null;
    
    if (ripeness.includes('green') || ripeness.includes('unripe')) {
      audioUrl = 'https://raw.githubusercontent.com/breadstalker/pazhampazutho/main/unripe.mp3';
    } else if (ripeness.includes('yellow') || ripeness.includes('perfect')) {
      audioUrl = 'https://raw.githubusercontent.com/breadstalker/pazhampazutho/main/ripe.mp3';
    } else if (ripeness.includes('spotted') || ripeness.includes('very ripe') || 
               ripeness.includes('brown') || ripeness.includes('overripe')) {
      audioUrl = 'https://raw.githubusercontent.com/breadstalker/pazhampazutho/main/overripe.mp3';
    }

    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.preload = 'auto';
      audio.volume = 0.7;
      audio.play().catch(error => {
        console.error('Audio playback failed:', error);
        // Fallback: try to play with user interaction
        document.addEventListener('click', () => {
          audio.play().catch(() => {
            console.log('Audio still failed after user interaction');
          });
        }, { once: true });
      });
    }
  };

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataUrl = e.target?.result as string;
        setSelectedImage(imageDataUrl);
        analyzeImage(imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const getRipenessColor = (ripeness: string) => {
    if (ripeness.includes('green') || ripeness.includes('unripe')) return 'text-green-600';
    if (ripeness.includes('yellow') || ripeness.includes('perfect')) return 'text-yellow-500';
    if (ripeness.includes('spotted') || ripeness.includes('very ripe')) return 'text-orange-500';
    if (ripeness.includes('brown') || ripeness.includes('overripe')) return 'text-amber-700';
    return 'text-yellow-500';
  };

  const getRipenessEmoji = (ripeness: string) => {
    if (ripeness.includes('green') || ripeness.includes('unripe')) return '🍌';
    if (ripeness.includes('yellow') || ripeness.includes('perfect')) return '🍌';
    if (ripeness.includes('spotted') || ripeness.includes('very ripe')) return '🍌';
    if (ripeness.includes('brown') || ripeness.includes('overripe')) return '🍌';
    return '🍌';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-yellow-100 to-green-200">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-6xl animate-bounce opacity-20">🍌</div>
        <div className="absolute top-40 right-20 text-4xl animate-pulse opacity-30">🍌</div>
        <div className="absolute bottom-32 left-20 text-5xl animate-bounce opacity-25" style={{ animationDelay: '1s' }}>🍌</div>
        <div className="absolute bottom-20 right-10 text-3xl animate-pulse opacity-20" style={{ animationDelay: '2s' }}>🍌</div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Banana className="h-12 w-12 text-yellow-600 animate-pulse" />
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-green-600">
              PazhamPazhutho
            </h1>
            <Banana className="h-12 w-12 text-yellow-600 animate-pulse" />
          </div>
          <p className="text-xl text-gray-700 font-medium">
            Lets analyze your BANANAAAAA! 🔥
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div className="space-y-6">
              <div 
                className="border-4 border-dashed border-yellow-400 rounded-3xl p-8 text-center bg-white/70 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 hover:border-yellow-500 hover:shadow-lg hover:scale-105"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <div className="space-y-4">
                  <div className="text-8xl animate-bounce">🍌</div>
                  <h3 className="text-2xl font-bold text-gray-800">Drop Your Banana Here!</h3>
                  <p className="text-gray-600">Or click the buttons below to select</p>
                </div>
              </div>

              {/* Upload Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => cameraInputRef.current?.click()}
                  className="flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-2xl font-semibold hover:from-yellow-600 hover:to-yellow-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Camera className="h-6 w-6" />
                  Take Photo
                </button>
                
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl font-semibold hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Upload className="h-6 w-6" />
                  Upload Image
                </button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                className="hidden"
              />
              
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                className="hidden"
              />
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {/* Image Preview */}
              {selectedImage && (
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Your Banana</h3>
                  <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
                    <img 
                      src={selectedImage} 
                      alt="Uploaded banana" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Loading State */}
              {isAnalyzing && (
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg text-center">
                  <RefreshCw className="h-12 w-12 text-yellow-500 animate-spin mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Analyzing Your Banana...</h3>
                  <p className="text-gray-600">Our AI is checking the ripeness level! 🤖</p>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="bg-red-50/80 backdrop-blur-sm border-2 border-red-200 rounded-3xl p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <AlertCircle className="h-8 w-8 text-red-500" />
                    <h3 className="text-xl font-bold text-red-800">Oops!</h3>
                  </div>
                  <p className="text-red-700">{error}</p>
                </div>
              )}

              {/* Results */}
              {result && !isAnalyzing && (
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border-2 border-yellow-200">
                  <div className="text-center mb-6">
                    <div className="text-6xl mb-3">{getRipenessEmoji(result.ripeness)}</div>
                    <h3 className={`text-3xl font-bold ${getRipenessColor(result.ripeness)} capitalize`}>
                      {result.ripeness}
                    </h3>
                    <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                      <p className="text-lg font-semibold text-gray-800 mb-2">
                        Confidence: {result.confidence}%
                      </p>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {result.description}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;