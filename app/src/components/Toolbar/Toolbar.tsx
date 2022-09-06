import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import moment from 'moment'
import { AddButton } from '@/components/Button'
import { get, post } from '@/utils/api_methods'
 
interface UserData {
  number: string
  place_id: string
}
 
interface WinnerData {
  user_id: string
}

interface Time {
  start: Date
  end: Date
}

interface ToolbarProps {
  children?: React.ReactNode
  className?: string
}
 
const Toolbar = (props: ToolbarProps) => {
  const router = useRouter();
  // For add, get Time
  const [time, setTime] = useState<Time>({
    start: new Date(),
    end: new Date(),
  });
  // For add user
  const [userData, setUserData] = useState<UserData>({
    number: '',
    place_id: '',
  })
 // For add winner
  const [winnerData, setWinnerData] = useState<WinnerData>({
    user_id: '',
  })  
   
  // useEffect で Time を取得
  useEffect(() => {
    if(router.isReady){
      const getTimeUrl = process.env.CSR_API_URI + '/time'
      const getTime = async (url: string) => {
        setTime(await get(url));
      };
      getTime(getTimeUrl);
    }
  }, []);
    
  const toDatetime = (date: Date) => {
    return moment(date).toISOString(true).substr(0, 16)
  }
  
  // Time handler
  const timeHandler =
    (input: string) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setTime({ ...time, [input]: e.target.value });
      }
  // User handler
  const userDataHandler =
    (input: string) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({ ...userData, [input]: e.target.value });
      }
  // Winner handler
  const winnerDataHandler =
    (input: string) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setWinnerData({ ...winnerData, [input]: e.target.value });
      }
       
  // add time 
  const postTime = async (data: Time) => {
    const postUrl = process.env.CSR_API_URI + '/time'
    await post(postUrl, data);
  }
  // add user 
  const postUser = async (data: UserData) => {
    const postUrl = process.env.CSR_API_URI + '/user'
    await post(postUrl, data);
  }
  // add winner
  const postWinner = async (data: WinnerData) => {
    const postUrl = process.env.CSR_API_URI + '/winner'
    await post(postUrl, data);
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
                id="start_time"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                placeholder=" "
                value={toDatetime(time.start)}
                onChange={timeHandler('start')}
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
                id="end_time"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 dark:text-gray-100 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                placeholder=" "
                value={toDatetime(time.end)}
                onChange={timeHandler('end')}
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
            <AddButton onClick={() => {postTime(time)}}>
              設定
            </AddButton>
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
              value={winnerData.user_id}
              onChange={winnerDataHandler('user_id')}
              required
            />
            <label
              htmlFor="student_id"
              className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
            >
              当選者 UserID
            </label>
          </div>
          <div className="flex flex-row-reverse">
            <AddButton onClick={() => {postWinner(winnerData)}}>
              追加
            </AddButton>
          </div>
        </form>
      </div>
    </aside>
  )
}
export default Toolbar
