import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import locations from "../../../utils/LocationArray";
import religionArray from "../../../utils/ReligionArray";
import statesArray from "../../../utils/stateArray";
import Sidebar from "../components/Sidebar";

const CreateRooms = () => {
  const [landMark, setLandMark] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [local, setLocal] = useState("");
  const [state, setState] = useState("");
  const [postal, setPostal] = useState("");
  const [building, setBuiling] = useState("");
  const [address, setAddress] = useState("");
  const [capacity, setCapacity] = useState("");
  const [religion, setReligion] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    e.preventDefault();

    console.log(religion);

    const formData = new FormData();
    formData.set("landmark", landMark);
    formData.set("city", local);
    formData.set("state", state);
    formData.set("postalCode", postal);
    formData.set("buildingName", building);
    formData.set("address", address);
    formData.set("religion", religion);
    formData.set("price", price);
    formData.set("capacity", capacity);

    images.forEach((image) => {
      formData.append("photos", image);
    });

    console.log(state);
    console.log(local);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/v1/rooms/add", formData, config);
      if (data.status) {
        navigate("/owner/rooms");
      }
    } catch (err) {
      console.log(err);
    }

    // dispatch(newProduct(formData));
  };

  return (
    <React.Fragment>
      <div className='row'>
        <div className='col-12 col-md-2'>
          <Sidebar />
        </div>

        <div className='col-12 col-md-10'>
          <React.Fragment>
            <div className='my-5'>
              <form
                className='shadow-lg p-5'
                onSubmit={submitHandler}
                encType='multipart/form-data'>
                <h1 className='mb-4'>Create Room</h1>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "2rem",
                    justifyContent: "space-evenly",
                  }}>
                  <div className='form-group' style={{ width: "100%" }}>
                    <label htmlFor='name_field'>City</label>
                    <div style={{ width: "100%", height: "100px" }}>
                      <Select
                        name='location'
                        onChange={(e) => {
                          console.log(e.value);
                          setLocal(e.value);
                        }}
                        options={locations}
                        className='basic-multi-select'
                        classNamePrefix='select'
                        placeholder='Select City'
                      />
                    </div>
                  </div>

                  <div className='form-group' style={{ width: "100%" }}>
                    <label htmlFor='price_field'>Land Mark</label>
                    <input
                      type='text'
                      id='land-mark'
                      className='form-control'
                      value={landMark}
                      style={{ height: "40px" }}
                      onChange={(e) => setLandMark(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "2rem",
                    justifyContent: "space-evenly",
                  }}>
                  <div className='form-group' style={{ width: "100%" }}>
                    <label htmlFor='name_field'>State</label>
                    <div style={{ width: "100%", height: "100px" }}>
                      <Select
                        name='state'
                        onChange={(e) => {
                          setState(e.value);
                        }}
                        options={statesArray}
                        className='basic-multi-select'
                        classNamePrefix='select'
                        placeholder='Select State'
                      />
                    </div>
                  </div>

                  <div className='form-group' style={{ width: "100%" }}>
                    <label htmlFor='postal'>Postal Code</label>
                    <input
                      type='number'
                      id='postal'
                      className='form-control'
                      value={postal}
                      style={{ height: "40px" }}
                      onChange={(e) => setPostal(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "2rem",
                    justifyContent: "space-evenly",
                  }}>
                  <div className='form-group' style={{ width: "100%" }}>
                    <label htmlFor='description_field'>Building Name</label>
                    <input
                      type='text'
                      id='postal'
                      className='form-control'
                      value={building}
                      style={{ height: "40px" }}
                      onChange={(e) => setBuiling(e.target.value)}
                      required
                    />
                  </div>

                  <div className='form-group' style={{ width: "100%" }}>
                    <label htmlFor='category_field'>Address</label>
                    <textarea
                      className='form-control'
                      id='description_field'
                      rows='3'
                      value={address}
                      required
                      onChange={(e) => setAddress(e.target.value)}></textarea>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "2rem",
                    justifyContent: "space-evenly",
                  }}>
                  <div className='form-group' style={{ width: "100%" }}>
                    <label htmlFor='description_field'>Maximum Capacity</label>
                    <input
                      type='number'
                      id='capacity'
                      className='form-control'
                      value={capacity}
                      style={{ height: "40px" }}
                      onChange={(e) => setCapacity(e.target.value)}
                      required
                    />
                  </div>

                  <div className='form-group' style={{ width: "100%" }}>
                    <label htmlFor='category_field'>Allowed Religion</label>
                    <Select
                      name='location'
                      onChange={(e) => {
                        setReligion(e.value);
                      }}
                      options={religionArray}
                      className='basic-multi-select'
                      classNamePrefix='select'
                      placeholder='Select Religion'
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "2rem",
                    justifyContent: "space-evenly",
                  }}>
                  <div className='form-group' style={{ width: "50%" }}>
                    <label htmlFor='description_field'>Price</label>
                    <input
                      type='number'
                      id='price'
                      className='form-control'
                      value={price}
                      style={{ height: "40px" }}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className='form-group'>
                  <label>Images</label>

                  <div className='custom-file'>
                    <input
                      type='file'
                      name='product_images'
                      className='custom-file-input'
                      id='customFile'
                      multiple
                      onChange={onChange}
                      required
                    />
                    <label className='custom-file-label' htmlFor='customFile'>
                      Choose Images
                    </label>
                  </div>

                  <div style={{ display: "flex" }}>
                    {imagesPreview.map((img) => (
                      <img
                        src={img}
                        key={img}
                        alt='Images Preview'
                        className='mt-3 mr-2'
                        width='80'
                        height='80'
                        style={{
                          borderRadius: "10px",
                        }}
                      />
                    ))}
                  </div>
                </div>

                <button
                  id='login_button'
                  type='submit'
                  className='btn btn-block py-3'
                  // disabled={loading}
                >
                  {/* {loading ? <SpinLoader /> : "Create"} */}
                  CREATE
                </button>
              </form>
            </div>
          </React.Fragment>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreateRooms;
