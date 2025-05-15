	import { useState } from 'react';
	import { useDispatch } from 'react-redux';
	import { addTodo } from '../features/todos/todoSlice';

	export default function AddTodoForm() {
	const [title, setTitle] = useState('');
	const dispatch = useDispatch();

	console.log(title);

	const handleAddTodo = (e) => {
		e.preventDefault();
		dispatch(addTodo(title));
		setTitle('');
	};

	return (
		<form onSubmit={handleAddTodo} className="flex gap-2 my-4">
		<input
			className="border p-2 flex-1 rounded-sm"
			type="text"
			placeholder="add todo"
			value={title}
			onChange={(e) => setTitle(e.target.value)}
		/>
		<button className='bg-sky-400 text-white py-2 px-4 rounded-md' type="submit">Add</button>
		</form>
	);
	}
