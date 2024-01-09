'use client'
import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((posts) =>
        <PromptCard
          key={posts._id}
          post={posts}
          handleTagClick={handleTagClick} />
      )}
    </div>
  )
}
const Feed = () => {
  const [post, setPost] = useState([])
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchResult, setSearchResult] = useState([]);


  const filteredPosts = (searchtext) => {
    const regex = new RegExp(searchtext, "i");
    return post.filter((item) =>
      regex.test(item.creator.username) ||
      regex.test(item.tag) ||
      regex.test(item.prompt));
  }
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filteredPosts(e.target.value);
        setSearchResult(searchResult);
      }, 500))
  }

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch('api/prompt');
      const data = await response.json();
      setPost(data);
    }
    fetchPost();
  }, [])

  const handleTagClick = (tag) => {
    setSearchText(tag)
   const searchResult= filteredPosts(tag)
   setSearchResult(searchResult)
  }
  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input type='text' placeholder="search for a tag or a username" value={searchText} onChange={handleSearchChange} required className='search_input peer' />
      </form>
      {
        searchText?(
        <PromptCardList data={searchResult} handleTagClick={handleTagClick} />):(
        <PromptCardList data={post} handleTagClick={handleTagClick} />
        )
      }
    </section>
  )
}

export default Feed;