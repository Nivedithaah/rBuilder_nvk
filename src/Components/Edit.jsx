import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FaRegEdit } from 'react-icons/fa';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TextField } from '@mui/material';
import { CgOverflow } from 'react-icons/cg';
import { MdCancel } from 'react-icons/md';
import jobRole from '../assets/jobRole.json'
import { toast } from 'react-toastify';
import { editAllResumeApi } from '../services/apiService';
import { jsPDF } from "jspdf";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  maxHeight: "80vh",
  overflow: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



function Edit({resumeDetails, setResumeDetails}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const skillRef = React.useRef()
  const removeSkill = (skill) => {
   setResumeDetails( {...resumeDetails, skills :  resumeDetails.skills.filter(item => item != skill)})
  } 
  const addSkill = (skill) => {
      if(skill) {
          if(resumeDetails?.skills?.some(item => item.toLowerCase().includes(skill.toLowerCase()))){
            toast.info("Given skill is already available, please add another")
          }else{
            setResumeDetails({...resumeDetails, skills :[...resumeDetails?.skills, skill]})
          }
          skillRef.current.value = ""
      }else{
        toast.warning("Please enter a valid input");
      }
  }
 const handleEditResume = async () => {
    // make api call to update resume  whenever the update button clicks
    const {fullname, location, job, phone, email, github, linkedin, degree, college, year, skills, summary} = resumeDetails 
    if(fullname && location && job && phone && email && github && linkedin && degree && college && year && skills.length && summary){
      //make api call
     const response = await  editAllResumeApi(resumeDetails.id,resumeDetails)
     console.log(response);
     if(response.status == 200 ){
      toast.success("Resume Updated successfully");
     setTimeout(() => {
      handleClose()
     }, 2500);
      
     }
     
    }else{
toast.warning("Please fill the form completely");
    }
  }
 const generatePdf = () => {
  const pdf = new jsPDF()
 }
  
  return (
    <div>
      <Button style={{ color: '#6B5546' }} className='btn' onClick={handleOpen} ><FaRegEdit className='me-1' />Edit</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Resume Details
          </Typography>
          <Box id="modal-modal-description" sx={{ mt: 2 }}>
            <div>
            <h1>Personal Details</h1>
            <div className='row p-3'>
              <TextField value={resumeDetails?.fullname} onChange={e => setResumeDetails({...resumeDetails, fullname : e.target.value})} id="standard-basic-name" label="Full Name" variant="standard" />
              <TextField value={resumeDetails?.location} onChange={e => setResumeDetails({...resumeDetails, location : e.target.value})} id="standard-basic-location" label="Location" variant="standard" />
              <FormControl variant="standard">
                <InputLabel id="demo-simple-select-label">Choose Job Title</InputLabel>
                <Select onChange={e => setResumeDetails({...resumeDetails, job : e.target.value})} 
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Job"
                >
                  {jobRole.jobRoles.map(job => (
                      <MenuItem key={job} value={job}>{job}</MenuItem>
                  ))}
                  
                   

                </Select>
              </FormControl>

            </div>
          </div>
            <div>
                       <h1>Contact Details</h1>
                       <div className='row p-3'>
                         <TextField value={resumeDetails?.email} onChange={e => setResumeDetails({...resumeDetails, email : e.target.value})} id="standard-basic-email" label="Email" variant="standard" />
                         <TextField value={resumeDetails?.phone} onChange={e => setResumeDetails({...resumeDetails, phone : e.target.value})} id="standard-basic-contact" label="Contact Number" variant="standard" />
                         <TextField value={resumeDetails?.linkedin} onChange={e => setResumeDetails({...resumeDetails, linkedin : e.target.value})} id="standard-basic-linkedin" label="Linkedin Link" variant="standard" />
                         <TextField value={resumeDetails?.github} onChange={e => setResumeDetails({...resumeDetails, github : e.target.value})} id="standard-basi-githubc" label="Github Link" variant="standard" />
                       </div>
                     </div>
          <div>
                      <h1>Educational Details</h1>
                      <div className='row p-3'>
                        <TextField value={resumeDetails?.degree} onChange={e => setResumeDetails({...resumeDetails, degree : e.target.value})} id="standard-basic-degree" label="Bchelor's Degree" variant="standard" />
                        <TextField value={resumeDetails?.college} onChange={e => setResumeDetails({...resumeDetails, college : e.target.value})} id="standard-basic-college" label="University/College Name" variant="standard" />
                        <TextField value={resumeDetails?.year} onChange={e => setResumeDetails({...resumeDetails, year : e.target.value})} id="standard-basic-yearofgrad" label="Year of Graduation" variant="standard" />
                      </div>
                    </div>

            <div className='mt-3'>
              <h3>Skills</h3>
              <div className='d-flex p-3'>
                <input ref={skillRef} type="text" placeholder='Add Skill' className='form-control' />
                <button onClick={() => {addSkill(skillRef.current.value)}}  className='btn'>Add</button>
              </div>
              <h5>Added Skills : </h5>
              <div className='p-3 d-flex justify-content-between flex-wrap'>
                {resumeDetails?.skills?.map(skill => (
                  <Button key={skill} onClick={() => {removeSkill(skill)}} variant="contained" style={{ backgroundColor: '#6B5546' }} className='text-light my-2'>{skill}<MdCancel className='ms-3' /></Button>
                ))}
              </div>
              <div>
                <h3>Summary</h3>
                <div className='row p-3'>
                  <TextField value={resumeDetails?.summary} onChange={e => setResumeDetails({...resumeDetails, summary : e.target.value})} 
                   id='summary' label = 'summary' multiline variant = 'standard'></TextField>
                </div>
              </div>
            </div>
            <button onClick={handleEditResume} style={{ backgroundColor: '#374740' }}  className='btn text-light'>Update  CV</button>

          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default Edit