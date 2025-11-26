import { useEffect, useReducer } from 'react';

import Error from './components/Error';
import Header from './components/Header';
import Loader from './components/Loader';
import Main from './components/Main';
import StartScreen from './components/StartScreen';

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
			return state;
	}
};

export default function App() {
	const [state, dispatch] = useReducer(reducer, initialState);

	const numberOfQuestions = state.questions.length;

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

	return (
		<div className='app'>
			<Header />
			<Main>
				{state.status === 'loading' && <Loader />}
				{state.status === 'error' && <Error />}
				{state.status === 'ready' && <StartScreen numberOfQuestions={numberOfQuestions} />}
			</Main>
		</div>
	);
}
