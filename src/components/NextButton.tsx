import type { Action } from '../App';

interface NextButtonProps {
	dispatch: React.Dispatch<Action>;
	answer: number | null;
}

export default function NextButton({ dispatch, answer }: NextButtonProps) {
	if (answer === null) return null;
	return (
		<button type='button' className='btn btn-ui' onClick={() => dispatch({ type: 'NEXT' })}>
			NEXT
		</button>
	);
}
