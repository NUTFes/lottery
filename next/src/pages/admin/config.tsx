import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <>
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
          <div className="mb-10 md:mb-16">
            <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">
              管理者ページ - 設定画面
            </h2>

            <p className="max-w-screen-md text-gray-500 md:text-lg text-center mx-auto">
              This is a section of some simple filler text, also known as placeholder text. It shares some
              characteristics of a real written text but is random or otherwise generated.
            </p>
          </div>

          <form className="max-w-screen-md grid sm:grid-cols-2 gap-4 mx-auto">
            <div>
              <label htmlFor="first-name" className="inline-block text-gray-800 text-sm sm:text-base mb-2">
                First name*
              </label>
              <input
                name="first-name"
                className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
              />
            </div>

            <div>
              <label htmlFor="last-name" className="inline-block text-gray-800 text-sm sm:text-base mb-2">
                Last name*
              </label>
              <input
                name="last-name"
                className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="company" className="inline-block text-gray-800 text-sm sm:text-base mb-2">
                Company
              </label>
              <input
                name="company"
                className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="email" className="inline-block text-gray-800 text-sm sm:text-base mb-2">
                Email*
              </label>
              <input
                name="email"
                className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="subject" className="inline-block text-gray-800 text-sm sm:text-base mb-2">
                Subject*
              </label>
              <input
                name="subject"
                className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="message" className="inline-block text-gray-800 text-sm sm:text-base mb-2">
                Message*
              </label>
              <textarea
                name="message"
                className="w-full h-64 bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
              ></textarea>
            </div>

            <div className="sm:col-span-2 flex justify-between items-center">
              <button className="inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">
                Send
              </button>

              <span className="text-gray-500 text-sm">*Required</span>
            </div>

            <p className="text-gray-400 text-xs">
              By signing up to our newsletter you agree to our{' '}
              <a href="#" className="hover:text-indigo-500 active:text-indigo-600 underline transition duration-100">
                Privacy Policy
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Home
