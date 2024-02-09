import { Button } from "./Button"
import { ProfileImage } from "./ProfileImage"
import { useSession } from "next-auth/react"
import { useCallback, useLayoutEffect, useRef, useState } from 'react'

function updateTextArea(textArea?: HTMLTextAreaElement){
    if (textArea == null) return
    textArea.style.height = "0"
    textArea.style.height = `${textArea.scrollHeight}px`
}

function Form(){
    const session = useSession()
    const [inputValue, setInputValue] = useState("")
    const textAreaRef = useRef<HTMLTextAreaElement>()
    const inputRef = useCallback((textArea : HTMLTextAreaElement) =>{
        updateTextArea(textArea);
        textAreaRef.current = textArea
    }, [])
    useLayoutEffect(() =>{
        updateTextArea(textAreaRef.current)
    }, [inputValue])

    if (session.status !== "authenticated") return
    return <form className="flex flex-col gap-2 bordser-b px-4 py-2">
        <div className="flex gap-4">
            <ProfileImage src={session.data?.user.image} />
        <textarea ref={inputRef} style={{height: 0}} value={inputValue} onChange={e => setInputValue(e.target.value)} className="flex-grow resize-none overflow-hidden p-4 text-lg" placeholder="Quoi de neuf ?"/>
        </div>
        <Button>Poster</Button>
    </form>
}

export function NewTimelineForm() {
    const session = useSession()
    if (session.status !== "authenticated") return
    return <Form/>
}