import { useState } from 'react';

export default function DateCounter() {
	const [count, setCount] = useState(0);
	const [step, setStep] = useState(1);

	const date = new Date('june 21 2027');
	date.setDate(date.getDate() + count);

	const dec = function () {
		setCount((count) => count - step);
	};

	const inc = function () {
		setCount((count) => count + step);
	};

	const defineCount = function (event: React.ChangeEvent<HTMLInputElement>) {
		setCount(Number(event.target.value));
	};

	const defineStep = function (event: React.ChangeEvent<HTMLInputElement>) {
		setStep(Number(event.target.value));
	};

	const reset = function () {
		setCount(0);
		setStep(1);
	};

	return (
		<div className='counter'>
			<div>
				<input
					aria-label='step'
					type='range'
					min='0'
					max='10'
					value={step}
					onChange={defineStep}
				/>
				<span>{step}</span>
			</div>

			<div>
				<button type='button' onClick={dec}>
					-
				</button>
				<input aria-label='count' value={count} onChange={defineCount} />
				<button type='button' onClick={inc}>
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
