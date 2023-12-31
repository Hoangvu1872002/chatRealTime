import { Avatar, Button, Typography } from 'antd';
import React from 'react';
import { styled } from 'styled-components';
import { formatRelative } from 'date-fns/esm';
import { UndoOutlined } from '@ant-design/icons';


const WrapperStyled = styled.div`
  margin-bottom: 10px;

  .author {
    margin-left: 5px;
    font-weight: bold;
  }

  .date {
    margin-left: 10px;
    font-size: 11px;
    color: #a7a7a7;
  }

  .content {
    margin-left: 30px;
  }
`;

function formatDate(seconds) {
  let formattedDate = '';

  if (seconds) {
    formattedDate = formatRelative(new Date(seconds * 1000), new Date());

    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }

  return formattedDate;
}
const Message = ({text, displayName, createAt, photoURL, handleRetract}) => {
    return (
        <WrapperStyled>
            <div>
                <Avatar  size='smal' src = {photoURL}>{photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}</Avatar>
                <Typography.Text className='author'>{displayName}</Typography.Text>
                <Typography.Text className='date'>{formatDate(createAt?.seconds)}</Typography.Text>
            </div>
            <div className='flex items-center'>
                <Typography className='content bg-sky-400 p-1 rounded-lg'>{text}</Typography>
                <Button className='rounded-full border-0 ml-5 pt-[4px]  ' onClick={handleRetract} icon = {<UndoOutlined />}></Button>
            </div>
        </WrapperStyled>
    );
};

export default Message;