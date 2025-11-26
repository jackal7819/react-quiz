interface StartScreenProps {
	numberOfQuestions: number;
}

export default function StartScreen({ numberOfQuestions }: StartScreenProps) {
	return (
		<div className='start'>
			<h2>Welcome to the React Quiz!</h2>
			<h3>{numberOfQuestions} questions to test your React mastery</h3>
			<button type='button' className='btn btn-ui'>
				Let's start
			</button>
		</div>
	);
}
