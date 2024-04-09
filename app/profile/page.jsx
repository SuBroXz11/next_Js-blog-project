"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profiles from "@components/Profiles";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const router=useRouter()
  const {data:session}=useSession();
  const [posts, setPosts] = useState([]);
  const handleEdit=(post)=>{
    router.push(`/update-prompt?id=${post._id.toString()}`)
  }
  const handleDelete = async (post) => {
    const notify=()=>toast("Prompt Deleted Successfully! ✅");
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed){
      try {
        await fetch(`/api/prompt/${post._id}`,{
          method:'DELETE'
        });

        const filteredPosts=posts.filter((p)=>p._id !== post._id);

        setPosts(filteredPosts);
        notify();
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(()=>{
    const fetchPosts=async()=>{
      const response=await fetch(`/api/users/${session?.user.id}/posts`);
      const data=await response.json();
      setPosts(data);
    }
    if(session?.user.id) fetchPosts();
  },[]);
  return (
    <div>
      <Profiles 
      name="My"
      desc="Welcome to your Personalized Profile Page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      />
    </div>
  )
}

export default Profile
