import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as ioIcons from "react-icons/io5";
import LoadingModal from "../components/loadingModal";
import DropdownMenu from "../components/dropdownMenu";
import { useParams } from "react-router-dom";

const LocationDetail = () => {
  const { name } = useParams();
  const [data, setData] = useState(null);
  const [listData, setListData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newBlocks, setNewBlocks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedBlocks, setEditedBlocks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newLat, setNewLat] = useState("");
  const [newLng, setNewLng] = useState("");
  const [newPolygon, setNewPolygon] = useState("");
  const [editingLat, setEditingLat] = useState(false);
  const [editingLng, setEditingLng] = useState(false);
  const [editingPolygon, setEditingPolygon] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        if (name == null) {
          const emptyData = {
            name: "",
            polygon: "",
            lat: "",
            lng: "",
            blocks: [],
          };

          setData(emptyData);
          setNewLat(emptyData.lat);
          setNewLng(emptyData.lng);
          setNewPolygon(emptyData.polygon);
          const response2 = await axios.get(`http://35.73.85.13/api/locations`);
          setListData(response2.data.data);
        } else {
          const response = await axios.get(
            `http://35.73.85.13/api/locations/${name}/`
          );
          const data = response.data.data;
          setData(data);
          setNewLat(data.lat);
          setNewLng(data.lng);
          setNewPolygon(data.polygon);

          const response2 = await axios.get(`http://35.73.85.13/api/locations`);
          setListData(response2.data.data);

          if (data.name) {
            setSelectedOption({ label: data.name, value: data.name });
          }
        }
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    };

    fetchData().then(() => {
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (selectedOption) {
      axios
        .get(`http://35.73.85.13/api/locations/${selectedOption.label}/`)
        .then((response) => {
          setData(response.data.data);
          setIsLoading(false);
          setSearchTerm("");
          setIsOpen(false);
          setIsLoading(false);
          setIsEditing(false);
          setEditingLat(false);
          setEditingLng(false);
          setEditingPolygon(false);
          setEditedBlocks([]);
          setNewBlocks([]);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  }, [selectedOption]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setSearchTerm(option.label);
    const labelWithoutSpaces = option.label.replace(/\s/g, "%20"); // Replace spaces with %20
    navigate(`/dashboard/location/${labelWithoutSpaces}`);
  };

  const handleAddBlock = () => {
    setNewBlocks([...newBlocks, { name: "", lat: "", lng: "" }]);
  };

  const handleRowClick = (index) => {
    setEditingIndex(index);
    setIsEditing(true);
    setEditedBlocks([{ ...data.blocks[index] }]);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
          `http://35.73.85.13/api/locations/${name}/`,
          updatedData
        );
        setIsLoading(false);
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
    setNewBlocks([]);
    setEditedBlocks([]);
  };

  const handleSaveChanges = async () => {
    if (!data) return;
    setIsLoading(true);
    const updatedBlocks = [...data.blocks];

    // Merge in the new blocks
    newBlocks.forEach((block) => {
      // Check if block is not empty
      if (block.name && block.lat && block.lng) {
        updatedBlocks.push(block);
      }
    });

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
      lat: newLat || data.lat,
      lng: newLng || data.lng,
      polygon: newPolygon || data.polygon,
      blocks: updatedBlocks,
    };
    setData(updatedData);

    try {
      const response = await axios.patch(
        `http://35.73.85.13/api/locations/${name}/`,
        updatedData
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setIsEditing(false);
      setEditingLat(false);
      setEditingLng(false);
      setEditingPolygon(false);
      setEditedBlocks([]);
      setNewBlocks([]);
    }
  };

  const handleSubmit = async () => {
    // Handle the form submission here (e.g. send data to server)

    handleSaveChanges();
    // Reset newBlocks state
    setNewBlocks([]);
    setEditedBlocks([]);
  };

  return (
    <>
      {data && (
        <div className="flex-grow min-h-screen py-12">
          <div className="container max-w-full px-4 py-8 flex flex-col">
            <div className="flex text-2xl font-medium py-4">
              <DropdownMenu
                options={
                  listData &&
                  listData.map((data) => ({
                    label: data.name,
                    value: data.name.toLowerCase().replace(/\s+/g, "-"),
                  }))
                }
                selectedOption={selectedOption}
                handleOptionClick={handleOptionClick}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                buttonClassName="inline-flex whitespace-nowrap justify-start rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-blue-700 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                listClassName="justify-start absolute left-0 z-10 mt-2 rounded-md shadow-lg bg-white divide-y divide-gray-100"
                listItemClassName="flex whitespace-nowrap w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                isOpen={isOpen}
                toggleMenu={toggleMenu}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="col-span-1">
                <p className="text-white font-semibold">Latitude:</p>
                {editingLat ? (
                  <input
                    type="text"
                    name="lat"
                    value={newLat}
                    onChange={(e) => setNewLat(e.target.value)}
                    className="w-full text-white bg-gray-700 rounded-md text-sm dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  />
                ) : (
                  <p
                    className="text-white text-sm cursor-pointer"
                    onClick={() => setEditingLat(true)}
                  >
                    {data.lat}
                  </p>
                )}
              </div>
              <div className="col-span-1">
                <p className=" text-white font-semibold">Longitude:</p>
                {editingLng ? (
                  <input
                    type="text"
                    name="lat"
                    value={newLng}
                    onChange={(e) => setNewLng(e.target.value)}
                    className="w-full text-white bg-gray-700 rounded-md text-sm dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  />
                ) : (
                  <p
                    className="text-white text-sm cursor-pointer"
                    onClick={() => setEditingLng(true)}
                  >
                    {data.lng}
                  </p>
                )}
              </div>
            </div>
            <div className="my-4 w-full">
              <p className="text-white font-semibold">Polygon:</p>
              {editingPolygon ? (
                <input
                  type="text"
                  name="lat"
                  value={newPolygon}
                  onChange={(e) => setNewPolygon(e.target.value)}
                  className="w-full text-white bg-gray-700 rounded-md text-sm dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                />
              ) : (
                <p
                  className="text-white text-sm cursor-pointer"
                  onClick={() => setEditingPolygon(true)}
                >
                  {data.polygon}
                </p>
              )}
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
