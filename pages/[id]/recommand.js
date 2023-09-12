import { useEffect, useState } from "react";
import useUserData from "context/userData"
import { useRouter } from "next/router";
import ContactList from "src/public/components/ContactList";
import { firestore as db } from "firebase/firebase";
import { CircularProgress } from "@mui/material";

const Contact = () => {
  const {user, userData} = useUserData
  const router = useRouter()
  const {id} = router.query
  const [list, setList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{
    const fetchData = async () => {
      const query = await db.collection("team_admin").doc(id).collection("recommand").orderBy("createdAt", "desc").get()
      const docList = query.docs.map((doc) => {
        return {...doc.data(), id: doc.id}
      })  
      setList(docList)
      setIsLoading(false)
    }
    fetchData()
  },[])
  
  if(isLoading) return(
    <CircularProgress />
  )
  
  return(
    <>
      <ContactList list={list} type="recommand" countPerPage={10}/>
    </>
  )
}

export default Contact