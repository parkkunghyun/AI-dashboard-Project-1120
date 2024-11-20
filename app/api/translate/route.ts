import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { inputText, selectedLanguage } = await request.json();
    // 비동기를 기다려야함!! ts특!
    //  반환 값을 직접 구조 분해 할당하려고 하면 타입스크립트가 이를 허용하지 않습니다.
    // 대신, await 키워드를 사용하여 request.json()의 결과를 기다린 뒤 구조 분해 할당을 해야 합니다.
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY;

    if (!inputText || !selectedLanguage) {
        return NextResponse.json({ error: 'Text or Language is missing' }, { status: 400 });
    }

    try {
        const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    q: inputText,
                    target: selectedLanguage,
                }),
            }
        );
        const data = await response.json();
        if (response.ok && data.data) {
            return NextResponse.json({translatedTextResult: data.data.translations[0].translatedText});
        }
    } catch (e) {
        console.error('Error during translation request:', e);
        return NextResponse.json({ error: 'Text or Language is missing', details: e instanceof Error? e.message : String(e) }, { status: 500 });
    }
}