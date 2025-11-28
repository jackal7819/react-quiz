import type { Action } from '../App';

interface RestartButtonProps {
	dispatch: React.Dispatch<Action>;
}

export default function RestartButton({ dispatch }: RestartButtonProps) {
	return (
		<button type='button' className='btn btn-ui' onClick={() => dispatch({ type: 'RESTART' })}>
			RESTART
		</button>
	);
}
