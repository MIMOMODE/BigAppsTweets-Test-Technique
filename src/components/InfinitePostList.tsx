import InfiniteScroll from "react-infinite-scroll-component";
import { ProfileImage } from "./ProfileImage";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import { HeartIconeHoverEffect } from "./HeartIconeHover"
import { api } from "~/utils/api";

type Posts ={
    id: string;
    content: string;
    createdAt: Date;
    likeCount: number;
    likedByMe: boolean;
    user: { id: string; image: string | null; name: string | null}
}

type InfinitePostListProps = {
    isLoading: boolean;
    isError: boolean;
    hasMore: boolean;
    fetchNewPosts: ()=> Promise<unknown>;
    posts?: Posts[];
}

export function InfinitePostList({ posts, isError, isLoading, fetchNewPosts, hasMore }: InfinitePostListProps){
    if (isLoading) return <h1>Un petit moment ...</h1>
    if (isError) return <h1>Error ...</h1>
    if (posts == null) return null

    if (posts == null || posts.length === 0){
        return <h1 className="my-4 text-center text-2xl text-gray-500">Pas de posts pour le moment</h1>
    }
    return <ul>
        <InfiniteScroll
        dataLength={posts.length}
        next={fetchNewPosts}
        hasMore={hasMore}
        loader={"Chargement..."}>
            {posts.map(post =>{
                return <PostsCard key={post.id} {...post} />;
            } )}

        </InfiniteScroll>
    </ul>
}
const dateTimeFormatter = new Intl.DateTimeFormat(undefined, { dateStyle: "short", timeStyle: "short" })
function PostsCard({id, user, content, likeCount, likedByMe, createdAt} : Posts){
    const utilsTrpc = api.useUtils()
    const toggleLike = api.timeline.toggleLike.useMutation({onSuccess: async ({ addedLike })=>{
        if (addedLike){
            await utilsTrpc.timeline.infiniteFeed.invalidate()
        }
    }
    });
    function handleToggleLike(){
        toggleLike.mutate({ id })
    }
    return <li className="flex gap-4 border-b px-4 py-4">
    <Link href={`/profiles/${user.id}`}>
        <ProfileImage src={user.image}/>
    </Link>
    <div className="flex flex-grow flex-col">
        <div className="flex gap-1">
            <Link href={`/profiles/${user.id}`} className="font-bold hover:underline focus-visible:underline">
            {user.name}
            </Link>
            <span className="text-gray-500"> - </span>
            <span className="text-gray-500">{dateTimeFormatter.format(createdAt)}</span>
        </div>
        <p className="whitespace-pre-wrap">{content}</p>
        <LikeButton onClick={handleToggleLike} isLoading={toggleLike.isLoading} likedByMe={ likedByMe } likeCount={ likeCount }  />
    </div>
    </li>
}

type LikeButtonProps = {
    likedByMe: boolean
    likeCount: number
    isLoading: boolean
    onClick: () => void
}

function LikeButton({ likedByMe, likeCount, isLoading, onClick }: LikeButtonProps){
    const session = useSession()
    const HeartIcon = likedByMe ? VscHeartFilled : VscHeart;
    if (session.status !== "authenticated"){
        return <div className="mb-1 mt-1 flex items-center gap-3 self-start text-gray-500">
            <HeartIcon />
            <span>{ likeCount }</span>
        </div>
    }
    return <button disabled={isLoading} onClick={onClick} className={`group flex items-center gap-1 self-start transition-colors duration-200 ${likedByMe 
    ?   "text-red-500"
    :   "text-gray-500 hover:text-red-500 focus-visible:text-red-500"}`}>

        <HeartIconeHoverEffect red>

        <HeartIcon className={`transition-colors duration-180 ${likedByMe
    ?   "fill-red-500" 
    :   "fill-gray-500 group-hover:fill-red-500 group-focus-visible:fill-red-500"
        }`} 
        />
        </HeartIconeHoverEffect>
        <span>{likeCount}</span>
    </button>
}