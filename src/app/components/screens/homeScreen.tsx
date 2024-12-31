import { Category, JeopardyData, Question, AIJeopardyProps } from '@/app/data/sampleBoardData';
import React, { useState } from 'react';
import { extractTextFromFile } from '../../services/extractText';
import LoadingText from '../loadingText';
import DiscoverBoards from '../discoverBoards';
import posthog from 'posthog-js';
import HowToPlayModal from '../modals/instructionsModal';
import YoutubeInput from '../YoutubeInput';
import HeaderBar from '../HeaderBar';

interface UploadedFile extends File {
    content?: string;
}

const HomeScreen: React.FC<AIJeopardyProps> = ({ onJeopardyDataGenerated }) => {
    const [files, setFiles] = useState<UploadedFile[]>([]);
    const [isHovering, setIsHovering] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [extractedText, setExtractedText] = useState<string>('');
    const [generatedQuestions, setGeneratedQuestions] = useState<string>('');

    const [isGenerating, setIsGenerating] = useState(false);
    // const [jeopardyValues, setJeopardyValues] = useState<JeopardyData>();
    const [transcriptFound, setTranscriptFound] = useState(false);


    const handleTranscriptFound = (transcript: string) => {
        setExtractedText(transcript);
        setTranscriptFound(true);
        setFiles([])
    };

    const handleTranscriptError = (error: string) => {
        setExtractedText('')
        setError(error)
    }

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setIsProcessing(true);

        try {
            const uploadedFiles = Array.from(event.target.files || []);
            const validFiles = uploadedFiles.filter(file => {
                const extension = file.name.split('.').pop()?.toLowerCase();
                return ['txt', 'pdf', 'doc', 'docx'].includes(extension || '');
            });


            if (validFiles.length === 0) {
                throw new Error('No valid files selected');
            }

            // Process only the first file
            const file = validFiles[0];

            const text = await extractTextFromFile(file);
            setExtractedText(text);
            setFiles([file]); // Store only the current file

            console.log('Extracted text:', text); // For debugging

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error processing file');
            console.error('File upload error:', err);
        } finally {
            setIsProcessing(false);
        }
    };

    const generateQuestions = async () => {
        if (!extractedText) {
            setError('Please upload a file first');
            return;
        }

        setIsGenerating(true);
        setError(null);

        try {

            // const service = new QuestionGeneratorService();
            // const result = await service.generateQuestions(extractedText);
            console.log("getting generate clues in home screen")
            const response = await fetch('/api/generate-clues', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: extractedText }),
            });

            console.log("Response: ")
            console.log(response)

            const data = await response.json();
            console.log(data.questions)


            if (!response.ok) {
                console.log("Response is not ok")
                throw new Error(data.error || 'Failed to generate questions');
            }


            setGeneratedQuestions(data.questions);



            console.log("Categories to convert to json of type " + typeof (data.questions))
            const jeopardyData = parseJeopardyString(data.questions)
            const title = data.title
            console.log("JeopardyData: ")
            console.log(jeopardyData)
            // setJeopardyValues(jeopardyData)

            onJeopardyDataGenerated(jeopardyData, title);
            console.log(`jeopardy values: of type ${typeof jeopardyData}`)
            console.log(jeopardyData)

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error generating questions');
            console.error('Question generation error:', err);
        } finally {
            setIsGenerating(false);
        }
    };


    function parseJeopardyString(jsonString: string): JeopardyData {
        try {
            // First, clean the string by removing any escape characters
            const cleanedString = jsonString
                .replace(/\\n/g, '') // Remove newline characters
                .replace(/\\"/g, '"') // Replace escaped quotes with regular quotes
                .replace(/^\"|\"$/g, ''); // Remove leading/trailing quotes if they exist

            // Parse the cleaned string to JSON
            const parsedJson = JSON.parse(cleanedString);

            // Map the parsed JSON to your interfaces
            const jeopardyData: JeopardyData = {
                categories: parsedJson.categories.map((cat: Category): Category => ({
                    category: cat.category,
                    questions: cat.questions.map((q: Question): Question => ({
                        points: Number(q.points), // Ensure points is a number
                        clue: String(q.clue),
                        answer: String(q.answer)
                    }))
                }))
            };

            return jeopardyData;
        } catch (error) {
            console.error('Parsing error:', error);
            throw new Error(`Failed to parse Jeopardy data: ${error}`);
        }
    }


    return (

        <div className="min-h-screen bg-[#060CE9] flex items-center justify-center relative">


            {/* <div className="absolute flex top-4 right-4"> 
                <UserMenu />


            </div>
            <div className="absolute flex top-4 left-4"> 
                <StreakCounter />

            </div> */}

            <div className="max-w-6xl w-full px-8 py-4">

                {/* <div className="absolute top-0 left-0 right-0 p-2">
                    <div className="max-w-7xl mx-auto flex justify-between">
                        <div className="z-10 flex items-center">
                            <StreakCounter />
                        </div>

                        <div className="z-10 flex items-center">
                            <UserMenu />
                        </div>
                    </div>
                </div> */}
                <HeaderBar/>

                <div className="flex flex-col items-center ">
                <h1 className="text-3xl font-bold text-center text-[#FFCC00] 
            tracking-wider uppercase drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
            font-serif mt-14 mb-4">
                        AI Jeopardy!
                    </h1>


                    <label
                        className={`mb-4
              bg-gradient-to-b from-[#DAA520] to-[#B8860B]
              hover:from-[#FFD700] hover:to-[#DAA520]
              text-white px-6 py-3 rounded-lg cursor-pointer
              font-bold text-xl tracking-wide
              transition duration-200 transform
              ${isHovering ? 'scale-105' : 'scale-100'}
              ${isProcessing ? 'opacity-50 cursor-wait' : ''}
              shadow-lg
            `}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        {isProcessing ? 'Processing...' : 'Upload Your Notes'}
                        <input
                            type="file"
                            className="hidden"
                            onClick={() => posthog.capture('user clicks upload notes')}
                            accept=".txt,.pdf,.docx"
                            onChange={handleFileUpload}
                            disabled={isProcessing}
                        />
                    </label>

                    <p className="text-[#FFCC00] font-semibold mb-8">
                        Accepted: TXT, PDF, DOC, DOCX
                    </p>

                    <YoutubeInput onTranscriptFound={handleTranscriptFound} onError={handleTranscriptError} />


                    <HowToPlayModal />



                    {error && (
                        <div className="w-full bg-red-500 text-white p-4 rounded-lg">
                            {error}
                        </div>
                    )}

                    {(files.length > 0 || transcriptFound) && (
                        <div className="w-full space-y-6 text-center">
                            <div className="bg-[#000080] border-2 border-[#FFCC00] rounded-lg p-6">




                                {files.length > 0 ? (<h2 className="text-[#FFCC00] font-bold text-xl mb-4">
                                    Uploaded File:
                                </h2>) : (<h2 className="text-[#FFCC00] font-bold text-xl mb-4">
                                    Uploaded Youtube Video:
                                </h2>)}
                                {files.length > 0 ? (<div className="text-[#FFCC00] font-semibold">

                                    {files[0].name}
                                </div>) : (<div className="text-[#FFCC00] font-semibold">

                                    {'Transcript found'}
                                </div>)}


                                {/* {extractedText && (
                                    <div className="mt-4">
                                        <h3 className="text-[#FFCC00] font-bold mb-2">Extracted Text:</h3>
                                        <div className="bg-white/10 p-4 rounded-lg text-white text-sm max-h-60 overflow-y-auto">
                                            <pre className="whitespace-pre-wrap font-mono">
                                                {extractedText}
                                            </pre>
                                        </div>
                                    </div>
                                )} */}


                                {generatedQuestions && (
                                    <div className="mt-6">
                                        <h3 className="text-[#FFCC00] font-bold mb-2">Generated Questions:</h3>
                                        <div className="bg-white/10 p-4 rounded-lg text-white text-sm max-h-96 overflow-y-auto">
                                            <pre className="whitespace-pre-wrap font-mono">
                                                {generatedQuestions}
                                            </pre>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* <button
                className={`
                  w-full bg-[#FFCC00] hover:bg-[#FFD700] 
                  text-[#000080] font-bold text-xl py-4 rounded-lg
                  transition duration-200 transform hover:scale-105
                  shadow-lg uppercase tracking-wide
                  ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
                `}
                disabled={isProcessing}
              >
                Generate Jeopardy Board
              </button> */}

                            <button
                                className={`
                  w-full bg-[#FFCC00] hover:bg-[#FFD700] 
                  text-[#000080] font-bold text-xl py-4 rounded-lg
                  transition duration-200 transform hover:scale-105
                  shadow-lg uppercase tracking-wide
                  ${(isProcessing || isGenerating) ? 'opacity-50 cursor-not-allowed' : ''}
                `}
                                disabled={isProcessing || isGenerating}
                                onClick={generateQuestions}
                            >
                                {isGenerating ? 'Generating Questions...' : 'Generate Jeopardy Board'}
                            </button>
                        </div>
                    )


                    }

                    {/* {generatedQuestions != "" && (
                        <button
                            className={`
   w-full bg-[#FFCC00] hover:bg-[#FFD700] 
   text-[#000080] font-bold text-xl py-4 rounded-lg
   transition duration-200 transform hover:scale-105
   shadow-lg uppercase tracking-wide
   ${(isProcessing || isGenerating) ? 'opacity-50 cursor-not-allowed' : ''}
 `}
                            disabled={isProcessing || isGenerating}
                            onClick={generateQuestions}
                        >
                            {isGenerating ? 'Generating Questions...' : 'Generate Jeopardy Board'}
                        </button>


                    )} */}
                    <LoadingText isVisible={isGenerating || isProcessing} />

                    <h2 className='relative px-16 py-8 text-[#FFCC00] font-semibold text-center'>AI Jeopardy is built by Taco Learn. Education should be fun, so we are building products to turn your learning into games.</h2>

                </div>
                <DiscoverBoards />
            </div>
        </div>
    );
};

export default HomeScreen;