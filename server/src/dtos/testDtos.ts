import { Question, QuestionDto, Test, TestDto } from '@Models';


export const getTestDto = (test: Test): TestDto => {
    const {
        id,
        title,
        createdBy,
        durationInMinutes
    } = test;

    return {
        id,
        title,
        createdBy,
        durationInMinutes
    }
}

export const getQuestionsDto = (questions: Question[]): QuestionDto[] => {
    const questionsDto: QuestionDto[] = [];

    for (const question of questions) {
        const { id, title, type, answers } = question;

        questionsDto.push({
            id,
            title,
            type,
            answers
        });
    }

    return questionsDto;
}