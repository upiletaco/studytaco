import React, { useEffect, useState } from 'react'
import { PlayWwbmProps } from '../PlayWwbm'
import { prizeLadder } from '@/app/util/wwbm.types';
import CongratsPage from './EndGame';
import { Option } from '@/pages/millionaire/play/[name]/[id]'
import MillionaireTitleBar from './TitleBar';
import QuestionCard from './QuestionCard';
import GameLifelineButtons from './LifelineButtons';
import FiftyFiftyModal from './FiftyFiftyModal';
import PhoneModal from './PhoneModal';
import FollowUpFriendModal from './FollowUpFriendModal';
import AudienceModal from './AudienceModal';
import MobilePrizes from './MobilePrizes';
import DesktopPrizes from './DesktopPrizes';


const Game: React.FC<PlayWwbmProps> = ({ questions, title, link }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [showPrizeLadder, setShowPrizeLadder] = useState(true);
    const [usedLifelines, setUsedLifelines] = useState<Set<string>>(new Set());
    const [currentQuestion, setCurrentQuestion] = useState(questions[currentQuestionIndex]);
    const letterMapping = ['A', 'B', 'C', 'D'];
    const [lifelineOptions, setLifelineOptions] = useState<Option[]>([]);
    const [showLifelineModal, setShowLifelineModal] = useState(false);
    const [showPhoneFriendModal, setShowPhoneFriendModal] = useState(false);
    const [friendSuggestion, setFriendSuggestion] = useState<Option | null>(null);
    const [showPhoneFollowUp, setShowPhoneFollowUp] = useState(false);
    const [showAudiencePoll, setShowAudiencePoll] = useState(false);

    useEffect(() => {
        setCurrentQuestion(questions[currentQuestionIndex]);
    }, [currentQuestionIndex, questions]);




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
                    console.log("CORRECT!")
                    setCurrentQuestionIndex(prev => prev + 1);
                    setSelectedAnswerId(null);
                    setIsCorrect(null);
                }, 100);
            }
        } else {
            setTimeout(() => {
                setGameOver(true);

            }, 100)
        }
    };



    const handlePrizeLadder = () => {
        setShowPrizeLadder(false)
    }


    const handlePhoneBack = () => {
        setShowPhoneFollowUp(false);
        setShowPhoneFriendModal(true);
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
        <div className="min-h-screen bg-gray-50 flex justify-center">
            <DesktopPrizes currentQuestionIndex={currentQuestionIndex} />


            <div className='w-full max-w-[600px]  text-black flex flex-col'>

                <MillionaireTitleBar title={title} currentQuestionIndex={currentQuestionIndex} questionLength={questions.length} score={score} handlePrizes={() => setShowPrizeLadder(true)} />
                <QuestionCard points={prizeLadder[currentQuestionIndex]} question={currentQuestion} handleAnswerSelect={handleAnswerSelect} />
                <GameLifelineButtons handleLifeline={handleLifeline} usedLifelines={usedLifelines} />

                {showPrizeLadder && (
                    <MobilePrizes handlePrizeLadder={handlePrizeLadder} currentQuestionIndex={currentQuestionIndex} />
                )}

                {showLifelineModal && <FiftyFiftyModal questions={questions} currentQuestionIndex={currentQuestionIndex} lifelineOptions={lifelineOptions} letterMapping={letterMapping} handleLifelineAnswer={handleLifelineAnswer} />}
                {showPhoneFriendModal && (
                    <PhoneModal questions={questions} currentQuestionIndex={currentQuestionIndex} friendSuggestion={friendSuggestion} handleTrue={
                        () => handlePhoneFriendChoice(true)} handleFalse={() => handlePhoneFriendChoice(false)} />
                )}
                {showPhoneFollowUp && (
                    <FollowUpFriendModal questions={questions} currentQuestionIndex={currentQuestionIndex} currentQuestion={currentQuestion} friendSuggestion={friendSuggestion} letterMapping={letterMapping} handleSelection={(option: string) => {
                        setShowPhoneFollowUp(false);
                        handleAnswerSelect(option);

                    }}
                        handleBack={handlePhoneBack}  // Add this line

                    />
                )}
                {showAudiencePoll && (
                    <AudienceModal
                        isOpen={showAudiencePoll}
                        currentQuestion={currentQuestion}
                        onOptionSelect={(optionId) => {
                            setShowAudiencePoll(false);
                            handleAnswerSelect(optionId);
                        }}
                    />
                )}

            </div>
        </div>
    )
}

export default Game