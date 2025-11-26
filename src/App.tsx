import { useEffect, useReducer } from 'react';

import Error from './components/Error';
import Header from './components/Header';
import Loader from './components/Loader';
import Main from './components/Main';
import Question from './components/Question';
import StartScreen from './components/StartScreen';

export interface Question {
	question: string;
	options: string[];
	correctOption: number;
	points: number;
}

interface State {
	questions: Question[];
	status: 'loading' | 'ready' | 'error' | 'active';
	index: number;
}

export type Action =
	| { type: 'LOADING' }
	| { type: 'SET_QUESTIONS'; payload: Question[] }
	| { type: 'ERROR' }
	| { type: 'START' }
	| { type: 'ADD_SCORE'; payload: number };

const initialState: State = {
	questions: [],
	status: 'loading',
	index: 0,
};

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'LOADING':
			return { ...state, status: 'loading' };

		case 'SET_QUESTIONS':
			return {
				...state,
				questions: action.payload,
				status: 'ready',
			};

		case 'ERROR':
			return { ...state, status: 'error' };

		case 'START':
			return { ...state, status: 'active' };

		default:
			return state;
	}
};

export default function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { questions, status, index } = state;

	const numberOfQuestions = questions.length;

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
				{status === 'loading' && <Loader />}
				{status === 'error' && <Error />}
				{status === 'ready' && (
					<StartScreen numberOfQuestions={numberOfQuestions} dispatch={dispatch} />
				)}
				{status === 'active' && <Question question={questions[index]} />}
			</Main>
		</div>
	);
}
