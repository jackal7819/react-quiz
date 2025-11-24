import { useEffect, useReducer } from 'react';

import Header from './components/Header';
import Main from './components/Main';

interface Question {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}

interface State {
	questions: Question[];
	status: 'loading' | 'ready' | 'error';
}

type Action =
	| { type: 'START' }
	| { type: 'SET_QUESTIONS'; payload: Question[] }
	| { type: 'ERROR' }
	| { type: 'NEXT' }
	| { type: 'ADD_SCORE'; payload: number };

const initialState: State = {
	questions: [],
	status: 'loading',
};

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'START':
			return { ...state, status: 'loading' };

		case 'SET_QUESTIONS':
			return {
				...state,
				questions: action.payload,
				status: 'ready',
			};

		case 'ERROR':
			return { ...state, status: 'error' };

		default:
			throw new Error('Unknown action');
	}
};

export default function App() {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		const fetchData = async () => {
			const URL = 'http://localhost:3001/questions';

			try {
				const response = await fetch(URL);
				const data = await response.json();
				dispatch({ type: 'SET_QUESTIONS', payload: data });
			} catch (error) {
				dispatch({ type: 'ERROR' });
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		console.log('Questions updated:', state.questions);
	}, [state.questions]);

	return (
		<div className='app'>
			<Header />
			<Main>
				<p>1/15</p>
				<p>Question?</p>
			</Main>
		</div>
	);
}
