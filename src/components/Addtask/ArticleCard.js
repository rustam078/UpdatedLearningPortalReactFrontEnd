import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './ArticleCard.css';
import DeleteIcon from '@mui/icons-material/Delete';
import { deletecontentFromBackend } from '../../service/LoginService';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import UpdateModel from './updateModel/UpdateModel';

function ArticleCard({ id, title, articleUrl, imageUrl,type }) {
  const [showmodel,setShowModel]=useState();
 
     const navigate= useNavigate();
     const titiletype=type;
  const handleDeleteClick = (id) => {
    const shouldDelete = window.confirm(`Are you sure you want to delete this  ${titiletype}? `);
    if (shouldDelete) {
      deletecontentFromBackend(id).then(response => {
        toast.success(`${titiletype} deleted successfully!`);
        navigate("/dashboard/articles");
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

  const handleDescriptionClick = () => {
    window.open(articleUrl, '_blank');
  };

  return (
    <>
    {showmodel &&<UpdateModel id={showmodel.id} title={showmodel.title} videoUrl={showmodel.videoUrl} onConfirm={updatesetShowModel}/>}
    <div className="article-card">
      <div style={{display:'flex'}}>
      <img src={imageUrl} alt="Article Image" className="article-image" />
      <div className="article-content">
        <h2 className="article-title">{title}</h2>
        <p className="article-description">
          <a
            href={articleUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleDescriptionClick}
            className="article-link"
          >
            Visit article
          </a>
        </p>
      </div>
      </div>
      <div className="delete-button">
      <EditIcon onClick={()=>showPopupModel(id,articleUrl,title)}/>
          <DeleteIcon onClick={()=>handleDeleteClick(id)} />
        </div>
    </div>
    </>
  );
}

export default ArticleCard;
