import React from "react";
import {useParams} from 'react-router-dom'
import { Container } from "react-bootstrap";
import { useFolder } from "../../hooks/useFolder";
import AddFolderButton from "./AddFolderButton";
import Folders from "./Folders";
import Navbar from "./Navbar";
import FolderBreadcrumbs from "./FolderBreadcrumbs";

export default function Dashboard() {
  const {folderId} = useParams()
  
  const {folder , childFolders } = useFolder(folderId);
  // console.log( "dash" , folder , childFolders.length , childFolders);
  return (
    <>
      <Navbar />
      <Container fluid>
      <div className="d-flex align-items-center pt-3">
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
      </Container>
    </>
  );
}
