import Options from './Options';
import type { Question as QuestionType } from '../App';

interface QuestionProps {
	question: QuestionType;
}

export default function Question({ question }: QuestionProps) {
	return (
		<div>
			<h4>{question.question}</h4>

			<Options question={question} />
		</div>
	);
}
