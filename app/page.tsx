"use client"

import { useState } from "react";

export default function Home() {
  const [inputText, setInputText] = useState<string>("");
  const [translateText, setTranslateText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");

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
  return (
    <div className="h-screen">
      <h1>test </h1>
      <input value={inputText} onChange={e=>setInputText(e.target.value)} type="text" placeholder="번역할 내용을 입력하세요" />
      <select name="languages" value={selectedLanguage} onChange={e => setSelectedLanguage(e.target.value)} id="language-select">
        <option value="ko">한국어</option>
        <option value="en">영어</option>
        <option value="zh">중국어</option>
        <option value="ja">일본어</option>
      </select>
     <button onClick={handleTranslate}>번역하기</button>

      <p>결과: {translateText}</p>
    </div>
  );
}
