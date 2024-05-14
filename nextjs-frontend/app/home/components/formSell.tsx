import UploadImages from "./uploadImages";

interface FormData {
  images: UploadedImage[]; // Corrected type definition
}

interface UploadedImage {
  file: File;
  name: string; // Alt text for accessibility
  // Add more properties as needed
}

const FormSell = () => {
  const [images, setImages] = useState<UploadedImage[]>([]); // Corrected type definition

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData: FormData = {
      images,
    };
    console.log("Submit ", formData);
    sendDataToServer(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <UploadImages onSaveImages={setImages} />
      <label htmlFor="title">Title:</label>
      <br />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

async function sendDataToServer(formData: FormData) {
  /* const form = new FormData();
  for (const [key, value] of Object.entries(formData)) {
    form.append(key, value);
  }

  const response = await fetch("/api/formDataSell", {
    method: "POST",
    body: form,
  });

  if (response.ok) {
    console.log("Files uploaded successfully");
    // Fetch uploaded image URLs after successful upload
    const data = await response.json();
  } else {
    console.error("Failed to upload files");
  } */
}

export default FormSell;
