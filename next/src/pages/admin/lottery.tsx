import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import LotteryLayout from '@/components/LotteryLayout'

const Lottery: NextPage = () => {
  return (
  <LotteryLayout/>
  )
}

export default Lottery
