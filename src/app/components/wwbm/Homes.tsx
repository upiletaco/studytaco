import { useState } from "react";
import { UploadedFile, WwbmHomeScreenProps, WwbmQuestion } from "@/app/util/wwbm.types";
import FileDisplay from "./FileDisplay";
import GenerateButton from "./GenerateButton";
import LoadingText from "../loadingText";
import DiscoverGames from "./DiscoverGames";
import MillionaireUpload from "./MillionaireUpload";
import UserGames from "./YourGames";
import Navbar from "../Navbar";

const WwbmHomePage: React.FC<WwbmHomeScreenProps> = ({ onQuestionsGenerated }) => {
    const [files, setFiles] = useState<UploadedFile[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [extractedText, setExtractedText] = useState<string>('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [transcriptFound, setTranscriptFound] = useState(false);
    const [generatedQuestions, setGeneratedQuestions] = useState<WwbmQuestion[] | null>(null)

    const handleFileUpload = (text: string, file: File) => {
        setExtractedText(text);
        setFiles([file])
        console.log("I got the file")
    };

    const generateQuestions = async () => {
        if (!extractedText) {
            setError('Please upload a file first');
            return;
        }
        console.log(error)

        setIsGenerating(true);
        setIsProcessing(true)
        setError(null);

        try {

            // const service = new QuestionGeneratorService();
            // const result = await service.generateQuestions(extractedText);
            console.log("getting generate clues in home screen")
            const response = await fetch('/api/wwbm/generateQuestions', {
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


            setGeneratedQuestions(data.questions.questions);
            console.log(generatedQuestions)


            console.log("Categories to convert to json of type " + typeof (data.questions))
            const title = data.title
            onQuestionsGenerated(data.questions.questions, title, extractedText);

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error generating questions');
            console.error('Question generation error:', err);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleTranscriptFound = (transcript: string) => {
        setExtractedText(transcript);
        setTranscriptFound(true);
        setFiles([])
    };


    return (
        <div className="min-h-screen bg-white flex items-center justify-center relative w-full">

            <div className="max-w-7xl w-full p-8">
                <div className="flex flex-col items-center">

                    <Navbar instructions="millionaire" />


                    <MillionaireUpload onFileUpload={handleFileUpload} onTranscriptFound={handleTranscriptFound} />


                    {(files.length > 0 || transcriptFound) && (
                        <div className="max-w-3xl mx-auto w-full space-y-6">
                            <FileDisplay
                                files={files}
                                transcriptFound={transcriptFound}
                            />
                            <GenerateButton
                                isProcessing={isProcessing}
                                isGenerating={isGenerating}
                                onGenerate={generateQuestions}
                            />
                            <LoadingText isVisible={isGenerating || isProcessing} />
                        </div>
                    )}
                </div>

                <UserGames />

                <DiscoverGames />

            </div>
        </div>
    );
};

export default WwbmHomePage