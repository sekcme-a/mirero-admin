import { createContext, useState, useContext } from "react";
import { firestore as db } from "firebase/firebase";
import { useRouter } from "next/router";
import { useEffect } from "react";
const dataContext = createContext()

export default function useUserData(){
    return useContext(dataContext)
}

export function UserDataProvider(props){
    const [user, setUser] = useState(null) //I'm
    const [userData, setUserData] = useState(null) //user data from db
    const [isLoading, setIsLoading] = useState(true)

    const router = useRouter()
    const {id} = router.query
  
    //** 보안 설정 */
    useEffect(()=>{
      const fetch_data = async () => {
        setIsLoading(true)
        if(id && user){
          const doc = await db.collection("user").doc(user.uid).get()
          
          if(doc.exists){
            setUserData(doc.data())
            if(doc.data().roles.includes("super_admin")||doc.data().roles.includes(`${id}_admin`)||doc.data().roles.includes(`${id}_high_admin`)||doc.data().roles.includes(`${id}_super_admin`)){
              
            } else
              router.push(`/${id}/noAuthority`)
          }
        }
        setIsLoading(false)
      }
      fetch_data()  
    },[id, user])
  

    const value = {
        user, setUser,
        userData, setUserData
    }

    if(isLoading) return <></>

    return <dataContext.Provider value={value} {...props} />
}