import axiosService from "../api/axiosService";

// save resume API : called by ResumeInput component when finish button clicks

export const saveResumeApi = async (resumeDetails) => {
     return await axiosService("POST", "/resumes", resumeDetails);
     
}
// view resume API : called by view component when the page loads inbrowser

export const viewResumeApi = async (resumeId) => {
     return await axiosService("GET", `/resumes/${resumeId}`,{}); 
}
// view all resumes API : called by Saved component when the page loads in browser
export const getResumeApi = async () => {
     return await axiosService("GET", `/resumes/`,{}); 
}

// remove resume Api : called by saved componenet when delete button clicks
export const deleteAllResumeApi = async (resumeId) => {
     return await axiosService("DELETE", `/resumes/${resumeId}`,{}); 
}

// update resume Api : called by saved componenet when update button clicks
export const editAllResumeApi = async (resumeId ,resumeDetails) => {
     return await axiosService("PUT", `/resumes/${resumeId}`,resumeDetails); 
}

