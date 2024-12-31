export interface UploadedFile extends File {
    content?: string;
}

export interface FileUploadProps {
    onFileUpload: (text: string, file: File) => void;
}



export interface GenerateButtonProps {
    isProcessing: boolean;
    isGenerating: boolean;
    onGenerate: () => void;
}

export interface FileDisplayProps {
    files: UploadedFile[];
    transcriptFound: boolean;
}

export interface WwbmHomeScreenProps {
    onQuestionsGenerated: (questions: WwbmQuestion[], title: string) => void;
}
export interface LoadingTextProps {
    isVisible: boolean;
}


export interface WwbmQuizResponse {
    questions: WwbmQuestions;
    title: string;
}

export interface WwbmQuestions {
    questions: WwbmQuestion[];
}

export interface WwbmQuestion {
    question: string;
    content: string[];
    correct: string;
}

export interface EditScreenProps {
    wwbmQuestions: WwbmQuestion[];
    title: string;
  }
  
  // Validation errors interface
  export interface ValidationErrors {
    [key: string]: string[];
  }


  export interface WwbmGameProps {

    shouldReset?: boolean;
    onResetComplete?: () => void;
    onScoreChange?: (score: number) => void;
    handleReset?: () => void;
    title: string,
    link: string | null,
    highScore: number | null,
    isPublic: boolean
    data: WwbmQuestion[]

  }
  

  export interface WwbmGame {
    id: string;
    created_at: string;
    alias: string;
    high_score: number | null;
    is_public: boolean;
  }



  export const prizeLadder: string[] = [
    '1,000,000',
    '500,000',
    '250,000',
    '100,000',
    '50,000',
    '25,000',
    '10,000',
    '5,000',
    '2,000',
    '1,000',
    '500',
    '400',
    '300',
    '200',
    '100',
].reverse();

