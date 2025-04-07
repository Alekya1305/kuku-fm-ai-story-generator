import React, { useState, useEffect } from 'react';
import { 
  Headphones, BookOpen, Clock, TrendingUp, Heart, History, 
  Sparkles, Moon, Sun, Brain, Wand2, MessageSquare, Share2, 
  PlayCircle, PauseCircle, Volume2
} from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('discover');
  const [likedStories, setLikedStories] = useState<string[]>([]);
  const [currentMood, setCurrentMood] = useState<string>('energetic');
  const [isPlaying, setIsPlaying] = useState<number | null>(null);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [showAIInsights, setShowAIInsights] = useState(false);

  const moods = [
    { id: 'energetic', label: 'Energetic', icon: Sun },
    { id: 'calm', label: 'Calm', icon: Moon },
    { id: 'focused', label: 'Focused', icon: Brain },
  ];

  const recommendedStories = [
    {
      id: 1,
      title: "The Hidden Garden",
      duration: "23 min",
      category: "Fiction",
      thumbnail: "https://images.unsplash.com/photo-1585543805890-6051f7829f98?w=800&q=80",
      aiGenerated: true,
      mood: "calm",
      listens: 1234,
      completion: 85,
      description: "An AI-generated story about a mysterious garden that appears only at midnight.",
      aiInsights: "This story adapts to your reading preferences, with dynamic character development based on your previous interactions."
    },
    {
      id: 2,
      title: "Mindfulness Journey",
      duration: "15 min",
      category: "Self-Help",
      thumbnail: "https://images.unsplash.com/photo-1528716321680-815a8cdb8cbe?w=800&q=80",
      aiGenerated: false,
      mood: "focused",
      listens: 2341,
      completion: 0,
      description: "A guided meditation series that adapts to your stress levels and daily routine.",
      aiInsights: "Personalized breathing exercises and meditation techniques based on your historical engagement patterns."
    },
    {
      id: 3,
      title: "Tech Tales 2025",
      duration: "18 min",
      category: "Technology",
      thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
      aiGenerated: true,
      mood: "energetic",
      listens: 3456,
      completion: 45,
      description: "AI-generated stories about future technology, adapting to your interests in specific tech domains.",
      aiInsights: "Content dynamically updates based on trending tech topics and your engagement patterns."
    },
    {
      id: 4,
      title: "Quantum Dreams",
      duration: "25 min",
      category: "Sci-Fi",
      thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
      aiGenerated: true,
      mood: "energetic",
      listens: 5678,
      completion: 0,
      description: "An AI-crafted science fiction series that evolves based on collective user choices.",
      aiInsights: "Story branches adapt in real-time based on community preferences and your personal reading history."
    }
  ];

  useEffect(() => {
    if (isPlaying !== null) {
      const interval = setInterval(() => {
        setCurrentProgress(prev => (prev + 1) % 100);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const toggleLike = (storyId: number) => {
    setLikedStories(prev => 
      prev.includes(storyId.toString()) 
        ? prev.filter(id => id !== storyId.toString())
        : [...prev, storyId.toString()]
    );
  };

  const filteredStories = recommendedStories.filter(story => 
    activeTab === 'discover' || (activeTab === 'library' && story.completion > 0)
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-purple-700 text-white p-4 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Headphones className="w-8 h-8" />
            <h1 className="text-2xl font-bold">KUKU FM</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-purple-600 rounded-full">
              <History className="w-6 h-6" />
            </button>
            <button className="p-2 hover:bg-purple-600 rounded-full">
              <Heart className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* AI Feature Highlight */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 mb-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-16 -translate-y-8">
            <div className="absolute inset-0 bg-white opacity-10 rotate-45"></div>
          </div>
          <div className="relative z-10">
            <div className="flex items-center space-x-2 mb-2">
              <Sparkles className="w-6 h-6" />
              <h2 className="text-xl font-bold">AI Story Evolution</h2>
            </div>
            <p className="opacity-90">Stories that adapt and grow with your interests</p>
          </div>
        </div>

        {/* Mood Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">How are you feeling today?</h3>
          <div className="flex space-x-4">
            {moods.map(mood => {
              const Icon = mood.icon;
              return (
                <button
                  key={mood.id}
                  onClick={() => setCurrentMood(mood.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
                    currentMood === mood.id 
                      ? 'bg-purple-100 text-purple-700 scale-105' 
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{mood.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-6">
          <button 
            onClick={() => setActiveTab('discover')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
              activeTab === 'discover' ? 'bg-purple-100 text-purple-700' : 'text-gray-600'
            }`}
          >
            <TrendingUp className="w-5 h-5" />
            <span>Discover</span>
          </button>
          <button 
            onClick={() => setActiveTab('library')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
              activeTab === 'library' ? 'bg-purple-100 text-purple-700' : 'text-gray-600'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span>Library</span>
          </button>
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map(story => (
            <div key={story.id} className="bg-white rounded-xl shadow-sm overflow-hidden group">
              <div className="relative">
                <img 
                  src={story.thumbnail} 
                  alt={story.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {story.aiGenerated && (
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full flex items-center">
                      <Wand2 className="w-3 h-3 mr-1" />
                      AI Generated
                    </span>
                  </div>
                )}
                {story.completion > 0 && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                    <div 
                      className="h-full bg-purple-600"
                      style={{ width: `${story.completion}%` }}
                    ></div>
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{story.title}</h3>
                  <button 
                    onClick={() => toggleLike(story.id)}
                    className={`p-2 rounded-full transition-colors ${
                      likedStories.includes(story.id.toString()) 
                        ? 'text-red-500' 
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-3">{story.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{story.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Volume2 className="w-4 h-4" />
                    <span>{story.listens.toLocaleString()} listens</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => setIsPlaying(isPlaying === story.id ? null : story.id)}
                    className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-full text-sm hover:bg-purple-700 transition-colors"
                  >
                    {isPlaying === story.id ? (
                      <>
                        <PauseCircle className="w-4 h-4" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <PlayCircle className="w-4 h-4" />
                        <span>Play Now</span>
                      </>
                    )}
                  </button>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setShowAIInsights(story.id)}
                      className="p-2 rounded-full text-gray-400 hover:text-purple-600 transition-colors"
                    >
                      <Brain className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-full text-gray-400 hover:text-purple-600 transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                {showAIInsights === story.id && (
                  <div className="mt-4 p-3 bg-purple-50 rounded-lg text-sm text-purple-700">
                    <div className="flex items-center space-x-2 mb-2">
                      <Sparkles className="w-4 h-4" />
                      <span className="font-medium">AI Insights</span>
                    </div>
                    <p>{story.aiInsights}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Now Playing Bar (shows when a story is playing) */}
      {isPlaying !== null && (
        <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src={recommendedStories.find(s => s.id === isPlaying)?.thumbnail}
                alt="Now Playing"
                className="w-12 h-12 rounded object-cover"
              />
              <div>
                <h4 className="font-medium">{recommendedStories.find(s => s.id === isPlaying)?.title}</h4>
                <p className="text-sm text-gray-600">{recommendedStories.find(s => s.id === isPlaying)?.category}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-48 h-1 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-purple-600 rounded-full"
                  style={{ width: `${currentProgress}%` }}
                ></div>
              </div>
              <button 
                onClick={() => setIsPlaying(null)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <PauseCircle className="w-6 h-6 text-purple-600" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="container mx-auto flex justify-around">
          <button className="flex flex-col items-center text-purple-700">
            <TrendingUp className="w-6 h-6" />
            <span className="text-xs mt-1">Discover</span>
          </button>
          <button className="flex flex-col items-center text-gray-400">
            <BookOpen className="w-6 h-6" />
            <span className="text-xs mt-1">Library</span>
          </button>
          <button className="flex flex-col items-center text-gray-400">
            <MessageSquare className="w-6 h-6" />
            <span className="text-xs mt-1">Community</span>
          </button>
          <button className="flex flex-col items-center text-gray-400">
            <Heart className="w-6 h-6" />
            <span className="text-xs mt-1">Favorites</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default App;