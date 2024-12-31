import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Slide from './Slide';
import SlideIndicator from './SlideIndicator';
import NavigationButtons from './NavigationButtons';
import { SurveyQuestions } from './SurveyQuestions';
import { saveUserSurvey } from '@/app/services/supabaseService';
import { SurveyAnswer } from '@/app/util/survey.types';


const SurveySlides: FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const router = useRouter();
  const [answers, setAnswers] = useState<SurveyAnswer[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<string | null>(null);
  const [windowHeight, setWindowHeight] = useState<number>(0);

  const handleSubmit = (): void => {
    let finalAnswers: SurveyAnswer[] = []
    if (currentAnswer) {
      finalAnswers = [
        ...answers,
        {
          question: SurveyQuestions[currentSlide].question,
          answer: currentAnswer
        }
      ];
      console.log('Final Survey Results:', finalAnswers);
    }
    saveUserSurvey(finalAnswers)
    router.push('/home');
  };

  useEffect(() => {
    const updateHeight = () => {
      setWindowHeight(window.innerHeight);
    };
    
    // Initial height
    updateHeight();
    
    // Update height on resize
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const handleNext = (): void => {
    if (currentAnswer) {
      if (currentSlide < answers.length) {
        answers[currentSlide] = {
          question: SurveyQuestions[currentSlide].question,
          answer: currentAnswer
        }
        const previousAnswer = answers[currentSlide + 1];
        if (previousAnswer) {
          setCurrentAnswer(previousAnswer.answer);
        }
        setAnswers([...answers])
      } else {
        setAnswers([
          ...answers,
          {
            question: SurveyQuestions[currentSlide].question,
            answer: currentAnswer
          }
        ]);
      }

      console.log(answers)
      // Reset current answer and move to next slide
      setCurrentAnswer(null);
      setCurrentSlide(prev => prev + 1);
    }
  }
  const handlePrev = (): void => {
    const previousAnswer = answers[currentSlide - 1];
    if (previousAnswer) {
      setCurrentAnswer(previousAnswer.answer);
    }
    setCurrentSlide(prev => prev - 1);


  }

  const handleAnswerSelect = (answer: string) => {
    setCurrentAnswer(answer);
  };

  return (
    <div style={{ 
      height: windowHeight,
      maxHeight: windowHeight,
      overflow: 'hidden'
    }} className="bg-gray-50">

      <div  style={{ 
          height: windowHeight,
          paddingTop: 'env(safe-area-inset-top, 16px)',
          paddingBottom: 'env(safe-area-inset-bottom, 16px)'
        }} className="max-w-md mx-auto px-4 py-4 flex flex-col">

        <Slide
          {...SurveyQuestions[currentSlide]}
          selectedAnswer={currentAnswer}
          onAnswerSelect={handleAnswerSelect}
        />

        <div className='mt-auto'>
          <SlideIndicator
            totalSlides={SurveyQuestions.length}
            currentSlide={currentSlide}
          />
          <NavigationButtons
            currentSlide={currentSlide}
            totalSlides={SurveyQuestions.length}
            onNext={handleNext}
            onPrev={handlePrev}
            onFinish={handleSubmit}
            isNextDisabled={!currentAnswer}
          />
        </div>
      </div>
    </div>
  );
};

export default SurveySlides;