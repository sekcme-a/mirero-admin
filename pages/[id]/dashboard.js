import { useEffect, useState } from "react";
import useUserData from "context/userData";
import useData from "context/data";
import { useRouter } from "next/router";

const Dashboard = () => {
  const {user, userData} = useUserData
  const router = useRouter()

  // useEffect(()=>{
  //   if(!(userData.roles.includes("super_admin") || userData.roles.includes(`${id}_admin`))){
  //     alert("접근 권한이 없습니다.")
  //     router.push("/")
  //   }
  // },[])
  
  return(
    <>
    
    </>
  )
}

export default Dashboard