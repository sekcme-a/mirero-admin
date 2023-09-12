import { useEffect, useState } from "react";
import useUserData from "context/userData"
import { useRouter } from "next/router";
import { firestore as db } from "firebase/firebase";
import styles from "src/message/message.module.css"
import { Button, CircularProgress } from "@mui/material";
const Home = () => {
  const {user, userData} = useUserData
  const router = useRouter()
  const {id, type, docId} = router.query
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)


  useEffect(()=>{
    const fetchData = async () => {
      const doc = await db.collection("team_admin").doc(id).collection(type).doc(docId).get()
      console.log(doc.data())
      if(doc.exists){
        setData({...doc.data()})
        await db.collection("team_admin").doc(id).collection(type).doc(docId).update({unread: false})
        setIsLoading(false)
      } else {
        alert('삭제되거나 없는 문의입니다.')
        router.back()
      }
    }
    fetchData()
  },[])

  if(isLoading) return(<CircularProgress />)
  
  return(
    <div className={styles.main_container}>
      <h1>제목: <p>{data.subject}</p></h1>
      <h1>작성일: <p>{data.createdAt?.toDate().toLocaleString()}</p></h1>
      <h1>신청인: <p>{data.name}</p></h1>
      <h1>이메일: <p>{data.email}</p></h1>
      <h1>전화번호: <p>{data.number}</p></h1>
      <h2>문의내용: <p>{data.text}</p></h2>
      <div className={styles.button_container}>
        <Button
          variant="contained"
          onClick={()=> router.back()}
          sx={{mt:"30px"}}
        >
          {`< 돌아가기`}
        </Button>
      </div>
    </div>
  )
}

export default Home