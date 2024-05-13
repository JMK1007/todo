import { useEffect, useState } from 'react';
import './App.css';

type Todo = {
  id: number;
  text: string;
  isChecked: boolean;
};

function App() {
  const [todoList, setTodoList] = useState<Todo[]>([
    { id: 0, text: '밥 먹기', isChecked: false },
    { id: 1, text: '커피 마시기', isChecked: false },
    { id: 2, text: '알고리즘 풀기', isChecked: false },
  ]);

  const [input, setInput] = useState('');

  const [time, setTime] = useState(new Date());

  const handleAddTodoClick = () => {
    setTodoList((prev) => {
      const clone = [
        ...prev,
        { id: prev.length + 1, text: input, isChecked: false },
      ];
      return clone;
    });

    setInput('');
  };

  const handleCheckChange = (id: number) => {
    setTodoList((prev) => {
      return prev.map((item) => {
        return item.id === id ? { ...item, isChecked: !item.isChecked } : item;
      });
    });
  };

  const handleDeleteClick = (id: number) => {
    setTodoList((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    const clockId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(clockId);
    };
  }, []);

  return (
    <div className='root-container'>
      <h1>{'투두리스트'}</h1>
      <div className='clock'>{time.toLocaleTimeString()}</div>
      <div className='input-container'>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type='text'
          className='input'
          placeholder='투두를 입력하세요'
        />
        <button onClick={handleAddTodoClick} className='add-btn'>
          {'추가'}
        </button>
      </div>
      <ul className='todo-list-container'>
        {todoList.map((item) => (
          <li className='list' key={item.id}>
            <input
              type='checkbox'
              onChange={() => handleCheckChange(item.id)}
            />
            <span className={item.isChecked ? 'checked' : ''}>{item.text}</span>
            <button
              onClick={() => handleDeleteClick(item.id)}
              className='delete-btn'>
              {'삭제'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
