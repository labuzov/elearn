export enum QuestionStatus {
    None,
    Answered,
    Correct,
    Wrong
}

export enum QuestionType {
    Default,
    Multiple,
    Input
}

export type Answer = {
    id: string;
    title: string;
}

export type Question = {
    id: number;
    title: string;
    type: QuestionType;
    answers: Answer[];
    correct: string[];
}

export type QuestionDto = {
    id: number;
    title: string;
    type: QuestionType;
    answers: Answer[];
}

const Q1: Question = {
    id: 1,
    title: 'Выберите один правильный вариант',
    type: QuestionType.Default,
    answers: [
        {
            id: '1',
            title: 'Вариант 1'
        },
        {
            id: '2',
            title: 'Вариант 2'
        },
        {
            id: '3',
            title: 'Вариант 3'
        }
    ],
    correct: ['2']
}

export type CreateQuestionModel = {
    title: string,
    type: QuestionType,
    answers: {
        title: string,
        isCorrect: boolean;
    }[],
    inputValue?: string;
}

export type UpdateQuestionModel = {
    id: number;
    values: string[];
}

export type Test = {
    id: number;
    organizationId: number;
    title: string;
    questions: Question[];
    readIds: number[];
    createdBy: number;
    durationInMinutes: number;
}

export type TestDto = {
    id: number;
    title: string;
    createdBy: number;
    durationInMinutes: number;
}

export type CreateTestModel = {
    title: string;
    createdBy: number;
    organizationId: number;
    questions: CreateQuestionModel[];
    readIds: number[];
    durationInMinutes: number;
}

export type QuestionActive = {
    id: number;
    title: string;
    type: QuestionType;
    status: QuestionStatus;
    answers: Answer[];
    correct: string[];
}

export type TestActive = {
    title: string;
    questions: QuestionActive[];
    score: number;
    maxScore: number;
    durationInMinutes: number;
}

export type TestSession = {
    id: number;
    testId: number;
    organizationId: number;
    startTimestamp: number;
    endTimestamp: number;
    startedBy: number;
    activeTest: TestActive;
    isEnded: boolean;
}
