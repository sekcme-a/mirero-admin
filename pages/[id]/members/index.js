import { useRouter } from "next/router"
import ExcelList from "src/public/components/excelListPackage/ExcelList"
import { firestore as db } from "firebase/firebase"
import { useState, useEffect } from "react"

const ROW = [
  {
    title:"이름",
    width:"60%",
    id:"name",
    renderItem: (column) => {return(<div>{column.name}</div>)}
  },
  {
    title:"소속",
    width:"40%",
    id:"position",
    renderItem: (column) => {return(<div>{column.position}</div>)}
  },
  {
    title:"메인 유무",
    width:"150px",
    id:"isMain",
    renderItem: (column) => {
      return(
        <div style={column.isMain ? {color: "blue"} : {color:"orange"}}>{column.isMain ? "메인":"일반"}</div>
      )
    }
  },
  {
    title:"작성일",
    width:"150px",
    id:"createdAt",
    renderItem: (column) => {return(<div style={{fontSize:"13px"}}>{column.createdAt}</div>)}
  }
]

const COLUMN = [
  {name:"asdf", position:"미나어링", isMain: true, createdAt: "2023.02.25", id:"asdf"},
]

const Members = () => {
  const router = useRouter()
  const {id} = router.query
  const [column, setColumn] = useState([])

  useEffect(()=>{

    const fetchData = async () => {
      const query = await db.collection("team").doc(id).collection("members").orderBy("isMain","desc").orderBy("createdAt",'desc').get()
      const list = query.docs.map((doc) =>{
        return(
          {...doc.data(), id: doc.id, createdAt: formatDateToYYYYMMDD(doc.data().createdAt.toDate())}
        )
      })
      console.log(list)
      setColumn([...list])
    }
    fetchData()
  },[])

  const onNewClick = async() => {
    const doc = await db.collection("team").doc().get()
    router.push(`/${id}/members/${doc.id}`)
  }

  function formatDateToYYYYMMDD(date) {
    if(date instanceof Date){
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
      const day = String(date.getDate()).padStart(2, '0');
    
      return `${year}-${month}-${day}`;
    } else return "-"
  }

  return(
    <>
      <ExcelList
        hasNumberTag={true}
        hasSearchBox={true}
        rowData={ROW}
        countPerPage={10}
        columnData={column}
        onClick={(docId) => router.push(`/${id}/members/${docId}`)}
        onNewClick={onNewClick}
      />
    </>
  )
}

export default Members