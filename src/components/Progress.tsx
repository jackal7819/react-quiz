interface ProgressProps {
	index: number;
	numberOfQuestions: number;
	points: number;
	maxPoints: number;
	answer: number | null;
}

export default function Progress({
	index,
	numberOfQuestions,
	points,
	maxPoints,
	answer,
}: ProgressProps) {
	return (
		<header className='progress'>
			<progress max={numberOfQuestions} value={index + Number(answer !== null)} />
			<p>
				Question <strong>{index + 1}</strong> / {numberOfQuestions}
			</p>

			<p>
				<strong>{points}</strong> points / {maxPoints}
			</p>
		</header>
	);
}
