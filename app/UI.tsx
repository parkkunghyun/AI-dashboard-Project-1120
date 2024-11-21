"use client"
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useEffect, useState } from 'react';

export default function UI({ children }: { children: React.ReactNode }) {
    const [isMobile, setIsMobile] = useState(false);

  // 화면 크기 변화에 따라 상태를 업데이트하는 함수
  const checkMobile = () => {
    if (window.innerWidth <= 800) {
      setIsMobile(true);  // 모바일 화면 크기일 때
    } else {
      setIsMobile(false); // 모바일 화면 크기가 아닐 때
    }
  };

    // 컴포넌트가 마운트될 때와 화면 크기가 변경될 때마다 checkMobile 호출
    useEffect(() => {
    checkMobile();  // 초기 화면 크기 체크
    window.addEventListener("resize", checkMobile);  // 화면 크기 변화 이벤트 리스너 추가

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []); // 빈 배열을 넣어 컴포넌트가 마운트될 때 한 번만 실행되게 함

  return (
    <>
          {isMobile ? (
              <div className="flex flex-col items-center">
                  <Navbar />
                  <main>{children}</main>
                </div>
          ) : (
                  <div className="flex w-full h-screen">
                      <Sidebar />
                      <main className="flex justify-center w-full">{children}</main>
                  </div>
          ) }
    </>
  );
};