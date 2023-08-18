import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, Col, Row, message  } from 'antd';
import { apiCall } from 'apis';
import useAddDichVuQuery from 'hooks/useAddDichVuQuery';
import useLoaiDichVuQuery from 'hooks/useLoaiDichVuQuery';
import useDichVuQuery from 'hooks/useDichVuQuery';
import { useMutation } from 'react-query';

const AddDichVu = () => {
  const [form] = Form.useForm();

  const [loaiDV, setLoaiDV] = useState([])
  const [dichvu, setDichvu] = useState([])

  const [messageApi, com] = message.useMessage();

  const [dichVuDetail, setDichvuDetail] = useState({
    tenDichVu: '',
    loaiDichVuId: 0,
    donGia: 0
  })
  const addDichVuQuery =useAddDichVuQuery();
  const loaiDichVuQuery = useLoaiDichVuQuery();
  const dichVuQuery = useDichVuQuery();

  useEffect(()=>{
    if (loaiDichVuQuery.data)
      setLoaiDV(loaiDichVuQuery.data);
  },[loaiDichVuQuery.data])

  useEffect(()=>{
    if (dichVuQuery.data)
      setDichvu(dichVuQuery.data);
  },[dichVuQuery.data])

  const add = useMutation({
    mutationFn: () => apiCall('add_dichvu', dichVuDetail),
    onSettled: () => addDichVuQuery.refetch()
  })
// //[API]

  
const addDichVu = async () => {
    
  try{
    if (!dichVuDetail.tenDichVu || !dichVuDetail.loaiDichVuId || !dichVuDetail.donGia) {
      messageApi.open({
        type: 'warning',
        content: 'Vui lòng nhập đầy đủ thông tin!',
        duration: 10,
      });
    }
    const exists = dichvu.some(dichVu =>
      dichVu.tenDichVu === dichVuDetail.tenDichVu 
    );
    if (!exists) {
      await add.mutateAsync();
      console.log("ok");
    messageApi.open({
      type: 'success',
      content: 'cập nhật thành công!',
      duration: 10,
    });
    } else {
      messageApi.open({
        type: 'error',
        content: 'Dịch vụ đã tồn tại trong cơ sở dữ liệu!',
        duration: 10,
      });
    }
  } catch{
    console.log("khong add duoc can ho")
  }

}
// //[API]
 
  

  return (
    <div>
      {com}

    <Form
      form={form}
      layout="vertical"
    >
      <Row>
      <Form.Item 
        label="Tên dịch vụ"
        style={{padding:5, width:'100%'}} 
      >
        <Input value={dichVuDetail.tenDichVu}
          onChange={(e)=> setDichvuDetail({...dichVuDetail, tenDichVu: e.target.value})} />

      </Form.Item>
      <Col span={12}>
      <Form.Item
          label="Loại dịch vụ"
        >
          <Select
          style={{ padding:5}}
          value={dichVuDetail.toaNhaId}
          onChange={(value) => setDichvuDetail({...dichVuDetail, loaiDichVuId: value})}
          options={loaiDV.map((option)=>({
            value: option.id,
            label: option.name,
          })
          ) }  />
      </Form.Item>
      </Col>
      <Form.Item 
        label="Đơn giá"
        style={{padding:5, width:'100%'}} 
      >
        <Input value={dichVuDetail.donGia}
          onChange={(e)=> setDichvuDetail({...dichVuDetail, donGia: e.target.value})} />

      </Form.Item>
    </Row>
      <Form.Item>
        
        <Button type="primary" onClick={addDichVu}>Gửi</Button>
      </Form.Item>
    </Form>
    </div>
    
  );
};
export default AddDichVu;