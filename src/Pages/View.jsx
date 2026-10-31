import React, { useEffect, useRef, useState } from 'react'
import { FaFileDownload, FaBackward } from 'react-icons/fa'
import Edit from '../Components/Edit'
import { Link, useParams } from 'react-router-dom'
import { IoDocument } from 'react-icons/io5'
import { IoMdRefresh } from 'react-icons/io'
import Preview from '../Components/Preview'
import { downloadResumeApi, viewResumeApi } from '../services/apiService'
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

function View() {
  const [resume, setResume] = useState()


  const previewRef = useRef()

  const { id } = useParams()

  useEffect(() => {
    getResumeDetails()
  }, [])
  const getResumeDetails = async () => {
    const response = await viewResumeApi(id)
    if (response.status === 200) {
      setResume(response.data);
    }
  }

  const downloadCV = async () => {
    const previewing = previewRef.current
    const canvas = await html2canvas(previewing)
    canvas.toBlob(async (imgFile) => {
      // create form data to send file through API
      const formData = new FormData()
      formData.append("file", imgFile)
      formData.append("upload_preset", "Resume_rbuilder")
      const result = await fetch("https://api.cloudinary.com/v1_1/c0fcgxqw/image/upload", {
        method: "POST",
        body: formData
      })
      const serverData = await result.json()
      const url = serverData.secure_url
      // console.log(url);
      generatePdf(url)

    })

  }

  const generatePdf = async (resumeImg) => {

    const pdf = new jsPDF()
    const imgWidth = pdf.internal.pageSize.getWidth()
    const imgHeight = pdf.internal.pageSize.getHeight()
    pdf.addImage(resumeImg, "PNG", 0, 0, imgWidth, imgHeight)
    // pdf.save("resume.pdf")
    const today = new Date()
    const timeStamp = `${today.toLocaleDateString()},${today.toLocaleTimeString()}`
    console.log(timeStamp);

    const result = await downloadResumeApi({ timeStamp, resumeImg, resumeId: resume.id, jobRole: resume.job })

    if (result.status === 201) {
      // download CV
      pdf.save(`${resume.fullName} CV.pdf`)
    }

  }

  return (
    <div className='container my-5'>
      <div className="row">
        <div className="col-lg-2"></div>
        <div className="col-lg-8">
          {/* Navigation icons */}
          <div className='d-flex justify-content-center align-items-center'>
            {/* Download */}
            <button onClick={downloadCV} style={{ color: "#6B5546" }} className='btn mx-2'><FaFileDownload />Download CV</button>
            {/* Edit */}
            <Edit resumeDetails={resume} setResumeDetails={setResume} />
            {/* All resume */}
            {/* <Link style={{color : "#6B5546" }}  to={'/all-resumes'} className='btn mx-2' ><IoDocument /> All Resumes</Link> */}
            {/* Download history */}
            {/* <Link style={{color : "#6B5546" }} to={'/downloads'}  className='btn mx-2'><IoMdRefresh /> Download History</Link> */}
            {/* Back */}
            <Link style={{ color: "#6B5546" }} to={'/resume-details'} className='btn mx-2'><FaBackward />Previous</Link>
          </div>
        </div>
        <div ref={previewRef} className='p-5'>
          <Preview resumeDetails={resume} />
        </div>
        <div className="col-lg-2"></div>
      </div>
    </div>
  )
}

export default View
