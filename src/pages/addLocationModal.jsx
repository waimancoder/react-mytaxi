import axios from "axios";
import { useState } from "react";
import LoadingModal from "../components/loadingModal";

function AddLocationModal({ onClose, prevListData, setListData }) {
  const [name, setName] = useState("");
  const [polygon, setPolygon] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [blocks, setBlocks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name,
      polygon,
      lat,
      lng,
      blocks,
    };
    setIsLoading(true);
    axios
      .post("http://35.73.85.13/api/locations", data)
      .then((response) => {
        console.log("Success:", response.data);
        onClose(); // Close the modal
        setIsLoading(false);
        axios
          .get("http://35.73.85.13/api/locations")
          .then((response) => {
            setListData(response.data.data); // Update listData state with new data
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleCancelClick = () => {
    onClose(); // Close the modal
  };

  return (
    <>
      <div className="font-Inter py-12 fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <div
            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <form onSubmit={handleSubmit}>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div
                    className="mt-3 text-center sm:mt-0 sm:text-left"
                    style={{ width: "100%" }}
                  >
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      Add Location
                    </h3>
                    <div className="mt-2">
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 font-bold text-base mb-2"
                          htmlFor="name"
                        >
                          Name
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="name"
                          type="text"
                          placeholder="Enter name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 font-bold text-base mb-2"
                          htmlFor="polygon"
                        >
                          Polygon
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="polygon"
                          type="text"
                          placeholder="Enter polygon"
                          value={polygon}
                          onChange={(e) => setPolygon(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 font-bold text-base mb-2"
                          htmlFor="lat"
                        >
                          Latitude
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="lat"
                          type="text"
                          placeholder="Enter latitude"
                          value={lat}
                          onChange={(e) => setLat(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 font-bold text-base mb-2"
                          htmlFor="lng"
                        >
                          Longitude
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="lng"
                          type="text"
                          placeholder="Enter longitude"
                          value={lng}
                          onChange={(e) => setLng(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancelClick}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {isLoading && <LoadingModal />}
    </>
  );
}

export default AddLocationModal;
