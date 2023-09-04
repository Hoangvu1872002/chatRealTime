import { UserAddOutlined } from "@ant-design/icons";
import { Avatar, Button, Form, Input, Tooltip, Alert } from "antd";
import React, { useContext, useMemo, useState } from "react";
import { styled } from "styled-components";
import Message from "./Message";
import { AppContext } from "../context/AppProvider";
import addDocument from "../../firebase/services";
import { AuthContext } from "../context/AuthProvider";
import useFirestore from "../../hooks/useFirestore";

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid rgb(230, 230, 230);

  .header {
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &__title {
      margin: 0;
      font-weight: bold;
    }

    &__description {
      font-size: 12px;
    }
  }
`;

const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
`;

const WrapperStyled = styled.div`
  height: 100vh;
`;

const ContentStyled = styled.div`
  height: calc(100% - 70px);
  display: flex;
  flex-direction: column;
  padding: 0 11px 0 11px;
  justify-content: flex-end;
`;

const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 2px;

  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;

const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;

const ChatWindow = () => {
  const { selectedRoom, members, setIsInviteMemberVisible } =
    useContext(AppContext);
  const {
    user: { uid, photoURL, displayName },
  } = useContext(AuthContext);

  const [inputValue, setInputValue] = useState("");

  const [form] = Form.useForm();

  const handleInputChagne = (e) => {
    setInputValue(e.target.value);
  };

  const handleonSubmit = () => {
    addDocument("messages", {
      text: inputValue,
      uid,
      photoURL,
      roomId: selectedRoom.id,
      displayName,
    });
    form.resetFields(["messages"]);
  };

  const condition = useMemo(
    () => ({
      fieldName: 'roomId',
      operator: '==',
      compareValue: selectedRoom.id
    }),
    [selectedRoom.id]
  )
  const messages = useFirestore('messages', condition);

  return (
    <div>
      {selectedRoom.id ? (
        <WrapperStyled>
          <HeaderStyled className="header-infor">
            <div className="header__infor">
              <p className="header__title">{selectedRoom.name}</p>
              <span className="header__description">
                {selectedRoom.description}
              </span>
            </div>
            <ButtonGroupStyled>
              <Button
                icon={<UserAddOutlined></UserAddOutlined>}
                onClick={() => setIsInviteMemberVisible(true)}
              >
                Add
              </Button>
              <Avatar.Group size="small" maxCount={2}>
                {members.map((member) => (
                  <Tooltip title={member.displayName} key={member.id}>
                    <Avatar src={member.photoURL}>
                      {member.photoURL
                        ? ""
                        : member.displayName?.charAt(0)?.toUpperCase()}
                    </Avatar>
                  </Tooltip>
                ))}
              </Avatar.Group>
            </ButtonGroupStyled>
          </HeaderStyled>
          <ContentStyled>
            <MessageListStyled>
            {
              messages.map(mes => (
                <Message
                key ={mes.id}
                text={mes.text}
                photoURL={mes.photoURL}
                displayName={mes.displayName}
                createAt={mes.createAt}
              ></Message>
              ))
            }
            </MessageListStyled>
            <FormStyled form={form}>
              <Form.Item name="messages">
                <Input
                  bordered={false}
                  autoComplete="off"
                  placeholder="Enter message ..."
                  onChange={handleInputChagne}
                  onPressEnter={handleonSubmit}
                ></Input>
              </Form.Item>
              <Button type="primary" onClick={handleonSubmit}>
                Submit
              </Button>
            </FormStyled>
          </ContentStyled>
        </WrapperStyled>
      ) : (
        <Alert
          message="Hãy chọn phòng"
          type="info"
          showIcon
          style={{ margin: 5 }}
          closable
        ></Alert>
      )}
    </div>
  );
};

export default ChatWindow;
