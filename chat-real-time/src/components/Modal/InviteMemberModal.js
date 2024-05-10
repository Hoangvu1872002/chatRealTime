import React, { useContext, useState } from 'react';
import { Form, Modal, Select, Spin, Avatar, Space } from 'antd';

import { debounce, orderBy } from 'lodash';
import { db } from '../../firebase/config';
import { AppContext } from '../context/AppProvider';
import { collection, doc, getDocs, limit, query, updateDoc, where } from 'firebase/firestore';

function DebounceSelect({
  fetchOptions,
  debounceTimeout = 300,
  curMembers,
  ...props
}) {
  // Search: abcddassdfasdf

  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);

  const debounceFetcher = React.useMemo(() => {
    const loadOptions = (value) => {
      setOptions([]);
      setFetching(true);

      fetchOptions(value, curMembers).then((newOptions) => {
        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOptions, curMembers]);

  React.useEffect(() => {
    return () => {
      // clear when unmount
      setOptions([]);
    };
  }, []);

  return (
    <Select
      labelInValue
      // optionLabelProp="label"
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size='small' /> : null}
      {...props}
    >
      {options.map((opt) => (
        
        <Select.Option key={opt.value} value={opt.value} label = {opt.label}  title={opt.label}>
        <Space>
          <Avatar size='small' src={opt.photoURL}>
            {opt.photoURL ? '' : opt.label?.charAt(0)?.toUpperCase()}
          </Avatar>
          {` ${opt.label}`}
        </Space>
        </Select.Option>
      ))}
    </Select>
  );
}

async function fetchUserList(search, curMembers) {
  const  collectionRef = collection(db, 'users');
  console.log(collectionRef);
  const q = query(collectionRef, where('keywords', 'array-contains', search), limit(20));
  // console.log(q);
  // console.log("c");
  const a = await getDocs(q).then((snapshot) => {
  //  console.log("b");
     return snapshot.docs
       .map((doc) => ({
         label: doc.data().displayName,
         value: doc.data().uid,
         photoURL: doc.data().photoURL,
       }))
       .filter((opt) => !curMembers.includes(opt.value))
   })
  return a
}

export default function InviteMemberModal() {
  const {
    isInviteMemberVisible,
    setIsInviteMemberVisible,
    selectedRoomId,
    selectedRoom,
  } = useContext(AppContext);
  const [value, setValue] = useState([]);
  const [form] = Form.useForm();

  const handleOk = async() => {
    // console.log(value);
    // console.log(selectedRoomId);
    // reset form value
    form.resetFields();
    setValue([]);

    // update members in current room
    // const roomRef = db.collection('rooms').doc(selectedRoomId);
    const roomRef = doc(db, 'rooms', selectedRoomId)

    // roomRef.update({
    //   members: [...selectedRoom.members, ...value.map((val) => val.value)],
    // });
    await updateDoc(roomRef,{
        members: [...selectedRoom.members, ...value.map((val) => val.value)],
       })

    setIsInviteMemberVisible(false);
  };

  const handleCancel = () => {
    // reset form value
    form.resetFields();
    setValue([]);

    setIsInviteMemberVisible(false);
  };

  return (
    <div>
      <Modal
        title='Mời thêm thành viên'
        open={isInviteMemberVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <Form form={form} layout='vertical'>
          <DebounceSelect
            mode='multiple'
            name='search-user'
            value={value}
            placeholder='Nhập tên thành viên'
            fetchOptions={fetchUserList}
            onChange={(newValue) => setValue(newValue)}
            style={{ width: '100%' }}
            curMembers={selectedRoom.members}
          />
        </Form>
      </Modal>
    </div>
  );
}