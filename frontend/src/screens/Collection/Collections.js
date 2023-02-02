import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import classes from "../../components/jobHunterDetails/jobHunterDetails.module.css";

const style = {
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "row",
  margin: "2rem 0 10rem 0",
};

const Collections = () => {
  const { collections } = useSelector((state) => state.collections);
  const navigate = useNavigate();

  return (
    <div style={style}>
      {collections?.length > 0 ? (
        <div className={classes["user-projects"]}>
          {collections?.map((el, i) => {
            return (
              <div key={i} className={classes["user-project"]}>
                <div className={classes["user-project-info"]}>
                  <img src={el?.photo?.url} alt={el?.title} />
                  <p
                    className={classes["project-name"]}
                    onClick={() => navigate(`/project/${el._id}`)}>
                    {el?.title}
                  </p>
                  <div className={classes["project-skills"]}>
                    {el?.tags?.map((element, i) => {
                      return <p key={i}>{element}</p>;
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p
          className='not-found'
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}>
          Couldn't find any collections.
        </p>
      )}
    </div>
  );
};

export default Collections;
