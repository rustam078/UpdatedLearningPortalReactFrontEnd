import React,{useState} from "react";
import ReactDOM from "react-dom";
import Button from   "./Button/Button";
import Card from "./Card";
import classes from "./update.module.css";
import { getUser } from "../../../service/LoginService";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm} />;
};

const ErrorModel = (props) => {
  const location = useLocation();
  const [utitle,setutitle]=useState(props.title);
  const [uUrl,setUrl]=useState(props.videoUrl);
const navigate=useNavigate();
  const updateHandler = (e) => {
    e.preventDefault();
    const user = getUser();
    // Assuming utitle and uUrl are defined in your component's state
    const data = {
      title:utitle,
      url:uUrl,
    };
  
    // Define the URL for your PUT request
    const apiUrl = `http://localhost:8080/api/categories/updateContent/${props.id}`; // Replace with your actual API URL
  
    fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer "+user.token,
         
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((responseData) => {
        // Handle the response data here if needed
        toast.success("data update sucessfully...")
        console.log(responseData);
        navigate(location.pathname);
        props.onConfirm(); // Trigger any action you want after the update
      })
      .catch((error) => {
        // Handle errors here
        toast.error("some thing went wrong ...!")
        console.error('There was a problem with the fetch operation:', error);
      });
      // props.onConfirm();
  };



  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById('backdrop-root')
      )}

      {ReactDOM.createPortal(
      
        <form onSubmit={updateHandler}>
      <Card className={classes.modal}>
      <header className={classes.header}>
        <h2>{props.id}</h2>
      </header>
      <div className={classes.content}>
      <div>
          <label htmlFor="Title">Title ::</label>
          <input
            type="text"
            id="inputValue1"
            name="inputValue1"
            value={utitle}
            onChange={(e)=>setutitle(e.target.value)}
          />
        </div>
      <div>
          <label htmlFor="Url">Url ::</label>
          <input
            type="text"
            id="inputValue1"
            name="inputValue1"
            value={uUrl}
            onChange={(e)=>setUrl(e.target.value)}
          />
        </div>
      </div>
      <footer className={classes.actions}>
        <Button onClick={props.onConfirm}>Cancel</Button>
        <Button type="submit">update</Button>
      </footer>
    </Card>
    </form>
    ,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default ErrorModel;
