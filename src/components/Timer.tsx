import { useEffect } from 'react';

import type { Action } from '../App';

interface TimerProps {
	dispatch: React.Dispatch<Action>;
	secondsRemaining: number;
}

export default function Timer({ dispatch, secondsRemaining }: TimerProps) {
	useEffect(() => {
		const interval = setInterval(() => {
			dispatch({ type: 'TICK' });
		}, 1000);

		return () => clearInterval(interval);
	}, [dispatch]);

	return (
		<div className='timer'>
			<p>
				{('0' + Math.floor(secondsRemaining / 60)).slice(-2)}:
				{('0' + (secondsRemaining % 60)).slice(-2)}
			</p>
		</div>
	);
}
