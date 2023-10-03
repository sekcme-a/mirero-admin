import { useEffect, useState } from "react"
import { firestore as db } from "firebase/firebase"
import useData from "context/data"
import styles from "src/team/teamProfile/teamProfile.module.css"
import Image from "next/image"
import DropperImage from "src/public/components/DropperImage"
import { Checkbox, TextField } from "@mui/material"
import { Button } from "@mui/material"
import { CircularProgress } from "@mui/material"
import { useRouter } from "next/router"


const MemberId = () => {
  const router = useRouter()
  const {id, memberId} = router.query
  const [name, setName] = useState("")
  const [position, setPosition] = useState("")
  const [profile, setProfile] = useState("")
  const [isMain, setIsMain] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isImageLoading, setIsImageLoading] = useState(false)

  useEffect(() => {

    const fetchData = async () => {
      const doc = await db.collection("team").doc(id).collection("members").doc(memberId).get()
      if(doc.exists){
        setName(doc.data().name)
        setPosition(doc.data().position)
        setProfile(doc.data().profile)
        setIsMain(doc.data().isMain)
      }
    }
    fetchData()
  },[memberId])


  const handleTeamProfileChange = async (url) => {
    const doc = await db.collection("team").doc(id).collection("members").doc(memberId).get()
    if(doc.exists){
      db.collection("team").doc(id).collection("members").doc(memberId).update({
        profile: url
      }).then(()=>{
        setProfile(url)
      })
    } else {
      db.collection("team").doc(id).collection("members").doc(memberId).set({
        profile: url
      }).then(()=>{
        setProfile(url)
      })
    }
  }

  const onSubmitClick = async() => {
    if(name>12){
      alert("팀명은 12글자 이내여야 합니다.")
      return;
    }
    setIsSubmitting(true)
    await db.collection("team").doc(id).collection("members").doc(memberId).set({
      name: name,
      position: position,
      profile: profile,
      createdAt: new Date(),
      isMain: isMain
    })
    setIsSubmitting(false)
  }

  const onDeleteClick =  async () => {
    await db.collection("team").doc(id).collection("members").doc(memberId).delete()
    alert("삭제되었습니다.")
    router.back() 
  }


  return(
    <>
      <div className={styles.main_container}>
        <div className={styles.profile_container}>
          <h1>멤버 프로필</h1>
          {isImageLoading ? <CircularProgress /> :  <Image src={profile} width={150} height={150} alt="팀 프로필"/>}

          <h1>멤버 프로필 변경</h1>
          <p>*가로 세로 사이즈가 동일한 정사각형 이미지 사용을 권장합니다.</p>
          <DropperImage imgURL={profile} setImgURL={handleTeamProfileChange} path={`${id}/members/${memberId}`} setLoading={setIsImageLoading}>
            
          </DropperImage>

          <h1>메인 유무</h1>
          <div style={{display:"flex", flexWrap:"wrap", alignItems:"center"}}>
            <Checkbox 
              checked={isMain}
              onChange={(e)=>setIsMain(e.target.checked)}
            /><h2>메인</h2>
          </div>


          <h1>이름</h1>
          <p style={{marginBottom:"10px"}}>*이름은 12글자 이내여야 합니다.</p>
          <TextField value={name} onChange={e=>setName(e.target.value)} size="small"/>

          <h1>소속</h1>
          <p style={{marginBottom:"10px"}}>*소속은 15글자 이내여야 합니다.</p>
          <TextField value={position} onChange={e=>setPosition(e.target.value)} size="small"/>
          {isSubmitting ? <CircularProgress />: <Button variant="contained" onClick={onSubmitClick} sx={{ml:"10px"}}>적용</Button>}
          <Button
            variant="contained"
            onClick={onDeleteClick}
            color="error"
            sx={{ml:"20px"}}
          >
            삭제
          </Button>
        </div>
      </div>
    </>
  )
}

export default MemberId