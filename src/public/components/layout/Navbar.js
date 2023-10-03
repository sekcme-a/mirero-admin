import { useEffect, useState } from "react";
import styles from "./Navbar.module.css"
import Image from "next/image";
import { useRouter } from "next/router";
import useData from "context/data";
import { firestore as db } from "firebase/firebase";

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import GroupIcon from '@mui/icons-material/Group';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import EditNotificationsIcon from '@mui/icons-material/EditNotifications';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import BackupTableOutlinedIcon from '@mui/icons-material/BackupTableOutlined';
import SnippetFolderOutlinedIcon from '@mui/icons-material/SnippetFolderOutlined';
import RuleRoundedIcon from '@mui/icons-material/RuleRounded';
import EditNotificationsOutlinedIcon from '@mui/icons-material/EditNotificationsOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { CircularProgress } from "@mui/material";
import BorderColorIcon from '@mui/icons-material/BorderColor';

import PostAddIcon from '@mui/icons-material/PostAdd';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import YouTubeIcon from '@mui/icons-material/YouTube';
import useUserData from "context/userData";

import Groups2Icon from '@mui/icons-material/Groups2';

const Navbar = () => {
  const router = useRouter()
  const {id} = router.query
  const {team, fetch_team} = useData()
  const [isLoading, setIsLoading] = useState(true)
  const {userData} = useUserData()

  const [openedItem, setOpenedItem] = useState(-1)

  // useEffect(()=>{
  //   if(userData?.roles && !(userData.roles.includes("super_admin") || userData.roles.includes(`${id}_admin`)|| userData.roles.includes(`${id}_high_admin`)||userData.roles.includes(`${id}_super_admin`))){
  //     alert("접근 권한이 없습니다.")
  //     router.push("/")
  //   }
  // },[userData])

  useEffect(()=>{
    const fetch_data = async () => {
      if(!team)
        await fetch_team(id)
      setIsLoading(false)
    }
    fetch_data()
  },[])

  const handleItemClick = id => {
    if(openedItem===id)
      setOpenedItem(-1)
    else
      setOpenedItem(id)
  }

  const uppercase = (text) => {
    return text?.charAt(0).toUpperCase() + text?.slice(1)
  }

  const onClick = (loc) => {
    router.push(`/${team.teamId}/${loc}`)
  }

  return (
    <div className={styles.main_container}>
      <div className={styles.header}>
        {isLoading ? <CircularProgress /> : team &&
          <>
            <Image src={team.profile} width={45} height={45} alt="logo" />
            <div style={{marginLeft: "20px"}}>
              <h1>Admin Team </h1>
              <h2>{uppercase(team?.teamName)}</h2>
            </div>
          </>
        }
      </div>
   <List
      sx={{ width: '100%', maxWidth: 300, bgcolor: "rgba(255, 255, 255, 0.87)" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >

      <ListItemButton onClick={()=>handleItemClick(0)}>
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="팀 관리" />
        {openedItem===0 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openedItem===0} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} onClick={()=>onClick("team/teamProfile")}>
              <ListItemIcon>
                <AccountBoxOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="팀 프로필" />
            </ListItemButton>
          </List>


          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} onClick={()=>onClick("team/manageTeam")}>
              <ListItemIcon>
                <Diversity3Icon />
              </ListItemIcon>
              <ListItemText primary="구성원 관리" />
            </ListItemButton>
          </List>

        </Collapse>



        <ListItemButton onClick={()=>handleItemClick(1)}>
        <ListItemIcon>
          <PostAddIcon />
        </ListItemIcon>
        <ListItemText primary="게시물 관리" />
          {openedItem===1 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openedItem===1} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} onClick={()=>onClick("post/announcement")}>
              <ListItemIcon>
                <CampaignOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="공지사항" />
            </ListItemButton>
          </List>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} onClick={()=>onClick("post/notice")}>
              <ListItemIcon>
                <NewspaperIcon />
              </ListItemIcon>
              <ListItemText primary="게시판" />
            </ListItemButton>
          </List>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} onClick={()=>onClick("post/tomorlove")}>
              <ListItemIcon>
                <Groups2Icon />
              </ListItemIcon>
              <ListItemText primary="투머럽클럽" />
            </ListItemButton>
          </List>
        </Collapse>




      

        <ListItemButton onClick={()=>onClick("members")}>
          <ListItemIcon>
            <Groups2Icon />
          </ListItemIcon>
          <ListItemText primary="투마럽클럽 멤버관리" />
        </ListItemButton>
        <ListItemButton onClick={()=>onClick("contact")}>
          <ListItemIcon>
            <HelpOutlineIcon />
          </ListItemIcon>
          <ListItemText primary="문의사항 관리" />
        </ListItemButton>

    </List>
    </div>
  )
}

export default Navbar