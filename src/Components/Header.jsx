import React from 'react'
import {Link} from 'react-router-dom'
import { Box,AppBar,Toolbar,IconButton,Typography,Button,Tooltip} from '@mui/material';


function Header() {
  const title = "An AI rBuilder suggest job-specific keywords, professional summaries, and skill recommendations to make the resume more effective and ATS (Applicant Tracking System) friendly. The main goal of the AI Powered Resume Builder is to simplify the resume creation process and help job seekers build professional, well-structured resumes in a few minutes. Users can select templates, edit content, preview their resume, and download it in formats such as PDF."
  return (
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx = {{backgroundColor : '#6B5546'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
           <img width={"50px"}  src="https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png" alt="no image" />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to={"/"} className='text-light text-decoration-none'>AI rBuilder</Link>
          </Typography>
          <Link  to={'/all-resumes'} className='text-light text-decoration-none mx-2' > ALL RESUMES</Link>
          <Link  to={'/downloads'}  className='text-light text-decoration-none mx-2'>DOWNLOAD HISTORY</Link>
          <Tooltip title = {title}> <Button color="inherit">ABOUT US</Button></Tooltip> 
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
