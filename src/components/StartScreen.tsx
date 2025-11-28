import type { Action } from '../App';

interface StartScreenProps {
	numberOfQuestions: number;
	dispatch: React.Dispatch<Action>;
}

export default function StartScreen({ numberOfQuestions, dispatch }: StartScreenProps) {
	return (
		<div className='start'>
			<h2>Welcome to the React Quiz!</h2>
			<h3>{numberOfQuestions} questions to test your React mastery</h3>
			<button
				type='button'
				className='btn btn-ui'
				onClick={() => {
					dispatch({ type: 'START' });
				}}
			>
				LET'S START
			</button>
		</div>
	);
}
