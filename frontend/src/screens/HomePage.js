import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/search/rooms");
  }, [navigate]);

  return <p>Hello</p>;
};

export default HomePage;
