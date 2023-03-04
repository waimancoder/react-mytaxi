// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function Slider() {
//   const [imageList, setImageList] = useState([]);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await axios("https://your-django-api-url.com/images/");
//       setImageList(result.data);
//     };

//     fetchData();
//   }, []);

//   const handleNextImage = () => {
//     setCurrentImageIndex(currentImageIndex + 1);
//   };

//   const handlePrevImage = () => {
//     setCurrentImageIndex(currentImageIndex - 1);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <div className="my-2">
//         <img
//           src={imageList[currentImageIndex]?.url}
//           alt="Current Image"
//           className="w-96 h-96 object-cover"
//         />
//       </div>
//       <div className="flex justify-center">
//         <button
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l"
//           onClick={handlePrevImage}
//           disabled={currentImageIndex === 0}
//         >
//           Prev
//         </button>
//         <button
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
//           onClick={handleNextImage}
//           disabled={currentImageIndex === imageList.length - 1}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Slider;
