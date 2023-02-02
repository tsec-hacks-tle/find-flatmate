import { BellIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import {
  appendNotication,
  setNewNotificationsToFalse,
} from "../../store/notifications/notificatonSlice";
import TimeAgo from "timeago-react";

const ENDPOINT = "https://programmer-recruiter-krish.onrender.com/";
var socket;

const activeStyles = {
  width: "6px",
  height: "6px",
  borderRadius: "50%",
  backgroundColor: "#0c67dd",
  position: "absolute",
  top: 0,
  right: "2px",
};

const NotficationPanel = () => {
  // const [socketConnected, setSocketConnected] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { notifications } = useSelector((state) => state.notifications);
  const dispatch = useDispatch();
  console.log(notifications);

  useEffect(() => {
    // Starting socket connection
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.emit("join room", user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on("recieve", (obj) => {
      if (user.id === obj.jobHunterId) {
        console.log("notification", obj);
        dispatch(
          appendNotication({ new: true, createdAt: Date.now(), ...obj })
        );

        if (Notification.permission === "granted") {
          new Notification("New Message from FindProgrammer", {
            body: obj.content,
          });
        }
      }
    });
  }, []);

  const showNotficationBage = notifications.some((el) => el?.new === true);

  console.log(showNotficationBage);

  const handleClick = () => {
    dispatch(setNewNotificationsToFalse());
  };

  return (
    <div>
      <Menu>
        <MenuButton style={{ position: "relative" }} onClick={handleClick}>
          {showNotficationBage && <div style={activeStyles}></div>}
          <BellIcon fontSize='3xl' m={1} />
        </MenuButton>
        <MenuList pl={2} maxHeight='300px' overflow='scroll' zIndex='111'>
          {!notifications.length && "No New Messages"}
          {notifications.map((notif, i) => (
            <MenuItem
              fontSize='1.4rem'
              p='10px 20px'
              borderBottom='1px solid #ccc'
              key={i}
              cursor='auto'>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2px",
                }}>
                {notif.content}

                <p
                  style={{
                    fontSize: "1.2rem",
                    color: "#868e96",
                    alignSelf: "flex-end",
                  }}>
                  <TimeAgo datetime={notif?.createdAt} locale='en-Us' />
                </p>
              </div>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </div>
  );
};

export default NotficationPanel;
