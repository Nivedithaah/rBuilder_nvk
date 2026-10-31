import React, { useEffect, useState } from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { getAllDownloadResumeApi } from '../services/apiService'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';



ChartJS.register(ArcElement, Tooltip, Legend);



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


function Download() {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [downloadlist, setDownloadlist] = useState([])

  const [label,setlabel] =useState([])
  const [value,setvalue] =useState([])

  const colorpalette=['#412845','#558055','#0d2e37','#545480','#aba55b','#964259']
  const backgroundColor= label.map((value,index)=>colorpalette[index%colorpalette.length])


  const data ={
    labels : label,
    datasets : [
      {
        label:'Download Count',
        data:value,
        backgroundColor
      }
    ]
  }

  useEffect(() => {
    getAllDownloads()
  }, [])

  const getAllDownloads = async () => {
    const result = await getAllDownloadResumeApi()
    setDownloadlist(result.data)

    const output = {}
    result.data.forEach(item => {
       const currentjob = item.jobRole
       if(currentjob in output){
          output[currentjob] += 1
       }else{
          output[currentjob] = 1
       }
    });

    setlabel(Object.keys(output))
    setvalue(Object.values(output))


  }

  return (
    <div className='container my-5'>
      <div className='d-flex justify-content-between align-items-center'>
        <h3>Downloaded Resume History</h3>
        <Button className='btn text-light' onClick={handleOpen} style={{ backgroundColor: '#89644b' }}>View in Chart</Button>
      </div>
      <p className='mt-3 fs-3 fw-semibold text-primary'>Total downloaded  resumes from our site is : <span className='fw bolder text-danger'>
        {downloadlist.length}
      </span>
      </p>
      <div className='row my-5'>
        {/* duplicate the row according to the resume count */}
        {
          downloadlist?.length > 0 ?
            downloadlist?.map(resume => (
              <div className="col-lg-4">
                <div className="rounded shadow p-3">
                  <h6>Reviewed at : {resume?.timeStamp}</h6>
                  <div className='mt-4 text-center'>
                    <Link to={'/resume/${resume?.resumeId}'}> <img className='w-50' style={{ height: "360px" }} src={resume?.resumeImg} alt="resume" /></Link>
                  </div>
                </div>
              </div>
            ))
            :
            <div>No Resumes Added Yet</div>
        }
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{backgroundColor:'#89644b',width:'100%',padding:'10px',color:'white'}}>
           CV count by job role
          </Typography>
          <div className='text-center'><Pie data={data}/></div>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            This chart provides an overview of the number of CV downloads associated with diffrent job on a website. It helps visualize the demand and engagement for CV's accross various career categories,making it easier to identify which job role attracts the highest number of downloads.By comparing download counts across roles,the chart can provide useful insights into user preferences and the popularity of diffrent career oppertunities on the platform. 
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default Download
