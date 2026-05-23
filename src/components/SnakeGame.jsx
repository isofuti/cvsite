import React, { useState, useEffect, useCallback } from 'react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_FOOD = { x: 5, y: 5 };
const INITIAL_DIRECTION = { x: 0, y: -1 };

export const SnakeGame = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const generateFood = useCallback(() => {
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(generateFood());
    setGameOver(false);
    setScore(0);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    if (gameOver) return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const newHead = {
          x: prevSnake[0].x + direction.x,
          y: prevSnake[0].y + direction.y
        };

        // Wall collision
        if (
          newHead.x < 0 || newHead.x >= GRID_SIZE ||
          newHead.y < 0 || newHead.y >= GRID_SIZE
        ) {
          setGameOver(true);
          return prevSnake;
        }

        // Self collision
        if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Food collision
        if (newHead.x === food.x && newHead.y === food.y) {
          setFood(generateFood());
          setScore(s => s + 10);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const intervalId = setInterval(moveSnake, 150);
    return () => clearInterval(intervalId);
  }, [direction, food, gameOver, generateFood]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', background: '#222', color: '#fff', padding: '20px' }}>
      <h2 style={{ marginBottom: '10px' }}>Snake Game</h2>
      <p style={{ marginBottom: '20px' }}>Score: {score}</p>
      
      <div style={{ position: 'relative', width: '400px', height: '400px', minWidth: '400px', minHeight: '400px', background: '#000', outline: '2px solid #555' }}>
        {gameOver && (
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
            <h3 style={{ color: '#ff5f56', marginBottom: '20px', fontSize: '24px' }}>Game Over!</h3>
            <button onClick={resetGame} style={{ padding: '10px 20px', background: '#27c93f', color: '#000', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
              Restart
            </button>
          </div>
        )}
        
        {/* Food */}
        <div style={{
          position: 'absolute',
          width: '20px', height: '20px',
          background: '#ff5f56',
          borderRadius: '50%',
          left: `${food.x * 20}px`,
          top: `${food.y * 20}px`
        }} />

        {/* Snake */}
        {snake.map((segment, index) => (
          <div key={index} style={{
            position: 'absolute',
            width: '20px', height: '20px',
            background: index === 0 ? '#27c93f' : '#1aab29',
            border: '1px solid #000',
            left: `${segment.x * 20}px`,
            top: `${segment.y * 20}px`
          }} />
        ))}
      </div>
      <p style={{ marginTop: '20px', fontSize: '12px', color: '#999' }}>Use Arrow Keys to move. Click window to focus.</p>
    </div>
  );
};
