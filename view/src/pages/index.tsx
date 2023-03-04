import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Button from '@mui/material/Button';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/router';

// export default function Home() {
//   return (
//     <>
//     <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">Prev</button>
//     <h1 className="text-3xl font-bold underline">
//       Hello world!
//     </h1>
//     <div>
//       <Button variant="contained">Hello World</Button>
//     </div>
//     </>
//   )
// }

export default function Component() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push('/home');
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
