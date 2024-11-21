import Link from 'next/link';
import { BsTranslate } from "react-icons/bs";

const Navbar = () => {
  return (
    <div className='flex items-center gap-4 p-2'>
          <Link className='flex items-center mt-4 hover:scale-105' href="/translate">
              <span className='font-bold'>언어의 창</span>
              <BsTranslate/>
          </Link>
          <Link className='mt-4' href="/chat">채팅</Link>
          <Link className='mt-4' href="/chat">채팅</Link>
          <Link className='mt-4' href="/chat">채팅</Link>
      </div>
  )
}

export default Navbar