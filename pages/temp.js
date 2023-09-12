import { useEffect, useState } from "react";
import useUserData from "context/userData"
import { useRouter } from "next/router";
import { TextField, Button } from "@mui/material";

const Temp = () => {
  const {user, userData} = useUserData
  const router = useRouter()

  const [원가, 셋원가] = useState("")
  const [지에스가, 셋지에스가] = useState("")
  const [판매가, 셋판매가] = useState("")
  const [실마진율, 셋실마진율] = useState("")
  const [실수익, 셋실수익] = useState("")

  useEffect(()=>{

  },[])

  const onCommitClick = () => {
    const 실원가 = (parseInt(원가)*1.1).toFixed(0)
    const 최소판매가 = (원가*1.1*1.3).toFixed(0)
    if(최소판매가>=지에스가*0.9){
      const _판매가 = Math.ceil(최소판매가 / 100) * 100
      셋판매가(_판매가)
      셋실마진율(Math.round( (_판매가*0.9-실원가)/원가 *100 * 10) / 10)
      셋실수익(_판매가*0.9-실원가)
    } else{
      let _판매가
      if(지에스가*0.9-최소판매가>200){
        _판매가 = Math.ceil((지에스가-200) / 100) * 100
      } else {
        _판매가 = Math.ceil((지에스가*0.9) / 100) * 100
      }
      셋판매가(_판매가)
      셋실마진율(Math.round( (_판매가*0.9-실원가)/원가 *100 * 10) / 10)
      셋실수익(_판매가*0.9-실원가)
    }
  }
  
  return(
    <>
      <TextField
        label="원가"
        variant="standard"
        value={원가}
        onChange={(e)=>셋원가(e.target.value)}
        size="small"
      />
      <TextField
        label="GS가"
        variant="standard"
        value={지에스가}
        onChange={(e)=>셋지에스가(e.target.value)}
        size="small"
      />
      <Button
        variant="contained"
        onClick={onCommitClick}
      >
        확인
      </Button>
      <div style={{display:"flex", alignItems:"center", marginTop:"20px"}}>판매가:<h1 style={{fontSize:"30px", fontWeight:"bold", marginLeft:"10px"}}>{판매가}원</h1></div>
      <div style={{display:"flex", alignItems:"center", marginTop:"20px"}}>실마진율:<h1 style={{fontSize:"30px", fontWeight:"bold", marginLeft:"10px"}}>{실마진율}%</h1></div>
      <div style={{display:"flex", alignItems:"center", marginTop:"20px"}}>실수익:<h1 style={{fontSize:"30px", fontWeight:"bold", marginLeft:"10px"}}>{실수익}원</h1></div>
    </>
  )
}

export default Temp