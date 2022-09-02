import React, { useState } from 'react'
import moment from 'moment'
import { ButtonNext, AddButton } from '@/components/Button'
import { post } from '@/utils/api_methods'
 
interface UserData {
  number: string
  place_id: string
}

interface ToolbarProps {
  children?: React.ReactNode
  className?: string
}
 
const Toolbar = (props: ToolbarProps) => {
  // For add user
  const [userData, setUserData] = useState<UserData>({
    number: '',
    place_id: '',
  })
   
  const toDatetime = (date: Date) => {
     
    return moment(date).toISOString(true).substr(0, 16)
  }
  
  // User handler
  const userDataHandler =
    (input: string) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({ ...userData, [input]: e.target.value });
      }
  
  // add user 
  const postUser = async (data: UserData) => {
    const postUrl = 'http://localhost:8000/api/user'
    const postReq = await post(postUrl, data);
    const postRes = await postReq.json();
  }

  return (
    <aside aria-label="Toolbar" className={props.className}>
      <div className="mx-10">
        <form className="my-10">
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="group relative z-0 mb-6 w-full">
              <input
                type="datetime-local"
                name="start_time"
                defaultValue={toDatetime(new Date())}
                id="start_time"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                placeholder=" "
                required
              />
              <label
                htmlFor="start_time"
                className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
              >
                受付 開始時間
              </label>
            </div>
            <div className="group relative z-0 mb-6 w-full">
              <input
                type="datetime-local"
                name="end_time"
                defaultValue={toDatetime(new Date())}
                id="end_time"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 dark:text-gray-100 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                placeholder=" "
                required
              />
              <label
                htmlFor="end_time"
                className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
              >
                受付 終了時間
              </label>
            </div>
          </div>
          <div className="flex flex-row-reverse">
            <ButtonNext href="#">設定</ButtonNext>
          </div>
        </form>
        <form className="my-10">
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="group relative z-0 mb-6 w-full">
              <input
                type="text"
                pattern="[0-9]{8}"
                name="student_id"
                id="student_id"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                placeholder=" "
                value={userData.number}
                onChange={userDataHandler('number')}
                required
              />
              <label
                htmlFor="floating_phone"
                className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
              >
                学籍番号
              </label>
            </div>
            <div className="group relative z-0 mb-6 w-full">
              <input
                type="number"
                name="place_id"
                id="place_id"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                placeholder=" "
                value={userData.place_id}
                onChange={userDataHandler('place_id')}
                required
              />
              <label
                htmlFor="floating_company"
                className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
              >
                場所 ID
              </label>
            </div>
          </div>
          <div className="flex flex-row-reverse">
            <AddButton onClick={() => {postUser(userData)}}>
              追加
            </AddButton>
          </div>
        </form>
        <form className="my-10">
          <div className="group relative z-0 mb-6 w-full">
            <input
              type="text"
              name="winner_student_id"
              id="student_id"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
              placeholder=" "
              required
            />
            <label
              htmlFor="student_id"
              className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
            >
              当選者 学籍番号
            </label>
          </div>
          <div className="flex flex-row-reverse">
            <ButtonNext href="#">追加</ButtonNext>
          </div>
        </form>
      </div>
    </aside>
  )
}
export default Toolbar
