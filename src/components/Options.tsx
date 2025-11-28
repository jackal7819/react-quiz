import type { Action, Question as QuestionType } from '../App';

interface OptionsProps {
	question: QuestionType;
	answer: number | null;
	dispatch: React.Dispatch<Action>;
}

export default function Options({ question, answer, dispatch }: OptionsProps) {
	const hasAnswered = answer !== null;

	return (
		<div className='options'>
			{question.options.map((option, index) => (
				<button
					type='button'
					key={option}
					disabled={hasAnswered}
					className={`btn btn-option ${answer === index ? 'answer' : ''} ${
						hasAnswered ? (index === question.correctOption ? 'correct' : 'wrong') : ''
					}`}
					onClick={() => dispatch({ type: 'NEW_ANSWER', payload: index })}
				>
					{option}
				</button>
			))}
		</div>
	);
}
