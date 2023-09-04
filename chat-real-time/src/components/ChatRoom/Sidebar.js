import { Col, Row } from 'antd';
import React from 'react';
import UserInfor from './UserInfor';
import RoomList from './RoomList';
import styled from "styled-components"

const SidebarStyle = styled.div`
background: rgb(168 162 158);
  color: white;
  height: 100vh;
`

const Sidebar = () => {
    return (
        <div>
        <SidebarStyle>
          <Row>
            <Col span={24}><UserInfor></UserInfor></Col>
            <Col span={24}><RoomList></RoomList></Col>
          </Row>
        </SidebarStyle>
        </div>
    );
};

export default Sidebar;