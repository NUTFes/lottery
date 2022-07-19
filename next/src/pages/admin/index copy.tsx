import type { NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Admin : NextPage = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [tmpTodo, setTmpTodo] = useState("");
  const addTodo = () => {
    setTodos([...todos, tmpTodo]);
    setTmpTodo("");
  }
  return (
    <div className="grid grid-cols-1">
      <h1 className="text-4xl text-black font-sans">管理者ページ - ダッシュボード</h1>
      <div className='form'>
        <input className="grid-cols-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="学籍番号"
          type="text"
          name="todo"
          onChange={e => setTmpTodo(e.target.value)}
          value={tmpTodo}
        />
        <button onClick={addTodo} className="grid-cols-2 bg-indigo-700 font-semibold text-white py-2 px-4 rounded">Add</button>
      </div>

      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Author</th>
            <th className="px-4 py-2">Views</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => {
            return (
              <tr>
                <td className="border px-4 py-2" key={index}>{index+1}</td>
                <td className="border px-4 py-2" key={index}>{todo}</td>
                <td className="border px-4 py-2" key={index}>{todo}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Admin
