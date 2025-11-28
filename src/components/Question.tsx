import Options from './Options';
import type { Action, Question as QuestionType } from '../App';

interface QuestionProps {
	question: QuestionType;
	answer: number | null;
	dispatch: React.Dispatch<Action>;
}

export default function Question({ question, answer, dispatch }: QuestionProps) {
	return (
		<div>
			<h4>{question.question}</h4>

			<Options question={question} answer={answer} dispatch={dispatch} />
		</div>
	);
}
