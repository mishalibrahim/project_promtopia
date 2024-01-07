"use client"

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Profile from '@components/Profile';
const UserProfile = ({params}) => {
  const router =useRouter();
  const searchParams=useSearchParams()
  const userName=searchParams.get('name')
  console.log(userName);
  const [posts, setPosts] = useState([]);

  
  useEffect(() => {
    const fetchPost = async () => {
      console.log('fetching')
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();
      setPosts(data);
    }
    if (params?.id) fetchPost()
  }, [params?.id])
  return (
    <Profile
      name={userName}
      desc={`welcome to ${userName} personalised page, Explore ${userName} exceptional prompts and be inspired by thier power of imagination`}
      data={posts}
/>
  )
}

export default UserProfile