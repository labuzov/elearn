import { Answer, CreateQuestionModel, CreateTestModel, Question, QuestionStatus, QuestionType } from "@Models";


class TestService {
    public async createTest(testModel: CreateTestModel) {
        const { title, questions, durationInMinutes } = testModel;

        const parsedQuestions = this.parseQuestionsFromCreate(questions);
        const parsedQuestionsValue = JSON.stringify(parsedQuestions);
        console.log(parsedQuestions);
        // db create test
    }

    public parseQuestionsFromCreate(questionModels: CreateQuestionModel[]) {
        const questions: Question[] = [];

        for (let i = 0; i < questionModels.length; i++) {
            const questionModel = questionModels[i];

            const { title, type, answers, inputValue } = questionModel;

            const parsedAnswers: Answer[] = [];
            const correct: string[] = [];

            const id = i + 1;

            if (type === QuestionType.Input && inputValue) {
                correct.push(inputValue);
            } else {
                for (let j = 0; j < answers.length; j++) {
                    const answer = answers[j];

                    const answerId = (j + 1).toString();

                    if (answer.isCorrect) {
                        correct.push(answerId);
                    }

                    parsedAnswers.push({
                        id: answerId,
                        title: answer.title
                    });
                }
            }

            const question: Question = {
                id,
                title,
                type,
                answers: parsedAnswers,
                correct
            }

            questions.push(question);
        }

        return questions;
    }
}

export const testService = new TestService();
