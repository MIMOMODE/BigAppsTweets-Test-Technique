import { type NextPage } from "next";
import { NewTimelineForm } from "../components/NewTimelineForm"
import { api } from "~/utils/api";
import { InfinitePostList } from "~/components/InfinitePostList";
const Home: NextPage = () =>{
  return <>
  <header className="sticky top-0 z-10 border-b bg-white pt-2">
    <h1 className="mb-2 px-4 text*lg font-bold">Home</h1>
  </header>
  <NewTimelineForm />
  <RecetPosts />
  </>
}

function RecetPosts(){
  const posts = api.timeline.infiniteFeed.useInfiniteQuery({}, { 
    getNextPageParam: (lastPage) => lastPage.nextCursor
  });

  return <InfinitePostList 
  posts={posts.data?.pages.flatMap((page) => page.timeline)} 
  isError={posts.isError}
  isLoading={posts.isLoading}
  hasMore={posts.hasNextPage}
  fetchNewPosts={posts.fetchNextPage}
  />
}

export default Home;