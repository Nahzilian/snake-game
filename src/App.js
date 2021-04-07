import './App.css';
import { useState } from 'react';
import Board from './Components/Board/Board';
import Menu from './Components/Menu/Menu';
function App() {
	const [play, playGame] = useState(false);
	const [boardSize, setBoardSize] = useState(10);
	const [speed, setSpeed] = useState(200);

	const handleSpeed = (value) => {
		const selectedSpeed = parseInt(value);
		if(selectedSpeed === 1) return setSpeed(1000);
		if(selectedSpeed === 2) return setSpeed(700);
		if(selectedSpeed === 3) return setSpeed(400);
		if(selectedSpeed === 4) return setSpeed(200);
		if(selectedSpeed === 5) return setSpeed(100);
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
