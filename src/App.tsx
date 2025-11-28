import { useEffect, useReducer } from 'react';

import Error from './components/Error';
import FinishScreen from './components/FinishScreen';
import Header from './components/Header';
import Loader from './components/Loader';
import Main from './components/Main';
import NextButton from './components/NextButton';
import Progress from './components/Progress';
import Question from './components/Question';
import StartScreen from './components/StartScreen';

export interface Question {
	question: string;
	options: string[];
	correctOption: number;
	points: number;
}

interface State {
	index: number;
	status: 'loading' | 'ready' | 'error' | 'active' | 'finished';
	questions: Question[];
	answer: number | null;
	points: number;
	highScore: number;
}

export type Action =
	| { type: 'SET_QUESTIONS'; payload: Question[] }
	| { type: 'NEW_ANSWER'; payload: number }
	| { type: 'ADD_SCORE'; payload: number }
	| { type: 'LOADING' }
	| { type: 'ERROR' }
	| { type: 'START' }
	| { type: 'NEXT' }
	| { type: 'PREV' }
	| { type: 'FINISH' }
	| { type: 'RESTART' };

const initialState: State = {
	index: 0,
	status: 'loading',
	questions: [],
	answer: null,
	points: 0,
	highScore: 0,
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

		case 'NEW_ANSWER':
			const question = state.questions.at(state.index);

			return {
				...state,
				answer: action.payload,
				points:
					action.payload === question?.correctOption
						? state.points + question.points
						: state.points,
			};

		case 'ADD_SCORE':
			return {
				...state,
				index: state.index + 1,
				answer: action.payload,
			};

		case 'NEXT':
			return {
				...state,
				index: state.index + 1,
				answer: null,
			};

		case 'PREV':
			return {
				...state,
				index: state.index - 1,
				answer: null,
			};

		case 'FINISH':
			return {
				...state,
				status: 'finished',
				highScore: state.points > state.highScore ? state.points : state.highScore,
			};

		case 'RESTART':
			return {
				...state,
				status: 'ready',
				index: 0,
				answer: null,
				points: 0,
			};

		default:
			return state;
	}
};

export default function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { questions, status, index, answer, points, highScore } = state;

	const numberOfQuestions = questions.length;
	const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0);

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
				{status === 'active' && (
					<>
						<Progress
							index={index}
							numberOfQuestions={numberOfQuestions}
							points={points}
							maxPoints={maxPoints}
							answer={answer}
						/>
						<Question dispatch={dispatch} question={questions[index]} answer={answer} />
						<NextButton
							dispatch={dispatch}
							answer={answer}
							index={index}
							numberOfQuestions={numberOfQuestions}
						/>
					</>
				)}
				{status === 'finished' && (
					<FinishScreen
						points={points}
						maxPoints={maxPoints}
						highScore={highScore}
						dispatch={dispatch}
					/>
				)}
			</Main>
		</div>
	);
}
