import { Search2Icon } from "@chakra-ui/icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { fetchJobHunters } from "../../store/jobHunters/jobHunterSlice";
import foodArray from "../../utils/FoodArray";
import genders from "../../utils/GenderArray";
import hobbiesArray from "../../utils/HobbiesArray";
import professionArray from "../../utils/ProfessionArray";
import religionArray from "../../utils/ReligionArray";
import classes from "./Users.module.css";

const SectionSearch = () => {
  const [gender, setGender] = useState("");
  const [profession, setProfession] = useState("");
  const [hobbies, setHobbies] = useState([]);
  const [religion, setReligion] = useState("");
  const [food, setFood] = useState("");
  const dispatch = useDispatch();

  const customStyles = {
    control: (base) => ({
      ...base,
      height: 50,
      minHeight: 35,
      fontSize: "15px",
    }),
  };

  const handleSumbit = () => {
    let selectedhobbies = hobbies.map((e) => e.value);

    let data = {
      body: {},
    };

    if (selectedhobbies.length > 0) {
      data.body.hobbies = selectedhobbies;
    }
    if (gender) data.gender = gender;
    if (profession) data.profession = profession;
    if (food) data.food_preference = food;
    if (religion) data.religion = religion;

    console.log("-", data);

    dispatch(fetchJobHunters(data));
  };

  return (
    <section className={classes["section-search"]}>
      <div className={classes["search-panel"]}>
        <p className={classes["page-title"]}>Browse Room Mates</p>
        <div
          style={{
            width: "1200px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}>
          <div style={{ width: "50%", height: "100px" }}>
            <Select
              name='location'
              onChange={(e) => {
                setGender(e.value);
              }}
              options={genders}
              className='basic-multi-select'
              classNamePrefix='select'
              placeholder='Select Gender'
              styles={customStyles}
            />
          </div>
          <div style={{ width: "100%" }}>
            <Select
              name='price'
              onChange={(e) => {
                setProfession(e.value);
              }}
              options={professionArray}
              className='basic-multi-select'
              classNamePrefix='select'
              placeholder='Select Profession'
              styles={customStyles}
            />
          </div>
          <div style={{ width: "100%" }}>
            <Select
              isMulti
              name='aval'
              onChange={(e) => {
                setHobbies(e);
              }}
              options={hobbiesArray}
              className='basic-multi-select'
              classNamePrefix='select'
              placeholder='Select Interests'
              styles={customStyles}
            />
          </div>
          <div style={{ width: "50%" }}>
            <Select
              name='aval'
              onChange={(e) => {
                setFood(e.value);
              }}
              options={foodArray}
              className='basic-multi-select'
              classNamePrefix='select'
              placeholder='Select Food Preference'
              styles={customStyles}
            />
          </div>
          <div style={{ width: "50%" }}>
            <Select
              name='aval'
              onChange={(e) => {
                setReligion(e.value);
              }}
              options={religionArray}
              className='basic-multi-select'
              classNamePrefix='select'
              placeholder='Select Religion'
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

export default SectionSearch;
