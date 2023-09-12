import { useEffect, useState } from "react";
import useUserData from "context/userData";
import useData from "context/data";
import { useRouter } from "next/router";

const Dashboard = () => {
  const {user, userData} = useUserData
  const router = useRouter()

  useEffect(()=>{

  },[])
  
  return(
    <>
    
    </>
  )
}

export default Dashboard