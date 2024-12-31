import React, { useState } from 'react';
import { Upload, Youtube, FileText, AlertCircle, Loader2, Search } from 'lucide-react';
import { extractTextFromFile } from '@/app/services/extractText';


interface MillionaireUploadProps {
  onTranscriptFound: (transcript: string) => void;
  onFileUpload: (text: string, file: File) => void;

}
const MillionaireUpload: React.FC<MillionaireUploadProps> = ({ onTranscriptFound, onFileUpload }) => {
  const [processing, setProcessing] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [ytLoading, setYtLoading] = useState(false)
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setProcessing(false)

    try {
      const uploadedFiles = Array.from(event.target.files || []);
      const validFiles = uploadedFiles.filter(file => {
        const extension = file.name.split('.').pop()?.toLowerCase();
        return ['txt', 'pdf', 'doc', 'docx'].includes(extension || '');
      });

      if (validFiles.length === 0) {
        throw new Error('No valid files selected');
      }

      const file = validFiles[0];

      const text = await extractTextFromFile(file);
      onFileUpload(text, file)

      console.log('Extracted text:', text);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error processing file');
      console.log(error)
      console.error('File upload error:', err);
    } finally {
      setProcessing(false);
    }
  };


  const handleYoutubeLink = async () => {

    if (!videoUrl) return;

    setYtLoading(true);
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
        setYtLoading(false)
      } else {
        throw new Error(data.error || 'Failed to get transcript');
      }
    } catch (err) {
      console.error('Error fetching transcript:', err);
      // onError('Error fetching transcript')
    } finally {
      setYtLoading(false);
    }

  }

  return (
    <div className=" bg-white">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gray-900">Welcome to </span>
            <span className="text-blue-500">Millionaire Trivia</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Transform your study materials into an exciting quiz game. Upload your notes or a YouTube video to get started.
          </p>
        </div>

        {/* Upload Options */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* File Upload Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Upload Notes</h2>
              <p className="text-gray-600 text-sm mb-4">
                Upload your study materials directly from your device
              </p>
              <div className="relative">  {/* Add relative positioning */}

                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
                  <Upload className="w-5 h-5" />
                  Choose File

                </button>
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  accept=".txt,.pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  disabled={processing}
                />
              </div>
              <div className="mt-3 text-center">
                <span className="text-sm text-gray-500">
                  Accepted: TXT, PDF, DOC, DOCX
                </span>
              </div>
            </div>
          </div>

          {/* YouTube Upload Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                <Youtube className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-xl font-semibold mb-2">YouTube Video</h2>
              <p className="text-gray-600 text-sm mb-4">
                Convert any YouTube video into an interactive quiz
              </p>
              <div className="relative">
                <input
                  type="text"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="Paste YouTube URL here"
                  className="w-full border border-gray-200 rounded-xl py-3 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button onClick={handleYoutubeLink} className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-900 text-white p-2 rounded-lg hover:bg-gray-800 transition-colors">
                  {ytLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-12 bg-blue-50 rounded-xl p-6 max-w-3xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Quick Tips</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Upload clear, well-organized study materials for better results</li>
                <li>• For YouTube videos, ensure they are educational content</li>
                <li>• Maximum file size: 10MB</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MillionaireUpload;