import React, {useEffect, useMemo, useState } from 'react'
import { MdDelete } from 'react-icons/md'
import { Link } from 'react-router-dom'
import {deleteAllResumeApi, getResumeApi} from '../services/apiService'
import { FaSearch } from 'react-icons/fa'


function Saved() {

   const [allResumes, setAllResumes] = useState([])
   const [searchKey, setSearchKey] = useState("")
   const [dummyAllResumes, setDummyAllResumes] = useState([])

  useEffect(() => {
    getAllResumes()
  },[])
   
  const getAllResumes = async () => {
    const response = await getResumeApi()
    setAllResumes(response.data)
    setDummyAllResumes(response.data)
  }
  
 const searchInput = useMemo(() => {
  setAllResumes(dummyAllResumes.filter(item => item.job.toLowerCase().includes(searchKey.toLowerCase())))
 },[searchKey])
  const removeResume = async (id)=> {
  if(confirm("Are you sure, do you want to delete this resume?")){
      const response = await deleteAllResumeApi(id)
      if(response.status == 200){
        getAllResumes()
      }

  }
 }  
 console.log(allResumes)

  return (
    <div className='container d-flex flex-column align-items-center justify-content-center my-5'>
      <h1>All Saved Resume</h1>  
     <div className='d-flex justify-content-center align-items-center w-50 mt-3'>
        <input onChange={e => setSearchKey(e.target.value)} type="text" placeholder='Search candidate by their job name' className='form-control' /> 
        <FaSearch style={{marginLeft : "-30px"}}/>
     </div>
        <table className="table table-hover table-stripped my-5">
          <thead>
            <tr className='table-dark'>
              <th>#</th>
              <th>Resume</th>
              <th>Job role</th>
              <th>...</th>
            </tr>
          </thead>
          <tbody>
            {
              allResumes?.length>0?
                allResumes?.map((resume, index) => (
                  <tr key={resume?.id}>
              <td>{index+1}</td>
              <td><Link to={`/resume/${resume?.id}`}>{resume?.fullname.toUpperCase()}</Link></td>
              <td>{resume?.job.toUpperCase()}</td>
              <td>
                <button onClick={() => {removeResume(resume?.id)}} className='btn fs-5 text-secondary'><MdDelete /></button>
              </td>
            </tr>
                )) 

              :
              <p>NO RESUMES ADDED YET</p>
            }
          </tbody>
        </table>
    </div>
  )
}

export default Saved
