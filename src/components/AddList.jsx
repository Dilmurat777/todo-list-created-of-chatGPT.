import React from 'react'
import { useSelector } from 'react-redux'

export default function AddList() {
	const tasks = useSelector((state) => state.todos.tasks);
  return (
	<ul className='space-y-2'>
		  {
			tasks.map((task) => (
				<li key={task.id} className='flex items-center justify-between mb-4 bg-gray-100 p-3 rounded-md'>
					<div>
						<p className='font-medium'>{task.title}</p>
						<p className='text-sm text-gray-600'>Статус: {task.status}</p>
					</div>
					<div className='space-x-2'>
						<button className='text-blue-400 hover:underline'>Редакт.</button>
						<button className='text-green-400 hover:underline'>Статус</button>
						<button className='text-red-400 hover:underline'>Удалить</button>
					</div>
			  </li>
			))
	  }
	</ul>
  )
}
