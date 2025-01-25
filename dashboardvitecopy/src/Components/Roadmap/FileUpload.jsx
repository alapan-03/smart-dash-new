import React, { useState } from "react";
import {
  FaFilePdf,
  FaFileWord,
  FaFilePowerpoint,
  FaFileImage,
  FaFileAlt,
  FaPlus,
  FaTimes,
} from "react-icons/fa";
import "./path.css"; // Add some basic CSS
import url from "../../url"
import {
  useParams,
} from "react-router-dom";
import YouTubeForm from "./YoutubeForm";

const acceptedFileTypes = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "image/jpeg",
  "image/png",
];

const FileUpload = (props) => {

  let { classId } = useParams();

  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    const filteredFiles = droppedFiles.filter((file) =>
      acceptedFileTypes.includes(file.type)
    );

    if (filteredFiles.length) {
      setFiles((prevFiles) => [...prevFiles, ...filteredFiles]);
    } else {
      alert("Only PPTX, PDF, DOCX, JPG, and PNG files are allowed.");
    }
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const filteredFiles = selectedFiles.filter((file) =>
      acceptedFileTypes.includes(file.type)
    );

    if (filteredFiles.length) {
      setFiles((prevFiles) => [...prevFiles, ...filteredFiles]);
    } else {
      alert("Only PPTX, PDF, DOCX, JPG, and PNG files are allowed.");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const renderFileIcon = (fileType) => {
    switch (fileType) {
      case "application/pdf":
        return <FaFilePdf size={30} color="red" />;
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return <FaFileWord size={30} color="blue" />;
      case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        return <FaFilePowerpoint size={30} color="orange" />;
      case "image/jpeg":
      case "image/png":
        return <FaFileImage size={30} color="green" />;
      default:
        return <FaFileAlt size={30} />;
    }
  };

  const getFileExtension = (fileName) => {
    return fileName.split(".").pop();
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  const handleUpload = async () => {
    if (!files.length) {
      alert('Please add files before uploading.');
      return;
    }
  
    // Create a new FormData object
    const formData = new FormData();
    
    // Append files
    files.forEach((file) => {
      console.log(file)
      formData.append('file', file);
      formData.append('name', file.name);
    });
    
    // Append other form fields
    // formData.append('topicId', props.topicId);
    formData.append('topicId', "66e1dc614e1cfd7a2c31c17a");
    formData.append('classroomId', classId); // Assuming classroomId is a state or variable
    // formData.append('name', files.file.name); // Assuming classroomId is a state or variable

    console.log('file:', files);
    console.log('Topic ID:', props.topicId);
    console.log('Classroom ID:', classId);
      
    setUploading(true);
  
    try {
      const response = await fetch(`${url}/api/v1/resource/upload`, {
        method: 'POST',
        body: formData,
      });
      const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      if (response.ok) {
        setUploadedFiles(data.files);
        alert('Files uploaded successfully!');
      } else {
        alert('Failed to upload files: ' + data.message);
      }
    } else {
      // Handle non-JSON response (likely an error page)
      const text = await response.text();
      console.error('Server response:', text);
      alert('Server returned an error: ' + text);
    }
    } catch (error) {
      console.error('Error uploading files:', error);
      alert(error.message);
    }
  
    setUploading(false);
  };
  



  return (
    <div className="file-upload-container">
    {/* <div className="create-class"> */}
    <div>
      <p>Files</p>
      <p>Link</p>
      </div>
      {!files || files.length < 1 ? (
      // {/* <div className="file-upload-container-inner"> */}
        <div
          className="drag-drop-zone"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="add-files">
            <p>Drag and drop your files here</p>
            <label htmlFor="file-input">
            <FaPlus size={20} />            
            </label>
            <input
              id="file-input"
              type="file"
              multiple
              onChange={handleFileSelect}
              style={{ display: "none" }}
              accept=".pdf, .docx, .pptx, .jpg, .png"
            />
          </div>
          <button className="upload-resource" onClick={()=>props.addResource(false)}>Close</button>

        </div>
      ) : (
        <div
          className="drag-drop-zone"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <label className="addFile" htmlFor="file-input">
            <FaPlus size={20} />
            <input
              id="file-input"
              type="file"
              multiple
              onChange={handleFileSelect}
              style={{ display: "none" }}
              accept=".pdf, .docx, .pptx, .jpg, .png"
            />
          </label>
          <div className="file-list">
            {files.map((file, index) => (
              <div className="file-item" key={index}>
                <div className="file-details-cont">
                  {renderFileIcon(file.type)}
                  <div className="file-details">
                    <p>{file?.name.split(".")[0].slice(0, 10) + `....`}</p>
                    <p>{getFileExtension(file.name)}</p>
                  </div>
                </div>

                <FaTimes
                  size={20}
                  color="red"
                  className="remove-icon"
                  onClick={() => handleRemoveFile(index)}
                />
              </div>
            ))}
          </div>


          <div>
          <button className="close-resource" onClick={()=>props.addResource(false)}>Close</button>
          <button className="upload-resource" onClick={handleUpload}>Upload</button>
          </div>

        </div>
      )}
    </div>
    // </div>
  );
};

export default FileUpload;
