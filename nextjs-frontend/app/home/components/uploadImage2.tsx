"use client";
import React, { useState } from "react";
import Image from "next/image";
import Modal from "react-modal";

interface infos {
  file: File;
  name: string;
}

const UploadForm2 = () => {
  const [files, setFiles] = useState([]);
  const [fileInfos, setFileInfos] = useState<infos[]>([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  //TODO Handle error messages from the server
  // https://chat.openai.com/share/30e8b2ed-7fbb-4796-ac0b-517bc67a02f7

  const handleFileChange = (event: any) => {
    const selectedFiles = event.target.files;
    setFiles(selectedFiles);

    // Extract file names
    const infos: infos[] = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      infos.push({
        file: selectedFiles[i],
        name: selectedFiles[i].name,
      });
    }
    setFileInfos(infos);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append(`image-${i}`, files[i], fileInfos[i].name); // Append file with its name
    }

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      console.log("Files uploaded successfully");
      // Fetch uploaded image URLs after successful upload
      const data = await response.json();
      if (data && data.uploadedUrls) {
        setUploadedImageUrls(data.uploadedUrls);
           // Clear form
      }
    } else {
      console.error("Failed to upload files");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="file" multiple onChange={handleFileChange} />
        </div>
        <div>
          {/* Display selected file names */}
          {fileInfos.map((info, index) => (
            <div key={index}>
              <div>{info.name}</div>
              <Image
                src={URL.createObjectURL(info.file)}
                alt={`Uploaded image ${index}`}
                width={100}
                height={200}
                onClick={openModal}
                style={{ cursor: "pointer" }}
              />
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Image Modal"
              >
                <Image
                  src={URL.createObjectURL(info.file)}
                  alt={`Uploaded image ${index}`}
                  width={500} // Set to desired full-size width
                  height={1000} // Set to desired full-size height
                />
                <button
                  onClick={closeModal}
                  style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    padding: "1rem",
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "1.2rem",
                  }}
                >
                  Close
                </button>
              </Modal>
            </div>
          ))}
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadForm2;
