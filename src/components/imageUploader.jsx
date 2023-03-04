import React, { useState } from "react";

function ImageUploader() {
  const [image, setImage] = useState("");
  const [base64String, setBase64String] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
      setBase64String(reader.result.split(",")[1]);
    };
  };

  return (
    <div>
      <input name="img" onSubmit={handleImageUpload}></input>
    </div>
  );
}
