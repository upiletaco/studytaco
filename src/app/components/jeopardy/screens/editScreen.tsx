import React, { useState } from 'react';
import { Category, EditableGameBoardProps, Question, ValidationErrors } from '../../../data/sampleBoardData';
import { Loader2, SendHorizonal } from 'lucide-react';
import { useRouter } from 'next/router';
import Modal from '../modals/modalTemplate';
import EditableHeader from '../editableHeader';


const EditScreen: React.FC<EditableGameBoardProps> = ({ categories: initialCategories, title: initialTitle }) => {
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>(initialCategories);
    const [title, setTitle] = useState<string>(initialTitle)
    const [isPreviewMode, setIsPreviewMode] = useState(true);
    const [selectedClue, setSelectedClue] = useState<Question | null>(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
    const cols = initialCategories.length;
    const [showTooltip, setShowTooltip] = useState(false);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [email, setEmail] = useState<string>("");
    const [emailError, setEmailError] = useState<string | null>(null);
    const [handlingEmail, setHandlingEmail] = useState<boolean>(false);
    const [handlingSave, setHandlingSave] = useState<boolean>(false);
    const validateBoard = (): boolean => {
        const errors: ValidationErrors = {};
        if(title == null){
            errors['title'] = ["Title cannot be null"];
        }
        categories.forEach((category, categoryIndex) => {
            if (!category.category.trim()) {
                errors[`category-${categoryIndex}`] = ['Category name cannot be empty'];
            }

            category.questions.forEach((question, questionIndex) => {
                const questionErrors: string[] = [];
                if (!question.points || question.points <= 0) {
                    questionErrors.push('Points must be a positive number');
                }
                if (!question.clue.trim()) {
                    questionErrors.push('Clue cannot be empty');
                }
                if (!question.answer.trim()) {
                    questionErrors.push('Answer cannot be empty');
                }

                if (questionErrors.length > 0) {
                    errors[`question-${categoryIndex}-${questionIndex}`] = questionErrors;
                }
            });
        });

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleCategoryChange = (categoryIndex: number, newValue: string) => {
        const newCategories = [...categories];
        newCategories[categoryIndex] = {
            ...newCategories[categoryIndex],
            category: newValue
        };
        setCategories(newCategories);
    };

    const handleTitleChange = (newTitle: string) => {
        setTitle(newTitle)
    }

    const handleQuestionChange = (
        categoryIndex: number,
        questionIndex: number,
        field: keyof Question,
        value: string | number
    ) => {
        const newCategories = [...categories];
        newCategories[categoryIndex] = {
            ...newCategories[categoryIndex],
            questions: [...newCategories[categoryIndex].questions]
        };
        newCategories[categoryIndex].questions[questionIndex] = {
            ...newCategories[categoryIndex].questions[questionIndex],
            [field]: field === 'points' ? Number(value) : value
        };
        setCategories(newCategories);
    };

    const handleFinishEditing =  async () => {
        if (validateBoard()) {
            console.log('Board is valid, ready to save', categories);
            // onEditSave({ categories }, title);
            await handleShare()


        }
    };

    const handleShare = async () => {
        setHandlingSave(true)
        try {
            const response = await fetch('/api/save-game', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    categories,
                    title,
                    
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to save game');
            }

            const { id } = await response.json();
            const urlTitle = title.replaceAll(" ", "-")
            // const url = `${window.location.origin}/play/${urlTitle}/${id}`;
            // await emailBoardToUser(url)
            setHandlingSave(false)
            router.push(`/play/${urlTitle}/${id}`)
            // onShare(url)
        } catch (error) {
            console.error('Error saving game:', error);
            // You might want to show an error message to the user
        } finally {
            // setIsSharing(false);
        }
    };

    // const emailBoardToUser = async (url: string) => {
    //     try {

    //         const response = await fetch('/api/email-game', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 url,
    //                 email,
                    
    //             }),
    //         });

    //         if (!response.ok) {
    //             throw new Error('Failed to save game');
    //         }

    //         // onShare(url)
    //     } catch (error) {
    //         console.error('Error saving game:', error);
    //         // You might want to show an error message to the user
    //     } finally {
    //         // setIsSharing(false);
    //     }

    // }

    // Preview mode handlers
    const handleCardClick = (question: Question) => {
        if (isPreviewMode) {
            setSelectedClue(question);
            setShowAnswer(false);
        }
    };


    const handleCloseModal = () => {
        setSelectedClue(null);
        setShowAnswer(false);
    };




    const getValidationErrorsForField = (key: string) => {
        return validationErrors[key] || [];
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

    const handleEmailSubmit = async () => {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            setEmailError('Email is required');
            return;
        }
        if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email address');
            return;
        }

        setHandlingEmail(true)
        try {
            const response = await fetch('/api/save-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email }),
            });
            if (!response.ok) {
                setEmailError('Failed to save email. Please try again.');
                return;
            }
            // setIsEmailSaved(true);
            setEmailError(null);
            await handleFinishEditing()
            setHandlingEmail(false)
            setShowEmailModal(false);


        } catch (err) {
            console.error(err)
            setEmailError('Something went wrong. Please try again.');
            setHandlingEmail(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#060CE9] p-6 sm:p-8">
            <div className="w-full max-w-7xl mx-auto">
                {/* Updated Header Section */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start mb-8">
                    <h1 className="text-3xl sm:text-5xl font-bold text-center sm:text-left text-[#FFCC00] 
                        tracking-wider uppercase drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] 
                        font-serif mb-4">
                        {isPreviewMode ? 'Preview Board' : 'Edit Jeopardy Board'}
                    </h1>

                    {/* Action Buttons */}
                    <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center sm:justify-end">
                        <button
                            className="flex-1 sm:flex-initial bg-[#FFCC00] text-[#000080] px-3 py-2 sm:px-6 sm:py-3 
                                rounded-lg text-sm sm:text-base font-bold hover:bg-[#FFD700] transition duration-200"
                            onClick={() => setIsPreviewMode(!isPreviewMode)}
                        >
                            {isPreviewMode ? 'Edit' : 'Preview Board'}
                        </button>
                        <button
                            className="flex-1 sm:flex-initial bg-[#FFCC00] text-[#000080] px-3 py-2 sm:px-6 sm:py-3 
                                rounded-lg text-sm sm:text-base font-bold hover:bg-[#FFD700] transition duration-200"
                            onClick={async () => await handleFinishEditing()}
                        >
                            {handlingSave  ? (<Loader2
                                        size={20}
                                        className="animate-spin"
                                    />) : (<h1>Play</h1>)}
                        </button>
                    </div>
                </div>

                {/* Title Section */}
                <div className="mb-8">
                    {isPreviewMode ? (
                        <h2 className="text-2xl sm:text-4xl font-bold text-[#FFCC00] tracking-wider uppercase 
                            drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] font-serif text-center">
                            {title}
                        </h2>
                    ) : (
                        <EditableHeader text={title} onTextChange={handleTitleChange} />
                    )}
                </div>

                <div className={`
                    ${isPreviewMode 
                        ? `grid gap-1 sm:gap-4 w-full sm:max-w-6xl mx-auto ${
                            cols === 3 ? 'grid-cols-3' :
                            cols === 4 ? 'grid-cols-4' :
                            'grid-cols-5'}`
                        : 'sm:grid sm:gap-4 w-full sm:max-w-6xl mx-auto flex flex-col sm:grid-cols-5'
                    }
                `}>
                    {categories.map((category, categoryIndex) => (
                        <div key={categoryIndex} 
                            className={`
                                ${isPreviewMode
                                    ? 'space-y-1 sm:space-y-4'
                                    : 'space-y-1 sm:space-y-4 mb-6 sm:mb-0'
                                }
                            `}
                        >
                            {/* Category Header */}
                            <div className="bg-[#000080] border border-[#FFCC00] sm:border-2 rounded-lg p-2 sm:p-4 
                                h-16 sm:h-24 flex items-center justify-center text-center"
                                onMouseEnter={() => setShowTooltip(true)}
                                onMouseLeave={() => setShowTooltip(false)}>
                                {isPreviewMode ? (
                                    <>
                                        <h2 className="text-[#FFCC00] font-bold text-xs sm:text-lg uppercase
                                            overflow-hidden text-ellipsis line-clamp-2">
                                            <span className="block text-[length:var(--responsive-font-size,1rem)] leading-tight">
                                                {category.category}
                                            </span>
                                        </h2>
                                        {showTooltip && category.category.length > 20 && (
                                            <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-[#000080] 
                                                border-2 border-[#FFCC00] rounded p-2 z-10 w-48 text-[#FFCC00] text-sm">
                                                {category.category}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="w-full">
                                        <input
                                            type="text"
                                            value={category.category}
                                            onChange={(e) => handleCategoryChange(categoryIndex, e.target.value)}
                                            className="w-full bg-[#000080] border border-[#FFCC00] rounded 
                                                text-[#FFCC00] p-1 sm:p-2 focus:outline-none focus:ring-2 
                                                focus:ring-[#FFCC00] text-xs sm:text-base"
                                            placeholder="Enter category name"
                                        />
                                        {renderErrorMessages(getValidationErrorsForField(`category-${categoryIndex}`))}
                                    </div>
                                )}
                            </div>

                            {/* Questions */}
                            {category.questions.map((question, questionIndex) => (
                                <div key={questionIndex}>
                                    {isPreviewMode ? (
                                        <button
                                            onClick={() => handleCardClick(question)}
                                            className={`w-full aspect-square bg-[#000080] hover:bg-[#000080]/80 
                                                cursor-pointer transform hover:scale-105 border border-[#FFCC00] 
                                                sm:border-2 rounded-lg transition duration-200 flex items-center 
                                                justify-center text-[#FFCC00] font-bold text-sm sm:text-3xl`}
                                        >
                                            {`${question.points}`}
                                        </button>
                                    ) : (
                                        <div className="bg-[#000080] border border-[#FFCC00] sm:border-2 rounded-lg p-2 sm:p-4 space-y-2 sm:space-y-4">
                                            <div className="space-y-1 sm:space-y-2">
                                                <label className="text-[#FFCC00] text-xs sm:text-sm font-bold">Points</label>
                                                <input
                                                    type="number"
                                                    value={question.points}
                                                    onChange={(e) => handleQuestionChange(
                                                        categoryIndex,
                                                        questionIndex,
                                                        'points',
                                                        e.target.value
                                                    )}
                                                    className="w-full bg-[#000080] border border-[#FFCC00] rounded 
                                                        text-[#FFCC00] p-1 sm:p-2 focus:outline-none focus:ring-2 
                                                        focus:ring-[#FFCC00] text-xs sm:text-base"
                                                />
                                            </div>

                                            <div className="space-y-1 sm:space-y-2">
                                                <label className="text-[#FFCC00] text-xs sm:text-sm font-bold">Clue</label>
                                                <textarea
                                                    value={question.clue}
                                                    onChange={(e) => handleQuestionChange(
                                                        categoryIndex,
                                                        questionIndex,
                                                        'clue',
                                                        e.target.value
                                                    )}
                                                    className="w-full bg-[#000080] border border-[#FFCC00] rounded 
                                                        text-[#FFCC00] p-1 sm:p-2 focus:outline-none focus:ring-2 
                                                        focus:ring-[#FFCC00] min-h-[60px] sm:min-h-[80px] text-xs sm:text-base"
                                                />
                                            </div>

                                            <div className="space-y-1 sm:space-y-2">
                                                <label className="text-[#FFCC00] text-xs sm:text-sm font-bold">Answer</label>
                                                <textarea
                                                    value={question.answer}
                                                    onChange={(e) => handleQuestionChange(
                                                        categoryIndex,
                                                        questionIndex,
                                                        'answer',
                                                        e.target.value
                                                    )}
                                                    className="w-full bg-[#000080] border border-[#FFCC00] rounded 
                                                        text-[#FFCC00] p-1 sm:p-2 focus:outline-none focus:ring-2 
                                                        focus:ring-[#FFCC00] min-h-[60px] sm:min-h-[80px] text-xs sm:text-base"
                                                />
                                            </div>
                                            {renderErrorMessages(getValidationErrorsForField(`question-${categoryIndex}-${questionIndex}`))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <Modal isOpen={!!selectedClue} onClose={handleCloseModal}>
                    {selectedClue && (
                        <div className="text-[#FFCC00]">
                            <div className="text-2xl font-bold text-center mb-6">
                                ${selectedClue.points}
                            </div>
                            <div className="text-xl text-center font-medium mb-8">
                                {selectedClue.clue}
                            </div>
                            <div className="flex justify-center space-x-4">
                                <button
                                    onClick={() => setShowAnswer(true)}
                                    className="bg-[#FFCC00] text-[#000080] px-6 py-2 rounded-lg 
                    font-bold hover:bg-[#FFD700] transition duration-200"
                                >
                                    Show Answer
                                </button>
                                <button
                                    onClick={handleCloseModal}
                                    className="bg-[#FFCC00] text-[#000080] px-6 py-2 rounded-lg 
                    font-bold hover:bg-[#FFD700] transition duration-200"
                                >
                                    Close
                                </button>
                            </div>
                            {showAnswer && (
                                <div className="mt-6 text-lg text-center font-medium">
                                    {selectedClue.answer}
                                </div>
                            )}
                        </div>
                    )}
                </Modal>

                <Modal isOpen={showEmailModal} onClose={() => { }}>

                    <div className="text-[#FFCC00]">
                        <div className="text-2xl font-bold text-center mb-6">
                            Submit your email to play
                        </div>

                        <div className="space-y-4"> {/* Added wrapper with spacing */}
                            <div className="flex items-center space-x-2 bg-white/10 rounded-lg p-2">
                                <input
                                    type="text"
                                    className="flex-1 bg-transparent text-[#FFCC00] px-3 py-2 
                            rounded-lg focus:outline-none"
                                    value={email}
                                    placeholder='Enter email here'
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <button
                                    onClick={handleEmailSubmit}
                                    className="bg-[#FFCC00] text-[#000080] p-2 rounded-lg 
                            hover:bg-[#FFD700] transition duration-200"
                                >

                                    {handlingEmail ? (<Loader2
                                        size={20}
                                        className="animate-spin"
                                    />) : (<SendHorizonal size={20} />)}



                                </button>
                            </div>

                            {/* Error message */}
                            {emailError && (
                                <div className="text-red-500 text-sm text-center">
                                    {emailError}
                                </div>
                            )}
                        </div>

                    </div>


                </Modal>
            </div>
        </div>
    );
};

export default EditScreen;