
import Link from 'next/link';
import { BsTranslate } from "react-icons/bs";

const Sidebar = () => {
  return (
      <div className='flex flex-col w-32 h-screen gap-8 p-4 bg-pink-50'>
          <Link className='flex items-center gap-2 mt-24 hover:scale-105' href="/translate">
              <span className='font-bold'>언어의 창</span>
              <BsTranslate/>
          </Link>
          <Link className='mt-4' href="/chat">채팅</Link>
          <Link className='mt-4' href="/chat">채팅</Link>
          <Link className='mt-4' href="/chat">채팅</Link>
      </div>
  )
}

export default Sidebar