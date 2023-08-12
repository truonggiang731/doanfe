import React, { useState } from 'react';
import { Button, Form, Input, Select, Col, Row, message  } from 'antd';
import { apiCall } from 'apis';
const { TextArea } = Input;

const AddHoaDon = () => {
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState('optional');
  const [typeHouse, setTypeHouse] = useState('');
  const [name,setName]=useState('')
  const [note, setNote] = useState('');
  const [typeBuild, setTypeBuilding] = useState('')
  const [canHo, setCanHo] = useState([])

  const [messageApi, com] = message.useMessage();
// //[API]
  const getCanHo = async () => {
    try{
      const res = await apiCall('get_all_canho');
      setCanHo(res);
    //   messageApi.get{
        
    //   }

    } catch{

    }

  }
// //[API]
 
  const handleSubmit = () => {
  };

  return (
    <div>
      {com}

    <Form
      form={form}
      layout="vertical"
    >
      <Row>
      <Form.Item 
        label="Tên căn hộ"
        style={{padding:5, width:'100%'}} 
      >
        <Input placeholder="Tên căn hộ" onChange={(e)=>setName(e.target.value)} />
      </Form.Item>
      <Col span={12}>
      <Form.Item
          label="Tòa nhà"
        >
          <Select
          defaultValue="lucy"
          style={{ padding:5}}
          onChange={(e) =>setTypeHouse(e.target.value)}
          options={[
            { value: 'jack', label: 'Jack' },
            { value: 'lucy', label: 'Lucy' },
            { value: 'Yiminghe', label: 'yiminghe' },
            { value: 'disabled', label: 'Disabled', disabled: true },
          ]}
        />
      </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          label="Loại căn hộ"
        >
          <Select
          defaultValue="lucy"
          style={{ width: '100%',padding:5}}
          onChange={(e)=>setTypeBuilding(e.target.value)}
          options={[
            { value: 'jack', label: 'Jack' },
            { value: 'lucy', label: 'Lucy' },
            { value: 'Yiminghe', label: 'yiminghe' },
            { value: 'disabled', label: 'Disabled', disabled: true },
          ]}
        />
      </Form.Item>
    </Col>
    <Form.Item
        label="Ghi chú"
        style={{width:'100%'}}
      >
        <TextArea showCount maxLength={100} onChange={(e)=>setNote(e.target.value)} />
      </Form.Item>
    </Row>
      <Form.Item>
        
        <Button type="primary" onClick={handleSubmit}>Gửi</Button>
      </Form.Item>
    </Form>
    </div>
    
  );
};
export default AddHoaDon;