import type { Action } from '../App';

interface NextButtonProps {
	dispatch: React.Dispatch<Action>;
	answer: number | null;
	index: number;
	numberOfQuestions: number;
}

export default function NextButton({
	dispatch,
	answer,
	index,
	numberOfQuestions,
}: NextButtonProps) {
	if (answer === null) return <div className='block'></div>;

	if (index < numberOfQuestions - 1)
		return (
			<button type='button' className='btn btn-ui' onClick={() => dispatch({ type: 'NEXT' })}>
				NEXT
			</button>
		);

	if (index === numberOfQuestions - 1)
		return (
			<button
				type='button'
				className='btn btn-ui'
				onClick={() => dispatch({ type: 'FINISH' })}
			>
				FINISH
			</button>
		);
}
