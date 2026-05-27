import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI=new GoogleGenerativeAI(
import.meta.env.VITE_GEMINI_API_KEY
)

export async function generateLove(data){

const model=
genAI.getGenerativeModel({
  model:"gemini-2.5-flash"
})

const prompt=`

Kamu adalah classifier Love Fortune AI.

Analisis data berikut:

Inisial: ${data.initial}

Lama ngecrush:
${data.crushDuration}

Udah ngobrol:
${data.talked}

Dia tau user ada:
${data.exist}

Alasan suka:
${data.reason}

Dia sadar user suka:
${data.aware}

Movement:
${data.movement}

Usaha:
${data.effort}

Keyakinan:
${data.confidence}

Harapan:
${data.future}

RULES:

- Belum pernah ngobrol + crush ga sadar user ada + confidence tinggi → DELULU_OVERLOAD

- Crush bahkan ga tau user ada + ga ada movement → DOOMED

- Ada interaksi kecil tapi peluang tipis → MOVE_ON

- Sudah ada usaha atau interaksi → MAYBE_THERE_IS_HOPE

- Ada interaksi jelas + usaha nyata → GREEN_FLAG


PENTING:
Jawab HANYA salah satu kata berikut:

DOOMED
MOVE_ON
DELULU_OVERLOAD
MAYBE_THERE_IS_HOPE
GREEN_FLAG

JANGAN tambahkan penjelasan apa pun.

`
const result=
await model.generateContent(prompt)

return result.response.text()

}