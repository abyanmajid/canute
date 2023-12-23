export interface Params {
    params: {
        quizId: string
        num: string
    }
}

export interface QuestionType {
  qtype: string;
  question: string;
  options: string[];
  answer: string;
  time: number;
  _id: any;
}

export interface QuizType {
    _id: any;
    title: string;
    description: string;
    visibility: string;
    password: string;
    questions: string[];
    createdAt: string;
    updatedAt: string;
  }