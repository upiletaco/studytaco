import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface YoutubeInputProps {
    onTranscriptFound: (transcript: string) => void;
    onError: (error: string) => void

}
const YoutubeInput: React.FC<YoutubeInputProps> = ({ onTranscriptFound, onError}) => {
  const [videoUrl, setVideoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!videoUrl) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/youtube-transcript', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ videoUrl }),
      });

      const data = await response.json();
      
      if (response.ok) {
        onTranscriptFound(data.transcript);
      } else {
        throw new Error(data.error || 'Failed to get transcript');
      }
    } catch (err) {
      console.error('Error fetching transcript:', err);
      onError('Error fetching transcript')
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <h2 className="text-[#FFCC00] font-bold text-xl mb-4 text-center uppercase tracking-wide drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
        Or Upload YouTube Link
      </h2>
      
      <div className="flex gap-2">
        <input
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="Paste YouTube URL here"
          className="flex-1 px-4 py-2 rounded-lg 
            bg-[#000080] text-[#FFCC00] 
            placeholder-[#FFCC00]/50 
            border-2 border-[#FFCC00]
            focus:outline-none focus:ring-2 
            focus:ring-[#FFCC00]"
        />
        <button
          onClick={handleSubmit}
          disabled={isLoading || !videoUrl}
          className={`
            px-4 py-2 
            bg-[#FFCC00] 
            hover:bg-[#FFD700] 
            text-[#000080] 
            rounded-lg
            transition duration-200 
            font-bold
            disabled:opacity-50 
            disabled:cursor-not-allowed
            shadow-lg`}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </div>
      
      {/* {transcriptFound && (
        <p className="mt-2 text-[#FFCC00] font-bold text-center drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
          Transcript found! Ready to generate questions.
        </p>
      )} */}
    </div>
  );
};

export default YoutubeInput;