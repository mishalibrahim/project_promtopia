"use client";

import {useEffect ,useState} from 'react';
import {useRouter,useSearchParams } from 'next/navigation'

import Form from '@components/Form'
const EditPrompt = () => {

    const router=useRouter();
    const [submitting,setSubmitting]=useState(false);
    const searchParams=useSearchParams();
    const promptid=searchParams.get('id');
    const [post,setPost]=useState({
        prompt:'',
        tag:''
    });

    useEffect(()=>{
        const getPrompts=async()=>{
            const response=await fetch(`/api/prompt/${promptid}`)
            const data= await response.json()

            setPost({
                prompt:data.prompt,
                tag:data.tag
            })
        }
        if(promptid)getPrompts()
    },[promptid])
    const updatePrompt= async(e)=>{
        e.preventDefault();
        setSubmitting(true);

        if(!promptid)return alert('prompt Id not found ')
        try {
            const response= await fetch(`api/prompt/${promptid}`,{
                method: 'PATCH',
                body:JSON.stringify({
                    prompt:post.prompt,
                    tag:post.tag
                })
            })

            if(response.ok){
                router.push('/');
            }   
        } catch (error) {
            console.log(error)
        } finally{
            setSubmitting(false)
        }
    }
  return (
  <Form type="Edit"
   post={post}
    setPost={setPost}
     submitting={submitting}
     handleSubmit={updatePrompt}/>
  )
}
export default EditPrompt;