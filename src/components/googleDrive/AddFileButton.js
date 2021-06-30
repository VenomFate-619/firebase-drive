import React, { useState , useEffect } from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { storage, database } from "../../firebaseConfig";
import { ROOT_FOLDER } from "../../hooks/useFolder";
import { useAuth } from "../../context/AuthContext";
import { v4 as uuidv4 } from "uuid";
import { ProgressBar, Toast } from "react-bootstrap";

function AddFileButton({ currentFolder }) {
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const { currentUser } = useAuth();
   useEffect(()=>{
     console.log(uploadingFiles);
   })
  const returnPath = (path) => path.map((p) => p.name).join("/");
   
  const handleClose = (id) => {
    setUploadingFiles((prevUploadingFiles) => {
      return prevUploadingFiles.filter((uploadFile) => uploadFile.id !== id );
    });
  }

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (currentFolder == null || file == null) return;

    // not working 
    const id = uuidv4();
    console.log(id);
    setUploadingFiles((prevUploadingFiles) => [
      ...prevUploadingFiles,
      { id: id, name: file.name, progress: 0, error: false },
    ]);

 
    const filePath =
      currentFolder !== ROOT_FOLDER
        ? `${returnPath(currentFolder.path)}/${currentFolder.name}/${file.name}`
        : file.name;

    const uploadTask = storage
      .ref(`/files/${currentUser.uid}/${filePath}`)
      .put(file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
        // setUploadingFiles(
        //   (pre) => { pre.filter((f) => f.id === id)[0].progress = progress ;   return pre}
        // );
        setUploadingFiles(prevUploadingFiles => {
          return prevUploadingFiles.map(uploadFile => {
            if (uploadFile.id === id) {
              return { ...uploadFile, progress: progress }
            }

            return uploadFile
          })
        })
        
      },
      (error) => {
        console.log(error);
        // error handling
        setUploadingFiles(prevUploadingFiles => {
          return prevUploadingFiles.map(uploadFile => {
            if (uploadFile.id === id) {
              return { ...uploadFile, error: true }
            }
            return uploadFile
          })
        })
      },
      () => {
        // remove toast
        handleClose(id)
        uploadTask.snapshot.ref
          .getDownloadURL()
          .then(function (url) {
            console.log("File available at", url);
            database.files
            .where("name", "==", file.name)
            .where("userId", "==", currentUser.uid)
            .where("folderId", "==", currentFolder.id)
            .get()
            .then(existingFiles => {
              const existingFile = existingFiles.docs[0]
              if (existingFile) {
                existingFile.ref.update({ url })
              } else {
                database.files.add({
                  url: url,
                  name: file.name,
                  createdAt: database.getCurrentTimestamp(),
                  folderId: currentFolder.id,
                  userId: currentUser.uid,
                })
              }
            })
          })
          .catch((err) => console.log(err));
      }
    );
  };
  return (
    <>
      <label className="btn btn-outline-success btn-sm m-0 mr-2">
        <FontAwesomeIcon icon={faFileUpload} />
        <input
          type="file"
          name=""
          id=""
          onChange={handleUpload}
          style={{ opacity: 0, position: "absolute", left: "-9999px" }}
        />
      </label>
      {uploadingFiles.length > 0 &&
        ReactDOM.createPortal(
          <div
            style={{
              position: "absolute",
              bottom: "1rem",
              right: "1rem",
              maxWidth: "250px",
            }}
          >
            {uploadingFiles.map((file) => (
              <Toast key={file.id}  onClose={handleClose(file.id)} >
                <Toast.Header
                  closeButton={file.error}
                  className="text-truncate w-100 d-block"
                
                >
                  {file.name}
                </Toast.Header>
                <Toast.Body>
                  <ProgressBar
                    animated={!file.error}
                    variant={file.error ? "danger" : "primary"}
                    now={file.error ? 100 : file.progress}
                    label={
                      file.error ? "Error" : `${Math.round(file.progress)}%`
                    }
                  />
                </Toast.Body>
              </Toast>
            ))}
          </div>,
          document.body
        )}
    </>
  );
}

export default AddFileButton;
