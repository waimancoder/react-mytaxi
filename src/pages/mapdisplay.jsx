import React, { useState, useEffect } from "react";
import axios from "axios";
import * as ioIcons from "react-icons/io5";
import LoadingModal from "../components/loadingModal";

const LocationDetail = ({ name }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newBlocks, setNewBlocks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedBlocks, setEditedBlocks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [blocksToDelete, setBlocksToDelete] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://35.73.85.13/api/locations/Mahallah%20Ali/`
        );
        setData(response.data.data);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    };

    fetchData().then(() => {
      setIsLoading(false);
    });
  }, []);

  const handleAddBlock = () => {
    setNewBlocks([...newBlocks, { name: "", lat: "", lng: "" }]);
  };

  const handleRowClick = (index) => {
    setEditingIndex(index);
    setIsEditing(true);
    setEditedBlocks([{ ...data.blocks[index] }]);
  };

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const blocks = [...newBlocks];
    blocks[index] = { ...blocks[index], [name]: value };
    setNewBlocks(blocks);
  };

  const handleEditedInputChange = (index, e) => {
    const { name, value } = e.target;
    const edited = [...editedBlocks];
    edited[0][name] = value;
    setEditedBlocks(edited);
  };

  const handleDeleteBlock = async (index) => {
    if (index < data.blocks.length) {
      setIsLoading(true);
      const updatedData = {
        ...data,
        blocks: data.blocks.filter((_, i) => i !== index),
      };
      try {
        const response = await axios.patch(
          `http://35.73.85.13/api/locations/Mahallah%20Ali/`,
          updatedData
        );
        setIsLoading(false);
        console.log(response.data.data);
        setData(updatedData);
      } catch (error) {
        console.log(error);
      }
    } else {
      setNewBlocks((newBlocks) =>
        newBlocks.filter((_, i) => i !== index - data.blocks.length)
      );
      setEditedBlocks((editedBlocks) =>
        editedBlocks.filter((_, i) => i !== index - data.blocks.length)
      );
      setEditingIndex(-1);
    }
    setIsEditing(false);
  };

  const handleSaveChanges = async () => {
    if (!data) return;
    setIsLoading(true);
    const updatedBlocks = [...data.blocks];

    // Merge in the new blocks
    newBlocks.forEach((block) => updatedBlocks.push(block));

    // Merge in the edited blocks
    editedBlocks.forEach((editedBlock) => {
      const index = updatedBlocks.findIndex(
        (block) => block.name === editedBlock.name
      );
      if (index !== -1) {
        updatedBlocks[index] = editedBlock;
      } else {
        updatedBlocks.push(editedBlock);
      }
    });
    const updatedData = {
      ...data,
      blocks: updatedBlocks,
    };
    setData(updatedData);

    try {
      const response = await axios.patch(
        `http://35.73.85.13/api/locations/Mahallah%20Ali/`,
        updatedData
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    // Handle the form submission here (e.g. send data to server)

    handleSaveChanges();
    // Reset newBlocks state
    setNewBlocks([]);
    setEditedBlocks([]);
    setIsEditing(false);
  };

  return (
    <>
      {data && (
        <div className="flex-grow min-h-screen py-20">
          <div className="container max-w-full px-4 py-8 flex flex-col">
            <h2 className="text-white text-2xl font-bold mb-4">
              <span>🏡</span> {data.name}
            </h2>
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="col-span-1">
                <p className="text-white font-semibold">Latitude:</p>
                <p>{data.lat}</p>
              </div>
              <div className="col-span-1">
                <p className=" text-white font-semibold">Longitude:</p>
                <p className="text-white">{data.lng}</p>
              </div>
            </div>
            <div className="my-4 w-full">
              <p className="text-white font-semibold">Polygon:</p>
              <p>{data.polygon}</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 my-4 flex-grow">
              <p className="text-white font-semibold">Blocks:</p>
              <div className="overflow-x-auto">
                <table className="table-auto rounded-lg overflow-x-scroll sm:w-full mt-2 divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-800 text-gray-300">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                        Latitude
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                        Longitude
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium uppercase">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-700 text-gray-200">
                    {data.blocks.map((block, index) => (
                      <tr
                        key={index}
                        className={`${
                          editingIndex === index ? "bg-gray-600" : ""
                        } hover:bg-gray-600`}
                        onClick={() => handleRowClick(index)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {editingIndex === index ? (
                            <input
                              type="text"
                              name="name"
                              className="w-full bg-gray-700 rounded-md text-sm dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                              value={
                                isEditing && editedBlocks[0]
                                  ? editedBlocks[0].name
                                  : block.name
                              }
                              onChange={(e) =>
                                handleEditedInputChange(index, e)
                              }
                            />
                          ) : (
                            block.name
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {editingIndex === index ? (
                            <input
                              type="text"
                              name="lat"
                              className="w-full bg-gray-700 rounded-md text-sm dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                              value={
                                isEditing && editedBlocks[0]
                                  ? editedBlocks[0].lat
                                  : block.lat
                              }
                              onChange={(e) =>
                                handleEditedInputChange(index, e)
                              }
                            />
                          ) : (
                            block.lat
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {editingIndex === index ? (
                            <input
                              type="text"
                              name="lng"
                              className="w-full bg-gray-700 rounded-md text-sm dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                              value={
                                isEditing && editedBlocks[0]
                                  ? editedBlocks[0].lng
                                  : block.lng
                              }
                              onChange={(e) =>
                                handleEditedInputChange(index, e)
                              }
                            />
                          ) : (
                            block.lng
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                          <button
                            type="button"
                            className="text-red-600 hover:text-red-800"
                            onClick={() => handleDeleteBlock(index)}
                          >
                            <ioIcons.IoTrashOutline />
                          </button>
                        </td>
                      </tr>
                    ))}

                    {newBlocks.map((block, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <input
                            type="text"
                            name="name"
                            className="w-full bg-gray-700 rounded-md text-sm dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                            value={block.name}
                            onChange={(e) => handleInputChange(index, e)}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <input
                            type="text"
                            name="lat"
                            className="w-full bg-gray-700 rounded-md text-sm dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                            value={block.lat}
                            onChange={(e) => handleInputChange(index, e)}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <input
                            type="text"
                            name="lng"
                            className="w-full bg-gray-700 rounded-md text-sm dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                            placeholder="This is placeholder"
                            value={block.lng}
                            onChange={(e) => handleInputChange(index, e)}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                          <button
                            type="button"
                            className="text-red-600 hover:text-red-800"
                            onClick={() =>
                              handleDeleteBlock(index + data.blocks.length)
                            }
                          >
                            <ioIcons.IoTrashOutline />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex py-2">
                <button
                  type="button"
                  className="py-3 px-3 inline-flex justify-center  gap-1 rounded-md border border-transparent font-semibold bg-gray-500 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                  onClick={handleAddBlock}
                >
                  Add Block
                </button>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="py-3 px-3 inline-flex gap-1 rounded-md border border-transparent font-semibold bg-gray-500 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800 ml-auto !important"
                onClick={handleSubmit}
              >
                <i className="fas fa-plus-circle"></i> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
      {isLoading && <LoadingModal />}
    </>
  );
};

export default LocationDetail;
