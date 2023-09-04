import React, { useContext } from 'react';
import { AppContext } from '../context/AppProvider';
import { AuthContext } from '../context/AuthProvider';
import addDocument from '../../firebase/services';
import { Input, Modal, Form } from 'antd';


export default function AddRoomModal() {
  const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
  const {
    user: { uid },
  } = useContext(AuthContext);
  const [form] = Form.useForm();

  const handleOk = () => {
    // handle logic
    // add new room to firestore
    // console.log(!!form.getFieldsValue().description || !!form.getFieldsValue().name);
    if(!!form.getFieldsValue().description || !!form.getFieldsValue().name){
      addDocument('rooms', { ...form.getFieldsValue(), members: [uid] });
      setIsAddRoomVisible(false);
    }else{
      setIsAddRoomVisible(true);
    }

    // reset form value
    form.resetFields();
  };

  const handleCancel = () => {
    // reset form value
    form.resetFields();

    setIsAddRoomVisible(false);
  };

  return (
    <div>
      <Modal
        title='Tạo phòng'
        open={isAddRoomVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout='vertical'>
          <Form.Item label='Tên phòng' name='name'>
            <Input placeholder='Nhập tên phòng' />
          </Form.Item>
          <Form.Item label='Mô tả' name='description'>
            <Input.TextArea placeholder='Nhập mô tả' />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}