import styles from "./Topbar.module.css"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import AvatarWithMenu from "./AvatarWithMenu"
import useUserData from "context/userData"
import useData from "context/data"
import { firestore as db } from "firebase/firebase"

const titleData = {
  dashboard: "대쉬보드",
  "team/manageTeam" : "구성원 관리",
  "team/teamProfile" : "팀 프로필", 
}

const Topbar = () => {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const {user, userData} = useUserData()
  const {team} = useData()
  const photo = userData?.profile
  const {type, postId} = router.query



  useEffect(()=>{
    if(router.pathname.includes("/post/edit"))
      setTitle("게시물 편집")
    else if (type==="announcement")
      setTitle("공지사항")
    else if (type==="tomorlove")
      setTitle("투마럽클럽")
    else if (type==="notice")
      setTitle("게시판")
    else if(router.pathname.includes("/contact"))
      setTitle("문의사항 관리")
    else if(router.pathname.includes("/members"))
      setTitle("멤버 관리")
    else 
      setTitle(titleData[router.pathname.slice(6)])
  },[router])

  return(
    <div className={styles.main_container}>
      <h1>{title}</h1>
      <AvatarWithMenu photo={photo}  />
    </div>
  )
}

export default Topbar