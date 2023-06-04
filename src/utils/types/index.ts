export interface QuestionType {
  description: string;
  type: string;
  step: number;
  options: OptionType[];
  id: 1;
  updatedAt: string;
  createdAt: string;
}

export interface OptionType {
  answer: any;
  createdAt: string;
  description: string;
  id: number;
  questionId: number;
  updatedAt: string;
}

export interface AnswerType {
  answer: string;
  createdAt: string;
  id: number;
  optionId: number;
  userId: number;
  questionId: number;
  updatedAt: string;
}
