import { HEADERS } from "../../service/UrlUtils";
export async function fetchEvents() {
    try {
      const response = await fetch('http://localhost:8080/api/categories/user', HEADERS());
  
      if (!response.ok) {
        const error = new Error('An error has occurred while fetching data.');
        error.code = response.status;
        error.info = await response.json();
        console.error(error);
        throw error;
      }
  
      const data = await response.json(); // Parse the response as JSON
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
  