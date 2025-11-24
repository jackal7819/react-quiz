import { useReducer } from 'react';

interface State {
	count: number;
	step: number;
}

type Action =
	| { type: 'INCREMENT'; payload: number }
	| { type: 'DECREMENT'; payload: number }
	| { type: 'SET_COUNT'; payload: number }
	| { type: 'SET_STEP'; payload: number }
	| { type: 'RESET' };

const initialState = { count: 0, step: 1 };

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'INCREMENT':
			return { ...state, count: state.count + action.payload };
		case 'DECREMENT':
			return { ...state, count: state.count - action.payload };
		case 'SET_COUNT':
			return { ...state, count: action.payload };
		case 'SET_STEP':
			return { ...state, step: action.payload };
		case 'RESET':
			return initialState;
		default:
			throw new Error('Unknown action');
	}
};

export default function DateCounter() {
	const [state, dispatch] = useReducer(reducer, initialState);

	const date = new Date('june 21 2027');
	date.setDate(date.getDate() + state.count);

	const decrement = () => {
		dispatch({ type: 'DECREMENT', payload: state.step });
	};

	const increment = () => {
		dispatch({ type: 'INCREMENT', payload: state.step });
	};

	const defineCount = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch({ type: 'SET_COUNT', payload: Number(event.target.value) });
	};

	const defineStep = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch({ type: 'SET_STEP', payload: Number(event.target.value) });
	};

	const reset = () => {
		dispatch({ type: 'RESET' });
	};

	return (
		<div className='counter'>
			<div>
				<input
					aria-label='step'
					type='range'
					min='0'
					max='10'
					value={state.step}
					onChange={defineStep}
				/>
				<span>{state.step}</span>
			</div>

			<div>
				<button type='button' onClick={decrement}>
					-
				</button>
				<input aria-label='count' value={state.count} onChange={defineCount} />
				<button type='button' onClick={increment}>
					+
				</button>
			</div>

			<p>{date.toDateString()}</p>

			<div>
				<button type='button' onClick={reset}>
					Reset
				</button>
			</div>
		</div>
	);
}
