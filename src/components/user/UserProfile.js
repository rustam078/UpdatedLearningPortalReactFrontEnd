import classes from "./UserProfile.module.css";
import React, { useEffect, useState } from 'react';
import {getSkillFromBackend,getReportFromBackend} from '../../service/LoginService';
import { Fragment } from "react";
import Card from "../Dashboard/Card";
import YouTubeIcon from "@mui/icons-material/YouTube";
import AddTaskIcon from "@mui/icons-material/AddTask";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import StickyHeadTable from "../MaterialUi/StickyHeadTable";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
const UserProfile = () => {
  const [data, setData] = useState(null);
  const [report, setReport] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getSkillFromBackend().then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


  
  useEffect(() => {
    // Replace this with your API call function for the report
    getReportFromBackend().then(response => {
      setReport(response.data);
    }).catch(error => {
      console.error('Error fetching data:', error);
    });
  }, []);
  

  const [user = {}] = report; 
 
  const {
    totalContent = 0,
    totalVideos = 0,
    totalArticles = 0,
    totalCategories = 0,
    username, // Provide a default username if not available
  } = user;
  return (
    <Fragment>
      <section className={classes.align}>
      <Card icon={<YouTubeIcon style={{ fontSize: '80px',marginTop:'0px',color:'red' }}/>} count={totalVideos} type={"Videos"} btn={"watch now"} link={"videos"}/>
      <Card icon={<AutoStoriesIcon style={{ fontSize: '70px',marginTop:'2px',color:'cadetblue' }}/>} count={totalArticles} type={"Articles"} btn={"Read now"} link={"articles"}/>
      <Card icon={<AddTaskIcon style={{ fontSize: '67px',marginTop:'5px',color:'deeppink' }}/>} count={totalCategories} type={"Playlist"} btn={"View it"}link={"addtask"}/>
      <Card icon={<InsertDriveFileIcon style={{ fontSize: '67px',marginTop:'5px',color:'gold' }}/>} count={totalContent} type={"TotalContent"} btn={"add more"}link={"addtask"}/>
      </section>
      <StickyHeadTable/>
      <main className={classes.profile}>
        <h2>My User Profile</h2>
        {data ? (
          <ul>
          {data.map((skill, index) => (
            <li key={index}>{skill.name}</li>
          ))}
        </ul>
      ) : (
        <div>Loading...</div>
      )}
      </main>
    </Fragment>
  );
};

export default UserProfile;
