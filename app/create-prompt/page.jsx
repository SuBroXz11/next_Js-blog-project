'use client';
import { useState } from "react"
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Form from "@components/Form";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const page = () => {
  const router=useRouter();
  const {data:session}=useSession();
    const [submitting, setSubmitting]=useState(false);
    const [post, setPost]=useState({
        prompt:'',
        tag:'',
    })

    const CreatePrompt= async(e)=>{
      const notify=()=>toast("Prompt Created Successfully! ✅");
      e.preventDefault();
      setSubmitting(true);
      try {
        const response=await fetch('/api/prompt/new',{
          method:'POST',
          body: JSON.stringify({
            prompt:post.prompt,
            userId:session?.user.id,
            tag:post.tag
          })
        })
        if(response.ok){
          router.push('/');
          notify();
        }
      } catch (error) {
        console.log(error);
      }
      finally{
        setSubmitting(false);
      }
    }
  return (
    <Form
    type="Create"
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={CreatePrompt}
    />
  )
}

export default page;
