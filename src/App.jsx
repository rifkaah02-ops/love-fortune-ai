import { useState } from "react"
import { motion } from "framer-motion"
import { generateLove } from "./gemini"

import { db } from "./firebase"

import {
collection,
addDoc,
serverTimestamp
} from "firebase/firestore"

function App() {

const [form,setForm]=useState({

initial:"",
crushDuration:"",
talked:"",
exist:"",
reason:"",
aware:"",
movement:"",
effort:"",
confidence:"",
future:""

})

const [result,setResult]=useState(null)
const [loading,setLoading]=useState(false)

async function handleSubmit(){

try{

setLoading(true)

const output=await generateLove(form)

let resultData={}

if(output.includes("DOOMED")){

resultData={

title:"💀 YOU'RE DOOMED",
image:"/doomed.png",
desc:"damn im sorry for you bro",
category:"DOOMED"

}

}

else if(output.includes("MOVE_ON")){

resultData={

title:"🚶 MOVE ON AJ",
image:"/moveon.png",
desc:"CARI YG LAIN AJA UDEHHH",
category:"MOVE_ON"

}

}

else if(output.includes("DELULU_OVERLOAD")){

resultData={

title:"DELULU ABISS GILA",
image:"/delulu.png",
desc:"JGN NGAYAL BISA BERHASIL LAH AOWKOWKOWK",
category:"DELULU_OVERLOAD"

}

}

else if(output.includes("MAYBE_THERE_IS_HOPE")){

resultData={

title:"WOY ADA HARAPANNNN",
image:"/hope.png",
desc:"LANJUTIN GANG, PEPET TERUS",
category:"MAYBE_THERE_IS_HOPE"

}

}

else{

resultData={

title:"🌱 Green Flag",
image:"/greenflag.png",
desc:"Hmm ada potensi nih 😭",
category:"GREEN_FLAG"

}

}

setResult(resultData)


// =========================
// SAVE KE FIREBASE
// =========================

await addDoc(

collection(
db,
"responses"
),

{

...form,

aiOutput:output,

result:resultData.category,

createdAt:
serverTimestamp()

}

)

console.log(
"Data berhasil masuk Firebase"
)

}

catch(error){

console.log(
"FULL ERROR:",
error
)

console.log(
error.message
)

let message=
error.message

setResult({

title:"😭 Error",
image:null,
desc:message

})

}


finally{

setLoading(false)

}

}

return(

<div className="min-h-screen bg-pink-100 p-10">

<h1 className="text-5xl font-bold text-center mb-10">

💘 Love Fortune AI

</h1>

<div className="bg-white p-6 rounded-3xl shadow-lg flex flex-col gap-4 max-w-xl mx-auto">

<input
className="border p-3 rounded-xl"
placeholder="Inisial crush"
value={form.initial}
onChange={(e)=>
setForm({
...form,
initial:e.target.value
})
}
/>

<input
className="border p-3 rounded-xl"
placeholder="Udah berapa lama ngecrush dia?"
value={form.crushDuration}
onChange={(e)=>
setForm({
...form,
crushDuration:e.target.value
})
}
/>

<input
className="border p-3 rounded-xl"
placeholder="Udah pernah ngobrol? sesering apa?"
value={form.talked}
onChange={(e)=>
setForm({
...form,
talked:e.target.value
})
}
/>

<input
className="border p-3 rounded-xl"
placeholder="Menurut lu dia tau lu ada ngga??"
value={form.exist}
onChange={(e)=>
setForm({
...form,
exist:e.target.value
})
}
/>

<textarea
className="border p-3 rounded-xl"
rows="3"
placeholder="Kenapa km suka sama dia?"
value={form.reason}
onChange={(e)=>
setForm({
...form,
reason:e.target.value
})
}
/>

<input
className="border p-3 rounded-xl"
placeholder="Menurut lu dia sadar ga lu suka sm dia?"
value={form.aware}
onChange={(e)=>
setForm({
...form,
aware:e.target.value
})
}
/>

<input
className="border p-3 rounded-xl"
placeholder="Udah pernah bikin movement?"
value={form.movement}
onChange={(e)=>
setForm({
...form,
movement:e.target.value
})
}
/>

<textarea
className="border p-3 rounded-xl"
rows="3"
placeholder="Kalau udah, pernah ngapain aja?"
value={form.effort}
onChange={(e)=>
setForm({
...form,
effort:e.target.value
})
}
/>

<input
className="border p-3 rounded-xl"
placeholder="Berapa persen keyakinan kalian bisa lanjut ke hubungan yang lebih serius?"
value={form.confidence}
onChange={(e)=>
setForm({
...form,
confidence:e.target.value
})
}
/>

<textarea
className="border p-3 rounded-xl"
rows="3"
placeholder="Harapan hubungan kalian ke depannya?"
value={form.future}
onChange={(e)=>
setForm({
...form,
future:e.target.value
})
}
/>

<button

disabled={loading}
onClick={handleSubmit}

className={`p-3 rounded-xl text-white

${loading
?
"bg-gray-400"
:
"bg-pink-500 hover:bg-pink-600"
}`}

>

{
loading
?
"🔮 Membaca nasib cinta..."
:
"Generate 💘"
}

</button>

</div>


{result && (

<div

className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"

onClick={()=>setResult(null)}

>

<motion.div

initial={{
scale:0,
opacity:0
}}

animate={{
scale:1,
opacity:1
}}

transition={{
duration:0.3
}}

className="bg-white p-8 rounded-3xl shadow-xl w-[400px] relative"

onClick={(e)=>e.stopPropagation()}

>

<button

className="absolute top-3 right-4"

onClick={()=>setResult(null)}

>

❌

</button>

{result.image && (

<img

src={result.image}

className="w-48 mx-auto rounded-xl"

/>

)}

<h1 className="text-3xl font-bold text-center mt-4">

{result.title}

</h1>

<p className="text-center mt-4">

{result.desc}

</p>

<button

className="bg-pink-500 text-white p-3 rounded-xl w-full mt-6"

onClick={()=>setResult(null)}

>

Close 💘

</button>

</motion.div>

</div>

)}

</div>

)

}

export default App