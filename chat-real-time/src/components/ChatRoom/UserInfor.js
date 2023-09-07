import { Avatar, Button, Typography } from 'antd';
import { signOut } from 'firebase/auth';
import React, { useContext, useEffect } from 'react';
import { styled } from 'styled-components';
import { auth, db } from '../../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';
import { AuthContext } from '../context/AuthProvider';

const WrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(82, 38, 83);

  .userName {
    color: white;
    margin-left: 5px;
  }
`;

const UserInfor = () => {

    const data = useContext(AuthContext);

    return (   
        <WrapperStyled>         
        
            <div>
                <Avatar src = {data.user.photoURL} >{data.user.photoURL ? '' : data.user.displayName?.charAt(0)?.toUpperCase()}</Avatar>
                <Typography.Text className='userName'>{data.user.displayName}</Typography.Text>
            </div>
            <div>
            <Button ghost onClick={() =>{
                signOut(auth)
            }}>Logout</Button>
            </div>
        
        </WrapperStyled> 
    );
};

export default UserInfor;