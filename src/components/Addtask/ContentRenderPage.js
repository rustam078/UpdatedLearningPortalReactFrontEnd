import React from 'react';

import { useLoaderData } from 'react-router-dom';
import VideoCard from './VideoCard';
import axios from 'axios';
import './VideoCard.css';
import { HEADERS } from '../../service/UrlUtils';
import ArticleCard from './ArticleCard';



function ContentRenderPage() {
  const videoData = useLoaderData();

  return (
    <div className="video-card-container">
    {videoData && videoData.length > 0 ? (
      videoData.map((video, index) => (
        <div key={index} className="video-card-wrapper">
          {video.contentType === "ARTICLE" ? (
            <ArticleCard
              id={video.contentId}
              title={video.title}
              description={video.description}
              articleUrl={video.url}
              imageUrl={video.imageUrl}
              type={video.contentType}
            />
          ) : (
            <VideoCard
             id={video.contentId}
              title={video.title}
              description={video.description}
              videoUrl={video.url}
              type={video.contentType}
            />
          )}
        </div>
      ))
    ) : (
      <p style={{ fontWeight: "bold", color: "red", marginLeft: "510px" }}>
        No content available ......
      </p>
    )}
  </div>
  
  );
}

export default ContentRenderPage;

export async function loader({ request, params }) {
  const categoryToFetch = params.id;

  // Get the URL from the request object
  let requestUrl = request.url;

  // Convert the request URL to uppercase
  requestUrl = requestUrl.toUpperCase();

  // Check if the request URL contains "VIDEO" or "ARTICLE" in uppercase
  const isVideoRequest = requestUrl.includes('VIDEOS');
  const isArticleRequest = requestUrl.includes('ARTICLE');

  // Construct the API URL based on the condition
  let apiUrl;
  if (isVideoRequest) {
    apiUrl = 'http://localhost:8080/api/categories/byContentType?contentType=VIDEO';
  } else if (isArticleRequest) {
    apiUrl = 'http://localhost:8080/api/categories/byContentType?contentType=ARTICLE';
  } else {
    apiUrl = 'http://localhost:8080/api/categories/view';
  }

  if (params.id != null) {
       apiUrl = `http://localhost:8080/api/categories/fetchByCategoryAndUser?categoryId=${categoryToFetch}`;
    try {
      const response = await fetch(apiUrl, HEADERS());

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(`Data fetched from URL ${apiUrl}:`, data);
      // Handle the data as needed
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null; // Return null or an empty object to indicate an error
    }
  } else {
    try {
      const response = await fetch(apiUrl, HEADERS());

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(`Data fetched from URL ${apiUrl}:`, data);
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null; // Return null or an empty object to indicate an error
    }
  }
}

