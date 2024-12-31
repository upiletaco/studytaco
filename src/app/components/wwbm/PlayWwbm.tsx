import { QuestionData, Option } from '@/pages/millionaire/play/[name]/[id]'
import React, { useEffect, useState } from 'react'
import AudiencePollModal from './AudiencePollModal';
import HeaderBar from '../HeaderBar';
import { prizeLadder } from '@/app/util/wwbm.types';
import MobilePrizeLadder from './play/MobilePrizeLadder';
import DesktopPrizeLadder from './play/DesktopPrizeLadder';
import LifelineModal from './play/LifelineModal';
import LifelineButtons from './play/LifelineButtons';
import WwbmTitleBar from './play/WwbmTitleBar';
import PhoneFriendModal from './play/PhoneFriendModal';
import FollowUpFriendModal from './play/FollowUpFriendModal';
import CongratsPage from './game/EndGame';

export interface PlayWwbmProps {
    title: string,
    questions: QuestionData[]
    link: string;

}

const PlayWwbmComponent: React.FC<PlayWwbmProps> = ({ questions, title, link }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [showPrizeLadder, setShowPrizeLadder] = useState(true);
    const [usedLifelines, setUsedLifelines] = useState<Set<string>>(new Set());
    const currentQuestion = questions[currentQuestionIndex];
    const letterMapping = ['A', 'B', 'C', 'D'];
    const [lifelineOptions, setLifelineOptions] = useState<Option[]>([]);
    const [showLifelineModal, setShowLifelineModal] = useState(false);
    const [showPhoneFriendModal, setShowPhoneFriendModal] = useState(false);
    const [friendSuggestion, setFriendSuggestion] = useState<Option | null>(null);
    const [showPhoneFollowUp, setShowPhoneFollowUp] = useState(false);
    const [showAudiencePoll, setShowAudiencePoll] = useState(false);
    const [shuffledOptions, setShuffledOptions] = useState<Option[]>([]);

    // Add this useEffect to shuffle options whenever the current question changes
    useEffect(() => {
        if (currentQuestion) {
            // Create a copy of the options array and shuffle it
            const shuffled = [...currentQuestion.options]
                .map(value => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value);

            setShuffledOptions(shuffled);
        }
    }, [currentQuestion]);


    const handleLifeline = (lifeline: string) => {
        if (usedLifelines.has(lifeline) || selectedAnswerId !== null) return;

        setUsedLifelines(prev => new Set([...prev, lifeline]));
        let correctOption;
        let incorrectOptions
        switch (lifeline) {
            case 'fifty-fifty':
                correctOption = currentQuestion.options.find(opt => opt.correct);
                // Get all incorrect answers
                incorrectOptions = currentQuestion.options.filter(opt => !opt.correct);
                // Randomly select one incorrect answer
                const randomIncorrectOption = incorrectOptions[Math.floor(Math.random() * incorrectOptions.length)];

                if (correctOption && randomIncorrectOption) {
                    // Randomly order the two options
                    const orderedOptions = Math.random() < 0.5
                        ? [correctOption, randomIncorrectOption]
                        : [randomIncorrectOption, correctOption];

                    setLifelineOptions(orderedOptions);
                    setShowLifelineModal(true);
                }
                break;
            case 'phone-friend':
                correctOption = currentQuestion.options.find(opt => opt.correct);
                incorrectOptions = currentQuestion.options.filter(opt => !opt.correct);

                // 80% chance of showing correct answer
                const showCorrect = Math.random() < 0.8;

                if (showCorrect && correctOption) {
                    setFriendSuggestion(correctOption);
                } else {
                    // Randomly select an incorrect answer
                    const randomIncorrect = incorrectOptions[Math.floor(Math.random() * incorrectOptions.length)];
                    setFriendSuggestion(randomIncorrect);
                }

                setShowPhoneFriendModal(true);
                break;
            case 'ask-audience':
                setShowAudiencePoll(true)
                break;
        }
    };

    const handlePhoneFriendChoice = (useSelection: boolean) => {
        setShowPhoneFriendModal(false);
        if (useSelection && friendSuggestion) {
            handleAnswerSelect(friendSuggestion.id);
        } else {
            setShowPhoneFollowUp(true);
        }
    };


    const handleLifelineAnswer = (optionId: string) => {
        setShowLifelineModal(false);
        handleAnswerSelect(optionId);
    };

    const handleAnswerSelect = (optionId: string) => {
        if (isCorrect !== null || gameOver) return;
        setSelectedAnswerId(optionId);

        const selectedOption = currentQuestion.options.find(opt => opt.id === optionId);
        const isAnswerCorrect = selectedOption?.correct || false;
        setIsCorrect(isAnswerCorrect);

        if (isAnswerCorrect) {
            const currentPrize = parseInt(prizeLadder[currentQuestionIndex].replace(/\$|\,/g, ''));
            setScore(prev => prev + currentPrize);
            setCorrectAnswers(prev => prev + 1);

            if (currentQuestionIndex === Math.min(prizeLadder.length - 1, questions.length - 1)) {
                setGameOver(true);
            } else {
                setTimeout(() => {
                    setCurrentQuestionIndex(prev => prev + 1);
                    setSelectedAnswerId(null);
                    setIsCorrect(null);
                }, 2000);
            }
        } else {
            setGameOver(true);
        }
    };

    const handlePrizeLadder = () => {
        setShowPrizeLadder(false)
    }

    const getAnswerStyle = (option: Option) => {
        if (selectedAnswerId === null) return 'bg-purple-400 hover:bg-purple-500';
        if (option.correct) return 'bg-green-600';
        if (option.id === selectedAnswerId && !option.correct) return 'bg-red-600';
        return 'bg-purple-500 opacity-50';
    };

    const resetGame = () => {
        console.log("Resetting game")
        setCurrentQuestionIndex(0);
        setScore(0);
        setCorrectAnswers(0);
        setGameOver(false);
        setSelectedAnswerId(null);
        setIsCorrect(null);
        setShowPrizeLadder(false);
        setUsedLifelines(new Set())
    };


    if (gameOver == true) return (
        <CongratsPage isCorrect={isCorrect} score={score} correctAnswers={correctAnswers} resetGame={resetGame} link={link} title={title} />
    )

    return (
        <div className="min-h-screen bg-white text-black flex flex-col">
            {/* Header */}
            <HeaderBar />
            <WwbmTitleBar title={title} handleShowPrizeLadder={() => setShowPrizeLadder(!showPrizeLadder)} showPrizeLadder={showPrizeLadder}/>

            <div className='flex-1 flex'>

                <div className='flex-1 p-4'>
                    {/* Main game area */}
                    <div className="flex justify-center items-center p-4 w-full ">
                        <div className="bg-gray-50 p-4 rounded-lg shadow-lg  drop-shadow-md min-w-48">
                            <div className="text-lg font-bold text-black text-center">
                                Score: ${score.toLocaleString()}
                            </div>
                            <h2 className="text-xl text-center px-2">
                                Correct: {correctAnswers}
                            </h2>


                        </div>
                    </div>

                    {/* Main game area */}
                    <div className="flex-grow flex flex-col items-center justify-center p-4 ">
                        <div className="bg-gray-50 p-4 rounded-lg shadow-lg  drop-shadow-md">
                            <div className="text-lg font-bold text-black text-center">
                                Points: {prizeLadder[currentQuestionIndex]}
                            </div>
                            <h2 className="text-xl text-center mb-6 px-2">
                                {questions[currentQuestionIndex].question.question}
                            </h2>


                            <div className="flex flex-col gap-3">
                                {shuffledOptions.map((option, index) => (
                                    <button
                                        key={option.id}
                                        onClick={() => handleAnswerSelect(option.id)}
                                        style={{ clipPath: "polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%)" }}

                                        className={`
                                    ${getAnswerStyle(option)} 
                                    w-full p-4 text-left transition-colors duration-300 text-sm md:text-base text-white clip-path-[polygon(20px_0,_calc(100%-20px)_0,_100%_50%,_calc(100%-20px)_100%,_20px_100%,_0_50%)]
                                `}
                                        disabled={selectedAnswerId !== null}
                                    >
                                        <p className='mr-2 ml-6'>
                                            <span className="font-bold  text-white">{letterMapping[index]}: </span>
                                            {option.clue}
                                        </p>

                                    </button>
                                ))}
                            </div>

                            <LifelineButtons handleLifeline={handleLifeline} usedLifelines={usedLifelines}/>

                        </div>
                    </div>

                </div>

                {/* Prize ladder for larger screens */}
                <DesktopPrizeLadder currentQuestionIndex={currentQuestionIndex} />

            </div>
            {showPrizeLadder && (
                <MobilePrizeLadder handlePrizeLadder={handlePrizeLadder} currentQuestionIndex={currentQuestionIndex} />
            )}

            {/* 50:50 Lifeline Modal */}
            {showLifelineModal && (
                <LifelineModal questions={questions} currentQuestionIndex={currentQuestionIndex} lifelineOptions={lifelineOptions} letterMapping={letterMapping} handleLifelineAnswer={handleLifelineAnswer}/>
            )}

            {/* Phone A Friend Modal */}
            {showPhoneFriendModal && (
                <PhoneFriendModal questions={questions} currentQuestionIndex={currentQuestionIndex} friendSuggestion={friendSuggestion} handleTrue={
                    () => handlePhoneFriendChoice(true)} handleFalse={() => handlePhoneFriendChoice(false)}/>
            )}

            {/* Phone Friend Follow-up Modal */}
            {showPhoneFollowUp && (
                <FollowUpFriendModal questions={questions} currentQuestionIndex={currentQuestionIndex} currentQuestion={currentQuestion} friendSuggestion={friendSuggestion} letterMapping={letterMapping} handleSelection={(option: string) => {
                    setShowPhoneFollowUp(false);
                    handleAnswerSelect(option);
                }}/>
            )}

            {showAudiencePoll && (
                <AudiencePollModal
                    isOpen={showAudiencePoll}
                    currentQuestion={currentQuestion}
                    onOptionSelect={(optionId) => {
                        setShowAudiencePoll(false);
                        handleAnswerSelect(optionId);
                    }}
                />
            )}

            {/* {gameOver && <WwbmGameOverModal isCorrect={isCorrect} score={score} correctAnswers={correctAnswers} resetGame={resetGame} link={link} title={title} />} */}
        </div>
    );
};

export default PlayWwbmComponent