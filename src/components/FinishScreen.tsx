import RestartButton from './RestartButton';
import type { Action } from '../App';

interface FinishScreenProps {
	points: number;
	maxPoints: number;
	highScore: number;
	dispatch: React.Dispatch<Action>;
}

export default function FinishScreen({
	points,
	maxPoints,
	highScore,
	dispatch,
}: FinishScreenProps) {
	const percentage = Math.round((points / maxPoints) * 100);

	let emoji = null;

	if (percentage === 100) emoji = '🥳';
	if (percentage >= 80) emoji = '👍';
	if (percentage >= 50) emoji = '👌';
	if (percentage >= 0) emoji = '🤨';
	if (percentage === 0) emoji = '🤦‍♂️';

	return (
		<>
			<p className='result'>
				<span>{emoji}</span> You scored <strong>{points}</strong> out of {maxPoints} (
				{Math.round(percentage)}%)
			</p>
			<p className='high-score'>High score: {highScore} points</p>
			<RestartButton dispatch={dispatch} />
		</>
	);
}
