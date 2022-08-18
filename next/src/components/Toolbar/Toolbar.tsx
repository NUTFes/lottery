import React from 'react'
interface ToolbarProps {
  children?: React.ReactNode
  className?: string
}
const Toolbar = (props: ToolbarProps) => {
  return (
    <aside aria-label="Toolbar" className={props.className}>
      <div className="overflow-y-auto py-4 px-3  bg-gray-50 rounded dark:bg-gray-800">
        <h1 className="font-bold">ここはツールバー</h1>
        <p>ユーザーの追加や時間の設定を行います</p>
      </div>
    </aside>
  )
}
export default Toolbar
