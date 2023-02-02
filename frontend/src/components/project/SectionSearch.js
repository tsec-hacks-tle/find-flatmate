import React, { useState } from "react";
import FilterByTech from "./FilterByTech";
import FilterByKeyword from "./FilterByKeyword";
import classes from "./Projects.module.css";
import FilterOptions from "./FilterOptions";
import TechnologyArray from "../../utils/TechnologyArray";
import { Search2Icon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { fetchProjects } from "../../store/projects/projectSlice";
import Select from "react-select";
import locations from "../../utils/LocationArray";
import priceArray from "../../utils/priceArray";
import ratingArray from "../../utils/ratingArray";
import hobbiesArray from "../../utils/HobbiesArray";

const SearchPanel = () => {
  const [locat, setLocat] = useState([]);
  const [techArray, setTechArray] = useState([]);
  const [price, setPrice] = useState("");

  const dispatch = useDispatch();

  const handleSumbit = () => {
    let selectedLocations = locat.map((e) => e.value);
    let selectedPrice = [];

    if (price) {
      selectedPrice = price.split("-").map((e) => +e.trim());
    }

    let body = {};

    if (selectedLocations.length > 0) {
      body.city = selectedLocations;
    }

    dispatch(
      fetchProjects({
        body,
        price: selectedPrice,
      })
    );
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      height: 50,
      minHeight: 35,
      fontSize: "15px",
    }),
  };

  return (
    <section className={classes["section-search"]}>
      <div className={classes["search-panel"]}>
        <p className={classes["page-title"]}>Browse Rooms</p>
        <div
          style={{
            width: "1200px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}>
          <div style={{ width: "100%", height: "100px" }}>
            <Select
              isMulti
              name='location'
              onChange={(e) => {
                setLocat(e);
              }}
              options={locations}
              className='basic-multi-select'
              classNamePrefix='select'
              placeholder='Select City'
              styles={customStyles}
            />
          </div>
          <div style={{ width: "100%" }}>
            <Select
              name='price'
              onChange={(e) => {
                setPrice(e.value);
              }}
              options={priceArray}
              className='basic-multi-select'
              classNamePrefix='select'
              placeholder='Select Price'
              styles={customStyles}
            />
          </div>
          <div style={{ width: "100%" }}>
            <Select
              isMulti
              name='aval'
              onChange={(e) => {
                console.log(e);
              }}
              options={hobbiesArray}
              className='basic-multi-select'
              classNamePrefix='select'
              placeholder='Select Interest'
              styles={customStyles}
            />
          </div>
          <div style={{ width: "100%" }}>
            <Select
              isMulti
              name='aval'
              onChange={(e) => {
                console.log(e);
              }}
              options={ratingArray}
              className='basic-multi-select'
              classNamePrefix='select'
              placeholder='Select Rating'
              styles={customStyles}
            />
          </div>

          <button
            className='btn btn-small'
            style={{
              marginLeft: "10px",
              marginTop: "5px",
              height: "40px",
              width: "40px",
            }}
            onClick={handleSumbit}>
            <Search2Icon />
          </button>
        </div>
        <div></div>
      </div>
    </section>
  );
};

export default SearchPanel;
