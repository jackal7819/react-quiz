import type { Question as QuestionType } from '../App';

interface OptionsProps {
	question: QuestionType;
}
export default function Options({ question }: OptionsProps) {
	return (
		<div className='options'>
			{question.options.map((option) => (
				<button type='button' key={option} className='btn btn-option'>
					{option}
				</button>
			))}
		</div>
	);
}
