import './App.css';
import { useState } from 'react';
import Board from './Components/Board/Board';
import Menu from './Components/Menu/Menu';
function App() {
	const [play, playGame] = useState(false);
	const [boardSize, setBoardSize] = useState(10);
	const [speed, setSpeed] = useState(200);

	const handleSpeed = (value) => {
		// Speed scale:
		// 1 - 1s
		// 2 - 0.5s
		// 3 - 0.2s
		// 4 - 0.09s
		// 5 - 0.0001s
		const selectedSpeed = parseInt(value);
		if(selectedSpeed === 1) return setSpeed(1000);
		if(selectedSpeed === 2) return setSpeed(500);
		if(selectedSpeed === 3) return setSpeed(200);
		if(selectedSpeed === 4) return setSpeed(100);
		if(selectedSpeed === 5) return setSpeed(70);
	}

	return (
		<div className="App">
			{play ?
				<Board boardSize={boardSize}
					speed={speed} /> :
				<Menu playGame={playGame}
					setBoard={setBoardSize}
					board={boardSize}
					setSpeed={handleSpeed} />
			}
		</div>
	);
}

export default App;
