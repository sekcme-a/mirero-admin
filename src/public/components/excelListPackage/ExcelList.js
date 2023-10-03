import { useState } from "react"
import styles from "./ExcelList.module.css"
import { useEffect } from "react"

import Pagination from '@mui/material/Pagination';
import { TextField, InputAdornment, Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const ExcelList = ({hasNumberTag, hasSearchBox, rowData, countPerPage, columnData, onClick, onNewClick}) => {
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(1)
  const handleChange = (event, value) => {
    setPage(value)
  }
  const [listForThisPage, setListForThisPage] = useState([])
  const [filteredColumn, setFilteredColumn] = useState([...columnData])

  const [input, setInput] = useState("")

  useEffect(()=>{
    setPage(1)
    setFilteredColumn(columnData)
    if(columnData.length%(countPerPage)===0)  setCount(columnData.length/countPerPage)
    else setCount((Math.trunc(columnData.length/(countPerPage+1))+1))
  },[columnData])

  //페이지에 따라 보이는 게시물 변경
  useEffect(()=> {
    const listForCurrentPage = filteredColumn.slice((page-1)*countPerPage, (countPerPage*page))
    setListForThisPage(listForCurrentPage)
  },[page, filteredColumn])

  useEffect(()=>{
    if(input==="")
      setListForThisPage(columnData)
  },[input])

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      if(input==="") setFilteredColumn(columnData)
      else{
        const filteredData = filterData(columnData, input)
        setFilteredColumn(filteredData)
      }
    }
  };
  const filterData = (list, input) => {
    return list.filter(item => {
      return Object.values(item).some(value =>
        String(value).toLowerCase().includes(input.toLowerCase())
      );
    });
  }


  return(
    <>
      {hasSearchBox && 
        <>
          <div style={{display:"flex", justifyContent:"space-between", marginTop:"10px"}}>
            <Button
              variant="contained"  
              size="small"
              onClick={onNewClick}
            >
              + 멤버 추가
            </Button>
            <TextField
              label="Search"
              variant="outlined"
              value={input}
              onChange={(e)=>setInput(e.target.value)}
              size="small"
              onKeyDown={handleKeyPress}
              InputProps={{
                endAdornment: <InputAdornment position="end"><SearchIcon /></InputAdornment>,
              }}
              className={styles.search_box}
            />
          </div>
        </>
      }
      <div className={styles.list_container}>
        <div className={styles.header}>
          {hasNumberTag && <div className={styles.row} style={{width:"100px"}}>No</div>}
          {
            rowData.map((row, index) => {
              return(
                <div className={styles.row} key={index} style={{width: row.width}}>
                  {row.title}
                </div>
              )
            })
          }
        </div>

        <ul className={styles.list}>
          {listForThisPage.map((column, index) => {
            return(
              <li key={column.id} onClick={()=>onClick(column.id)}>
                <div className={styles.no}>{columnData?.length-((10*(page-1))+index)}</div>
                {
                  rowData.map((row, index2) => {
                    return(
                      <div className={styles.row} key={index2} style={{width: row.width}}>
                        
                        {/* {row.renderItem ? column[row.id] : row.renderItem(column)} */}
                        {row.renderItem(column)}
                      </div>
                    )
                  })
                }
              </li>
            )
          })}
        </ul>


        <div className={styles.center} style={{marginTop:"30px"}}>
          <Pagination count={count} page={page} onChange={handleChange} />
        </div>
      </div>
    </>
  )
}

export default ExcelList