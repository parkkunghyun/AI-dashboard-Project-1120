"use client";
import React, { useState, useEffect } from 'react';

const TranslatePage = () => {
  const [inputText, setInputText] = useState<string>("");
  const [translateText, setTranslateText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  // 번역 요청 함수
  const handleTranslate = async () => {
    if (!inputText || !selectedLanguage) {
      alert("번역할 텍스트를 입력해주세요");
      return;
    }
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputText,
          selectedLanguage,
        }),
      });

      if (response.ok) {
        const { translatedTextResult } = await response.json();
        setTranslateText(translatedTextResult);
      } else {
        console.error('Translation API error:', response.statusText);
      }
    }
    catch (e) {
      if (e instanceof Error) {
        console.error('Error during Text translation:', e.message);
      } else {
        console.error('An unknown error occurred');
      }
    }
  }

  // 언어가 변경될 때마다 번역 호출
  useEffect(() => {
    if (inputText) {
      handleTranslate();
    }
  }, [selectedLanguage]); // selectedLanguage가 변경될 때마다 실행

  return (
    <div className="flex flex-col items-center w-full h-screen gap-4 mt-16">
      <h1 className="mb-16 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">TRANSLATE</h1>

      <div className='flex gap-16'>
        <div className='relative'>
          <input
            className='border shadow-lg rounded-lg p-4 h-[300px] w-[300px] focus:outline-none '
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            type="text"
            placeholder="번역할 내용을 입력하세요"
          />
          <select
            className='absolute p-2 top-1 right-2 hover:text-yellow-700 focus:outline-none '
            name="languages"
            value={selectedLanguage}
            onChange={e => setSelectedLanguage(e.target.value)}
            id="language-select"
          >
            <option value="ko">한국어</option>
            <option value="en">영어</option>
            <option value="zh">중국어</option>
            <option value="ja">일본어</option>
          </select>
          <p className='absolute w-full border border-gray-200 top-10'></p>
          <button type="button"
            onClick={handleTranslate}
            className="absolute bottom-1 right-1 bg-gradient-to-r py-2 px-4 rounded-lg from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 ...">
            번역하기
          </button>
        </div>

        <div className='border relative flex flex-col justify-center shadow-lg rounded-lg h-[300px] w-[300px] '>
          <p className='absolute w-full border border-gray-200 top-10'></p>
          <p className='p-2'>{translateText}</p>
        </div>
      </div>
    </div>
  );
}

export default TranslatePage;
