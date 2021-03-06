import React from "react";
import {useParams,useLocation} from 'react-router-dom'
import { Container } from "react-bootstrap";
import { useFolder } from "../../hooks/useFolder";
import AddFolderButton from "./AddFolderButton";
import Folders from "./Folders";
import Navbar from "./Navbar";
import FolderBreadcrumbs from "./FolderBreadcrumbs";
import AddFileButton from "./AddFileButton";
import File from "./File";

export default function Dashboard() {
  const {folderId} = useParams()
  const { state = {} } = useLocation()
  const {folder , childFolders , childFiles } = useFolder(folderId,state.folder);
  // console.log( "dash" , folder , childFolders.length , childFolders);
  return (
    <>
      <Navbar />
      <Container fluid>
      <div className="d-flex align-items-center pt-3">
      <AddFileButton  currentFolder={folder} />
      <AddFolderButton  currentFolder={folder} />
      <FolderBreadcrumbs currentFolder={folder}/>
      </div>
        {childFolders.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFolders.map(childFolder => (
              <div
                key={childFolder.id}
                style={{ maxWidth: "250px" }}
                className="p-2"
              >
                <Folders folder={childFolder} />
              </div>
            ))}
          </div>
        )}
         {childFolders.length > 0 && childFiles.length > 0 && <hr />}
         {childFiles.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFiles.map(childFile => (
              <div
                key={childFile.id}
                style={{ maxWidth: "250px" }}
                className="p-2"
              >
                <File file={childFile} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
