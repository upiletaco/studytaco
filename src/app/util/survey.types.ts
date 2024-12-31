export interface SlideData {
    title: string;
    description: string;
    illustration: React.FC;
  }
    
  export interface SlideIndicatorProps {
    totalSlides: number;
    currentSlide: number;
  }
  
  export interface NavigationButtonsProps {
    currentSlide: number;
    totalSlides: number;
    onNext: () => void;
    onPrev: () => void;
    onFinish: () => void;
  }

  export interface SurveryData {
    id: number;
    question: string;
    options: string[];
    illustration: React.FC;


  }

  export interface SurveyAnswer {
    question: string;
    answer: string;
  }