import { Button } from "./Button"
import { ProfileImage } from "./ProfileImage"
import { useSession } from "next-auth/react"
import { FormEvent, useCallback, useLayoutEffect, useRef, useState } from 'react'
import { api } from "~/utils/api"
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
    const trpcUtils = api.useUtils();
    useLayoutEffect(() =>{
        updateTextArea(textAreaRef.current)
    }, [inputValue])
    const createPost = api.timeline.create.useMutation({
        onSuccess: (newTimeline: any) => {
          setInputValue("");
          if (session.status !== "authenticated") return

          trpcUtils.timeline.infiniteFeed.setInfiniteData({}, (oldData) =>{
            if (oldData == null || oldData.pages[0] == null) return
            const newCacheTimeline= {
                ...newTimeline,
                likeCount: 0,
                likedByMe: false,
                user: {
                    id: session.data?.user.id || null,
                    name: session.data?.user.name || null,
                    image: session.data?.user.image || null,
                }
            }
            return {
                ...oldData,
                pages: [{
                    ...oldData.pages[0],
                    posts: [newCacheTimeline, oldData.pages[0].posts]
                }
                ],
                ...oldData.pages.slice(1)
            }
          })
        }
      });
      

    function handleSubmit (e: FormEvent){
        createPost.mutate({ content: inputValue })
    }

    if (session.status !== "authenticated") return
    return <form onSubmit={handleSubmit} className="flex flex-col gap-2 bordser-b px-4 py-2">
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