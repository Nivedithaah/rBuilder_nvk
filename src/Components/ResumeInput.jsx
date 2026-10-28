import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TextField } from '@mui/material';
import jobRole from '../assets/jobRole.json'
import jobSkills from '../assets/jobSkills.json'
import summaries from '../assets/summaries.json'
import { toast } from 'react-toastify';
import {saveResumeApi} from '../services/apiService'
import { useNavigate } from 'react-router-dom';


const steps = ['Basic Informations', 'Contact Details', 'Educational Details', 'Review & Submit'];



function ResumeInput({resumeDetails, setResumeDetails}) {
  const navigate = useNavigate()
  
// console.log(resumeDetails);
  const [activeStep, setActiveStep] = React.useState(0);


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const renderFormCount = (stepCount) => {
    switch (stepCount) {
      case 0:
        return (
          <div>
            <h1>Personal Details</h1>
            <div className='row p-3'>
              <TextField value={resumeDetails.fullname} onChange={e => setResumeDetails({...resumeDetails, fullname : e.target.value})} id="standard-basic-name" label="Full Name" variant="standard" />
              <TextField value={resumeDetails.location} onChange={e => setResumeDetails({...resumeDetails, location : e.target.value})} id="standard-basic-location" label="Location" variant="standard" />
              <FormControl variant="standard">
                <InputLabel id="demo-simple-select-label">Choose Job Title</InputLabel>
                <Select value={resumeDetails.job} onChange={e => setResumeDetails({...resumeDetails, job : e.target.value})} 
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
        )
        break;
      case 1:
        return (
          <div>
            <h1>Contact Details</h1>
            <div className='row p-3'>
              <TextField value={resumeDetails.email} onChange={e => setResumeDetails({...resumeDetails, email : e.target.value})} id="standard-basic-email" label="Email" variant="standard" />
              <TextField value={resumeDetails.phone} onChange={e => setResumeDetails({...resumeDetails, phone : e.target.value})} id="standard-basic-contact" label="Contact Number" variant="standard" />
              <TextField value={resumeDetails.linkedin} onChange={e => setResumeDetails({...resumeDetails, linkedin : e.target.value})} id="standard-basic-linkedin" label="Linkedin Link" variant="standard" />
              <TextField value={resumeDetails.github} onChange={e => setResumeDetails({...resumeDetails, github : e.target.value})} id="standard-basi-githubc" label="Github Link" variant="standard" />
            </div>
          </div>
        )
        break;
      case 2:
        return (
          <div>
            <h1>Educational Details</h1>
            <div className='row p-3'>
              <TextField value={resumeDetails.degree} onChange={e => setResumeDetails({...resumeDetails, degree : e.target.value})} id="standard-basic-degree" label="Bchelor's Degree" variant="standard" />
              <TextField value={resumeDetails.college} onChange={e => setResumeDetails({...resumeDetails, college : e.target.value})} id="standard-basic-college" label="University/College Name" variant="standard" />
              <TextField value={resumeDetails.year} onChange={e => setResumeDetails({...resumeDetails, year : e.target.value})} id="standard-basic-yearofgrad" label="Year of Graduation" variant="standard" />
            </div>
          </div>
        )
        break;
      case 3:
        return (
          <div>
            <p>Our AI will generate Skills & Summary according to your job role. Click the <b>Generate AI Skill & Summary</b> button to Proceed.</p>
          </div>
        )
        break;

      default:
        break;
    }
  }
  const generateSkillsSummary = () => {
    setResumeDetails({
      ...resumeDetails, skills : jobSkills[resumeDetails.job],summary : summaries[resumeDetails.job]
    })
    handleNext();
  }

  const handleSavedResume = async () => {
    // make api call to save resume  whenever the finish button clicks
    const {fullname, location, job, phone, email, github, linkedin, degree, college, year, skills, summary} = resumeDetails 
    if(fullname && location && job && phone && email && github && linkedin && degree && college && year && skills.length && summary){
      //make api call
     const response = await  saveResumeApi(resumeDetails)
     console.log(response);
     if(response.status == 201){
      toast.success("Resume added successfully");
      const resumeid = response.data.id;
      navigate(`/resume/${resumeid}`);
      
     }
     
    }else{
toast.warning("Please fill the form completely");
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleSavedResume}>
              Finish
            </Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          <Box>
            {
              renderFormCount(activeStep)
            }
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {activeStep === steps.length - 1 ?
              <Button onClick={generateSkillsSummary}>GENERATE AI AKILLS AND SUMMARY</Button> :
              <Button onClick={handleNext}>NEXT</Button>}
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}

export default ResumeInput
