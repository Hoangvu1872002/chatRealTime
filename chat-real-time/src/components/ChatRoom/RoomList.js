import { Button, Collapse, Typography } from 'antd';
import React, { useContext, useMemo } from 'react';
import { styled } from 'styled-components';
import {PlusSquareOutlined} from "@ant-design/icons"

import { AppContext } from '../context/AppProvider';

const {Panel} = Collapse;

const PanelStyled = styled(Panel)`
  &&& {
    .ant-collapse-header,
    p {
      color: white;
    }

    .ant-collapse-content-box {
      padding: 0 40px;
      
    }

    .addRoom {
      color: white;
      padding: 0;
    }
  }
`;

const LinkStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  color: white;
`;
const RoomList = () => {
  const {rooms, setIsAddRoomVisible, setSelectedRoomId} = useContext(AppContext);
  // console.log(rooms);
  const handleAddRoom = () => {
    setIsAddRoomVisible(true);
  }

    return (
        <Collapse  ghost  >
            <PanelStyled header="List room" key = "1" >
                {rooms?.map(room => <LinkStyled  key = {room.id} onClick={() => setSelectedRoomId(room.id)}>{room.name}</LinkStyled>)}
                <Button type='text' icon = {<PlusSquareOutlined></PlusSquareOutlined>} className='addRoom'
                onClick={handleAddRoom}
                >Add Room</Button>
            </PanelStyled>
            
        </Collapse>
    );
};

export default RoomList;