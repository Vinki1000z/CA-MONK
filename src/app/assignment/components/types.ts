export interface QuestionInterface {
    questionId: string;
    question: string;
    questionType: string;
    answerType: string;
    options: string[];
    correctAnswer: string[];
  }
  
  export interface WordSlotIntreface {
    id: string;
    word: string;
    isSelected: boolean;
  }
  