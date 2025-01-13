import React, { useEffect, useState } from 'react'
import { LeaderboardEntry, prizeLadder } from '@/app/util/wwbm.types';
import CongratsPage from './EndGame';
import { Option, QuestionData } from '@/pages/millionaire/play/[name]/[id]'
import MillionaireTitleBar from './TitleBar';
import QuestionCard from './QuestionCard';
import GameLifelineButtons from './LifelineButtons';
import FiftyFiftyModal from './FiftyFiftyModal';
import PhoneModal from './PhoneModal';
import FollowUpFriendModal from './FollowUpFriendModal';
import AudienceModal from './AudienceModal';
import LivesDisplay from './LivesDisplay';
import { StreakPopup } from './StreakPopup';
import { addExperience, updateLeaderboardEntry } from '@/app/services/wwbmService';
import { getSupabase } from '@/app/services/supabaseClient';
import LoadingQuestionCard from './LoadingQuestionCard';
import GameLeaderboard from './GameLeaderboard';
import { RankChangePopup } from './RankChangePopup';

export interface PlayWwbmProps {
    title: string,
    questions: QuestionData[]
    link: string;


}

const Game: React.FC<PlayWwbmProps> = ({ questions: propQuestions, title, link }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [usedLifelines, setUsedLifelines] = useState<Set<string>>(new Set());
    const [questions, setQuestions] = useState(propQuestions);
    const [currentQuestion, setCurrentQuestion] = useState(questions[currentQuestionIndex]);
    const letterMapping = ['A', 'B', 'C', 'D'];
    const [lifelineOptions, setLifelineOptions] = useState<Option[]>([]);
    const [showLifelineModal, setShowLifelineModal] = useState(false);
    const [showPhoneFriendModal, setShowPhoneFriendModal] = useState(false);
    const [friendSuggestion, setFriendSuggestion] = useState<Option | null>(null);
    const [showPhoneFollowUp, setShowPhoneFollowUp] = useState(false);
    const [showAudiencePoll, setShowAudiencePoll] = useState(false);
    const [lives, setLives] = useState(5);
    const [streak, setStreak] = useState(0);
    const [showStreakPopup, setShowStreakPopup] = useState(false);
    const [loadingMoreQuestions, setLoadingMoreQuestions] = useState<boolean>(false)
    const [showLeaderboard, setLeaderboard] = useState<boolean>(false)
    const [showRankChange, setShowRankChange] = useState(false);
    const [newRank, setNewRank] = useState<number | null>(null);
    const supabase = getSupabase()
    const [userId, setUserId] = useState('');
    const [players, setPlayers] = useState<LeaderboardEntry[]>([]);
    const [leaderboardId, setLeaderboardId] = useState<string | null>(null);
    const [previousRank, setPreviousRank] = useState<number | null>(null);

    // Add this useEffect to track rank changes independently
    useEffect(() => {
        if (!userId || players.length === 0) return;
        
        const currentRank = players.find(p => p.user_id === userId)?.rank || null;
        
        if (previousRank !== null && 
            currentRank !== null && 
            currentRank !== previousRank) {
            handleRankChange(currentRank);
        }
        
        setPreviousRank(currentRank);
    }, [players, userId]);
    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUserId(user.id);
            }
        };
        fetchUser();
    }, [supabase]);


    useEffect(() => {
        const fetchLeaderboard = async () => {
            const { data: leaderboard } = await supabase
                .from('leaderboards')
                .select('id')
                .eq('game_id', getGameId(link))
                .single();

            if (leaderboard?.id) {
                setLeaderboardId(leaderboard.id);
                const { data: retrievedPlayers } = await supabase
                    .from('leaderboard_entries')
                    .select('*')
                    .eq('leaderboard_id', leaderboard.id);

                if (retrievedPlayers) {
                    setPlayers(retrievedPlayers as LeaderboardEntry[]);
                }
            }
        };

        fetchLeaderboard();

        // Set up real-time subscription
        const subscription = supabase
            .channel(`leaderboard-${getGameId(link)}`)
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'leaderboard_entries',
                filter: `leaderboard_id=eq.${getGameId(link)}`
            }, () => {
                fetchLeaderboard();
            })
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, [link, supabase]);

    useEffect(() => {
        console.log(questions)
        setCurrentQuestion(questions[currentQuestionIndex]);
    }, [currentQuestionIndex, questions]);

    const getGameId = (link: string) => {
        return link.split('/').pop() || '';
    }
    const handleLifeline = (lifeline: string) => {
        if (usedLifelines.has(lifeline) || selectedAnswerId !== null) return;

        setUsedLifelines(prev => new Set([...prev, lifeline]));
        let correctOption;
        let incorrectOptions
        switch (lifeline) {
            case 'fifty-fifty':
                correctOption = currentQuestion.options.find(opt => opt.correct);
                incorrectOptions = currentQuestion.options.filter(opt => !opt.correct);
                const randomIncorrectOption = incorrectOptions[Math.floor(Math.random() * incorrectOptions.length)];
                if (correctOption && randomIncorrectOption) {
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

    const handleAnswerSelect = async (optionId: string) => {
        if (isCorrect !== null || gameOver) return;
        setSelectedAnswerId(optionId);

        const selectedOption = currentQuestion.options.find(opt => opt.id === optionId);
        const isAnswerCorrect = selectedOption?.correct || false;
        setIsCorrect(isAnswerCorrect);

        if (isAnswerCorrect) {
            setStreak(prev => prev + 1);
            if ((streak + 1) % 5 === 0) {
                setShowStreakPopup(true);
                setTimeout(() => setShowStreakPopup(false), 1000);
            }
            // const currentPrize = parseInt(prizeLadder[currentQuestionIndex].replace(/\$|\,/g, ''));
            const currentPrize = 10;

            setScore(prev => prev + currentPrize);
            setCorrectAnswers(prev => prev + 1);


            if (currentQuestionIndex === questions.length - 1) {
                setLoadingMoreQuestions(true)
                const gameId = getGameId(link);

                const simplified = questions.map(q => ({ question: q.question.question, options: q.options.map(o => ({ clue: o.clue, correct: o.correct })) }));
                const response = await fetch('/api/wwbm/generateMoreQuestions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        questions: JSON.stringify(simplified),
                        game_id: gameId
                    })
                });


                if (response.ok) {

                    // await new Promise(resolve => setTimeout(resolve, 1000));
                    // const success = await onNeedMoreQuestions();
                    // if (success) {
                    //     console.log("Success!")
                    //     setCurrentQuestionIndex(prev => prev + 1);
                    // }
                    const { questions: newQuestions } = await response.json();
                    // // setQuestions([...questions, ...newQuestions.questions.flat()]);
                    console.log(`newquestions:`)
                    console.log(newQuestions)
                    setQuestions(newQuestions.questions);

                    setCurrentQuestionIndex(prev => prev + 1);

                }
                setLoadingMoreQuestions(false)
            } else {
                setTimeout(() => {
                    console.log("CORRECT!")
                    setCurrentQuestionIndex(prev => prev + 1);
                    setSelectedAnswerId(null);
                    setIsCorrect(null);
                }, 100);
            }
        } else {
            setStreak(0);
            setLives(prev => prev - 1);
            setTimeout(() => {
                if (lives <= 1) {
                    setGameOver(true);
                    handleGameOver()
                } else {
                    setSelectedAnswerId(null);
                    setIsCorrect(null);
                }
            }, 100);
        }
    };

    const handleGameOver = async () => {
        const supabase = getSupabase()
        const { data: { user } } = await supabase.auth.getUser();

        const user_id = user?.id

        if (user_id == null || user == null) {
            return
        }

        const { user_metadata: {full_name } } = user;


        const { data: leaderboard } = await supabase
            .from('leaderboards')
            .select('id')
            .eq('game_id', getGameId(link))
            .single();

        await updateLeaderboardEntry(
            leaderboard!.id,
            user_id,
            full_name,
            score
        );

        console.log(`Adding xp for ${user_id}`)
        addExperience(score, user_id)

    }

    const handleRankChange = (rank: number) => {
        setNewRank(rank);
        setShowRankChange(true);
        console.log(`New rank: ${rank}`)
    
        setTimeout(() => {
            setShowRankChange(false);
        }, 2000);
    
    };


 



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
        setUsedLifelines(new Set())
        setLives(5)
    };

    const onLeaderboardSelect = () => {
        const curr = showLeaderboard
        setLeaderboard(!curr)
    }




    const updatePlayers = (currentScore: number) => {
        if (!leaderboardId) return;

        let allPlayers = [...players];
        // fix user Id
        const currentPlayerIndex = allPlayers.findIndex(p => p.user_id === userId);

        if (currentPlayerIndex === -1) {
            // Add temporary player if they don't exist
            const temporaryPlayer: LeaderboardEntry = {
                id: 'temp-' + userId,
                user_id: userId,
                username: 'You',
                score: currentScore,
                leaderboard_id: leaderboardId,
                rank: null,
                is_bot: false,
                created_at: null,
                updated_at: null
            };
            allPlayers.push(temporaryPlayer);
        } else {
            // Update existing player's score
            allPlayers[currentPlayerIndex].score = currentScore;
        }

        // Sort players by score
        allPlayers.sort((a, b) => b.score - a.score);

        // Update ranks
        allPlayers = allPlayers.map((player, index) => ({
            ...player,
            rank: index + 1
        }));

        setPlayers(allPlayers);
    };

    if (gameOver == true) return (
        <CongratsPage isCorrect={isCorrect} score={score} correctAnswers={correctAnswers} resetGame={resetGame} link={link} title={title} />
    )
    return (
        <div className="min-h-screen bg-gray-50 flex justify-center">


            <div className='w-full max-w-[600px]  text-black flex flex-col'>
                {/* <StreakCounter streak={streak} /> */}

                <MillionaireTitleBar title={title} currentQuestionIndex={currentQuestionIndex} questionLength={questions.length} score={score} handlePrizes={onLeaderboardSelect} streak={streak} />

                <LivesDisplay lives={lives} />
                {loadingMoreQuestions == false && <QuestionCard points={prizeLadder[currentQuestionIndex]} question={currentQuestion} handleAnswerSelect={handleAnswerSelect} lives={lives} />
                }
                {loadingMoreQuestions == true && <LoadingQuestionCard />}
                <GameLifelineButtons handleLifeline={handleLifeline} usedLifelines={usedLifelines} />

                <StreakPopup streak={streak} show={showStreakPopup} />
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
                        handleBack={handlePhoneBack}

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


                {showLeaderboard && (
                    <GameLeaderboard
                        gameId={getGameId(link)}
                        alias={title}
                        handlePrizes={onLeaderboardSelect}
                        currentScore={score}
                        userId={userId}
                        // onRankChange={handleRankChange}
                        players={players}
                        updatePlayers={updatePlayers}
                    />
                )}
                <RankChangePopup
                    show={showRankChange}
                    newRank={newRank || 0}
                    isImprovement={true}
                />
            </div>
        </div>
    )
}

export default Game