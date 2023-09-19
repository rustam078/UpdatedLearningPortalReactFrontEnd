import React ,{useState} from 'react';
import ReactPlayer from 'react-player';
import './VideoCard.css'; // Import CSS for styling
import DeleteIcon from '@mui/icons-material/Delete';
import { deletecontentFromBackend } from '../../service/LoginService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import EditIcon from '@mui/icons-material/Edit';
import UpdateModel from './updateModel/UpdateModel';

function VideoCard({id, title, description, videoUrl,type }) {
  const [showmodel,setShowModel]=useState();
  const navigate= useNavigate();
  const titiletype=type;
const handleDeleteClick = (id) => {
 const shouldDelete = window.confirm(`Are you sure you want to delete this  ${titiletype}? `);
 if (shouldDelete) {
   deletecontentFromBackend(id).then(response => {
     toast.success(`${titiletype} deleted successfully!`);
     navigate("/dashboard/videos");
   })
   .catch(error => {
     console.log(error)
     toast.error('Error fetching data:', error);
   });
 }
};

const updatesetShowModel=()=>{
  setShowModel(null);
};

const showPopupModel=(id,videoUrl,title)=>{
  setShowModel({
      id,
      videoUrl,
      title,
  }
  );
}
  return (
    <>
    {showmodel &&<UpdateModel id={showmodel.id} title={showmodel.title} videoUrl={showmodel.videoUrl} onConfirm={updatesetShowModel}/>}
    <div className="video-card">
        <div style={{display:'flex'}}>
         <ReactPlayer
          url={videoUrl}
          controls={true}
          height="100px"
          width= "100px"
         margin-right="10px"
        />
      <div className="video-content">
        <h2 className="video-title">{title}</h2>
        <p className="video-description">{description}</p>
      </div>
      </div>
      <div className="delete-button">
         <EditIcon onClick={()=>showPopupModel(id,videoUrl,title)}/>
          <DeleteIcon onClick={()=>handleDeleteClick(id)} />
        </div>
    </div>
    </>
  );
}

export default VideoCard;
