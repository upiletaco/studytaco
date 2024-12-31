import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/router';
import Modal from '../modals/modalTemplate';
import { EditScreenProps, ValidationErrors, WwbmQuestion } from '@/app/util/wwbm.types';
import WWbmEditableHeader from './WwbmEditableHeader';

const EditMillionaire: React.FC<EditScreenProps> = ({ wwbmQuestions: initialQuestions, title: initialTitle }) => {
    const router = useRouter();
    const [questions, setQuestions] = useState<WwbmQuestion[]>(initialQuestions);
    const [title, setTitle] = useState<string>(initialTitle);
    const [isPreviewMode, setIsPreviewMode] = useState(true);
    const [selectedQuestion, setSelectedQuestion] = useState<WwbmQuestion | null>(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
    const [handlingSave, setHandlingSave] = useState<boolean>(false);

    const validateQuiz = (): boolean => {
        const errors: ValidationErrors = {};
        
        if (!title?.trim()) {
            errors['title'] = ["Title cannot be empty"];
        }

        questions.forEach((question, index) => {
            const questionErrors: string[] = [];
            
            if (!question.question.trim()) {
                questionErrors.push('Question cannot be empty');
            }
            if (question.content.length !== 4) {
                questionErrors.push('Must have exactly 4 answer options');
            }
            if (!question.correct.trim()) {
                questionErrors.push('Must specify correct answer');
            }
            if (!question.content.includes(question.correct)) {
                questionErrors.push(`Correct answer must be one of the options: ${question.correct} is not present`);
            }

            if (questionErrors.length > 0) {
                errors[`question-${index}`] = questionErrors;
            }
        });

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleQuestionChange = (
        questionIndex: number,
        field: 'question' | 'correct',
        value: string
    ) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex] = {
            ...newQuestions[questionIndex],
            [field]: value
        };
        setQuestions(newQuestions);
    };

    const handleOptionChange = (
        questionIndex: number,
        optionIndex: number,
        value: string
    ) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex] = {
            ...newQuestions[questionIndex],
            content: newQuestions[questionIndex].content.map((opt, idx) =>
                idx === optionIndex ? value : opt
            )
        };
        setQuestions(newQuestions);
    };

    const handleFinishEditing = async () => {
        if (validateQuiz()) {
            setHandlingSave(true);
            try {
                const response = await fetch('/api/wwbm/saveGame', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        questions: questions ,
                        title,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to save quiz');
                }

                const { id } = await response.json();
                const urlTitle = title.replaceAll(" ", "-");
                router.push(`/millionaire/play/${urlTitle}/${id}`);
            } catch (error) {
                console.error('Error saving quiz:', error);
            } finally {
                setHandlingSave(false);
            }
        } else {
            console.log("Invalid quiz")
            console.log(validationErrors)
        }
        
    };

    const handleCardClick = (question: WwbmQuestion) => {
        if (isPreviewMode) {
            setSelectedQuestion(question);
            setShowAnswer(false);
        }
    };

    const handleCloseModal = () => {
        setSelectedQuestion(null);
        setShowAnswer(false);
    };

    const renderErrorMessages = (errors: string[]) => {
        if (errors.length === 0) return null;

        return (
            <div className="mt-1">
                {errors.map((error, index) => (
                    <p key={index} className="text-red-500 text-xs">
                        {error}
                    </p>
                ))}
            </div>
        );
    };

    // return (
    //     <div className="min-h-screen bg-gray-50 p-6 sm:p-8">
    //         <div className="w-full max-w-3xl mx-auto">
    //             {/* Header Section */}
    //             <div className="flex flex-col sm:flex-row items-center sm:items-start mb-8">
    //                 <h1 className="text-3xl sm:text-5xl font-bold text-center sm:text-left text-black
    //                     tracking-wider uppercase mb-4">
    //                     {isPreviewMode ? 'Preview Quiz' : 'Edit Quiz'}
    //                 </h1>

    //                 {/* Action Buttons */}
    //                 <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center sm:justify-end">
    //                     <button
    //                         className="flex-1 sm:flex-initial bg-orange-500 text-black px-6 py-3 
    //                             rounded-lg font-bold hover:bg-orange-600 transition duration-200"
    //                         onClick={() => setIsPreviewMode(!isPreviewMode)}
    //                     >
    //                         {isPreviewMode ? 'Edit' : 'Preview'}
    //                     </button>
    //                     <button
    //                         className="flex-1 sm:flex-initial bg-green-500 text-black px-6 py-3 
    //                             rounded-lg font-bold hover:bg-green-600 transition duration-200"
    //                         onClick={handleFinishEditing}
    //                     >
    //                         {handlingSave ? (
    //                             <Loader2 size={20} className="animate-spin" />
    //                         ) : (
    //                             'Save & Play'
    //                         )}
    //                     </button>
    //                 </div>
    //             </div>

    //             {/* Title Section */}
    //             <div className="mb-8">
    //                 {isPreviewMode ? (
    //                     <h2 className="text-2xl sm:text-4xl font-bold text-black tracking-wider text-center">
    //                         {title}
    //                     </h2>
    //                 ) : (
    //                     <WWbmEditableHeader text={title} onTextChange={setTitle} />
    //                 )}
    //             </div>

    //             {/* Questions Section */}
    //             <div className="space-y-6">
    //                 {questions.map((question, questionIndex) => (
    //                     <div key={questionIndex} className="bg-black rounded-lg p-4 shadow-lg">
    //                         {isPreviewMode ? (
    //                             <div
    //                                 onClick={() => handleCardClick(question)}
    //                                 className="cursor-pointer  p-4 rounded transition"
    //                             >
    //                                 <h3 className="font-bold text-lg mb-4">{question.question}</h3>
    //                                 <div className="grid grid-cols-2 gap-4">
    //                                     {question.content.map((option, optionIndex) => (
    //                                         <div
    //                                             key={optionIndex}
    //                                             className="border rounded p-2 text-center hover:bg-purple-500"
    //                                         >
    //                                             {option}
    //                                         </div>
    //                                     ))}
    //                                 </div>
    //                             </div>
    //                         ) : (
    //                             <div className="space-y-4">
    //                                 <div>
    //                                     <label className="block text-sm font-bold mb-2">Question</label>
    //                                     <input
    //                                         type="text"
    //                                         value={question.question}
    //                                         onChange={(e) => handleQuestionChange(questionIndex, 'question', e.target.value)}
    //                                         className="w-full border rounded p-2 text-black"
    //                                     />
    //                                 </div>
                                    
    //                                 <div className="grid grid-cols-2 gap-4">
    //                                     {question.content.map((option, optionIndex) => (
    //                                         <div key={optionIndex}>
    //                                             <label className="block text-sm font-bold mb-2">
    //                                                 Option {optionIndex + 1}
    //                                             </label>
    //                                             <input
    //                                                 type="text"
    //                                                 value={option}
    //                                                 onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
    //                                                 className="w-full border rounded p-2 text-black"
    //                                             />
    //                                         </div>
    //                                     ))}
    //                                 </div>

    //                                 <div>
    //                                     <label className="block text-sm font-bold mb-2">Correct Answer</label>
    //                                     <select
    //                                         value={question.correct}
    //                                         onChange={(e) => handleQuestionChange(questionIndex, 'correct', e.target.value)}
    //                                         className="w-full border rounded p-2 text-black"
    //                                     >
    //                                         <option value="">Select correct answer</option>
    //                                         {question.content.map((option, idx) => (
    //                                             <option key={idx} value={option}>
    //                                                 {option}
    //                                             </option>
    //                                         ))}
    //                                     </select>
    //                                 </div>
    //                                 {renderErrorMessages(validationErrors[`question-${questionIndex}`] || [])}
    //                             </div>
    //                         )}
    //                     </div>
    //                 ))}
    //             </div>

    //             {/* Preview Modal */}
    //             <Modal isOpen={!!selectedQuestion} onClose={handleCloseModal}>
    //                 {selectedQuestion && (
    //                     <div className="text-gray-800">
    //                         <h3 className="text-xl font-bold mb-6">{selectedQuestion.question}</h3>
    //                         <div className="grid grid-cols-2 gap-4 mb-6">
    //                             {selectedQuestion.content.map((option, index) => (
    //                                 <div
    //                                     key={index}
    //                                     className={`border rounded p-3 text-center ${
    //                                         showAnswer && option === selectedQuestion.correct
    //                                             ? 'bg-green-100 border-green-500'
    //                                             : ''
    //                                     }`}
    //                                 >
    //                                     {option}
    //                                 </div>
    //                             ))}
    //                         </div>
    //                         <div className="flex justify-center gap-4">
    //                             <button
    //                                 onClick={() => setShowAnswer(true)}
    //                                 className="bg-blue-500 text-white px-6 py-2 rounded-lg 
    //                                     font-bold hover:bg-blue-600 transition duration-200"
    //                             >
    //                                 Show Answer
    //                             </button>
    //                             <button
    //                                 onClick={handleCloseModal}
    //                                 className="bg-gray-500 text-white px-6 py-2 rounded-lg 
    //                                     font-bold hover:bg-gray-600 transition duration-200"
    //                             >
    //                                 Close
    //                             </button>
    //                         </div>
    //                     </div>
    //                 )}
    //             </Modal>
    //         </div>
    //     </div>
    // );
    return (
        <div className="min-h-screen bg-white p-6 sm:p-8">
            <div className="w-full max-w-3xl mx-auto">
                {/* Header Section with updated styling */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        {isPreviewMode ? 'Preview Quiz' : 'Edit Quiz'}
                    </h1>

                    {/* Action Buttons with updated styling */}
                    <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center sm:justify-end">
                        <button
                            className="flex-1 sm:flex-initial bg-white hover:bg-gray-50 text-gray-900 px-6 py-3 
                                rounded-xl font-semibold border border-gray-200 transition-all duration-200"
                            onClick={() => setIsPreviewMode(!isPreviewMode)}
                        >
                            {isPreviewMode ? 'Edit' : 'Preview'}
                        </button>
                        <button
                            className="flex-1 sm:flex-initial bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 
                                rounded-xl font-semibold transition-all duration-200 flex items-center justify-center"
                            onClick={handleFinishEditing}
                        >
                            {handlingSave ? (
                                <Loader2 size={20} className="animate-spin" />
                            ) : (
                                'Save & Play'
                            )}
                        </button>
                    </div>
                </div>

                {/* Title Section with updated styling */}
                <div className="mb-8">
                    {isPreviewMode ? (
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center">
                            {title}
                        </h2>
                    ) : (
                        <WWbmEditableHeader text={title} onTextChange={setTitle} />
                    )}
                </div>

                {/* Questions Section with updated styling */}
                <div className="space-y-6">
                    {questions.map((question, questionIndex) => (
                        <div key={questionIndex} className="rounded-[48px] p-6 bg-gradient-to-tr from-blue-50 via-white to-orange-50 overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-300/20 via-transparent to-orange-300/20" />
                            <div className="relative z-10">
                                {isPreviewMode ? (
                                    <div
                                        onClick={() => handleCardClick(question)}
                                        className="cursor-pointer"
                                    >
                                        <h3 className="text-xl font-semibold text-gray-900 text-center mb-4">{question.question}</h3>
                                        <div className="flex flex-col gap-3">
                                            {question.content.map((option, optionIndex) => (
                                                <button
                                                    key={optionIndex}
                                                    className="bg-white px-6 py-4 mx-4 rounded-full text-center border-2 border-blue-100 
                                                        hover:border-blue-200 transition-all duration-200"
                                                >
                                                    <p className="mr-2 ml-6 text-blue-900 font-semibold">
                                                        {option}
                                                    </p>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Question</label>
                                            <input
                                                type="text"
                                                value={question.question}
                                                onChange={(e) => handleQuestionChange(questionIndex, 'question', e.target.value)}
                                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 
                                                    focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            />
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-4">
                                            {question.content.map((option, optionIndex) => (
                                                <div key={optionIndex}>
                                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                        Option {optionIndex + 1}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={option}
                                                        onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                                                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 
                                                            focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Correct Answer</label>
                                            <select
                                                value={question.correct}
                                                onChange={(e) => handleQuestionChange(questionIndex, 'correct', e.target.value)}
                                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 
                                                    focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            >
                                                <option value="">Select correct answer</option>
                                                {question.content.map((option, idx) => (
                                                    <option key={idx} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        {renderErrorMessages(validationErrors[`question-${questionIndex}`] || [])}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Preview Modal with updated styling */}
                <Modal isOpen={!!selectedQuestion} onClose={handleCloseModal}>
                    {selectedQuestion && (
                        <div className="bg-white rounded-[48px] p-6">
                            <h3 className="text-xl font-semibold text-gray-900 text-center mb-6">{selectedQuestion.question}</h3>
                            <div className="flex flex-col gap-3 mb-6">
                                {selectedQuestion.content.map((option, index) => (
                                    <button
                                        key={index}
                                        className={`bg-white px-6 py-4 mx-4 rounded-full text-center border-2 
                                            ${showAnswer && option === selectedQuestion.correct
                                                ? 'border-green-400 bg-green-50'
                                                : 'border-blue-100'
                                            } transition-all duration-200`}
                                    >
                                        <p className="mr-2 ml-6 text-blue-900 font-semibold">
                                            {option}
                                        </p>
                                    </button>
                                ))}
                            </div>
                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={() => setShowAnswer(true)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 
                                        rounded-xl font-semibold transition-all duration-200"
                                >
                                    Show Answer
                                </button>
                                <button
                                    onClick={handleCloseModal}
                                    className="bg-white hover:bg-gray-50 text-gray-900 px-6 py-3 
                                        rounded-xl font-semibold border border-gray-200 transition-all duration-200"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                </Modal>
            </div>
        </div>
    );
};

export default EditMillionaire;