import React, { createContext, useContext, useMemo, useState } from "react";
import { AuthContext } from "./AuthProvider";
import useFirestore from "../../hooks/useFirestore";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);
  const [isRemoveMemberVisible, setIsRemoveMemberVisible] = useState(false);
  const { user } = useContext(AuthContext);

  const roomsCondition = useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: user.uid,
    };
  }, [user.uid]);
  const rooms = useFirestore("rooms", roomsCondition);
  //   console.log(rooms);

  const selectedRoom = useMemo(
    () => rooms.find((room) => room.id === selectedRoomId) || {}
    ,[rooms, selectedRoomId]);


  const usersCondition = useMemo(() => {
    return {
      fieldName: "uid",
      operator: "in",
      compareValue: selectedRoom.members,
    };
  }, [selectedRoom.members]);

  const members = useFirestore("users", usersCondition);

  return (
    <AppContext.Provider
      value={{
        rooms,
        isAddRoomVisible,
        setIsAddRoomVisible,
        selectedRoomId,
        setSelectedRoomId,
        selectedRoom,
        members,
        isInviteMemberVisible, 
        setIsInviteMemberVisible,
        isRemoveMemberVisible,
        setIsRemoveMemberVisible,

      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
