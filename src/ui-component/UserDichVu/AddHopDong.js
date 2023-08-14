import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, Col, Row, message  } from 'antd';
import { apiCall } from 'apis';
import useCanHoQuery from 'hooks/useCanHoQuery';
import { useMutation } from 'react-query';
import useDichVuQuery from 'hooks/useDichVuQuery';
import useUserHopDongQuery from 'hooks/useUserHopDongQuery';

const AddHopDong = () => {
  const [form] = Form.useForm();

  const [dichVu, setDichVu] = useState([])
  const [hopDong, setHopDong] = useState([])
  const [canHo, setCanHo] = useState([])

  const [hopDongDetail, setHopDongDetail] = useState({
    id: 0,
    ngaydangky: new Date().toString(),
    ngayhethan: new Date().toString(),
    canHoId: 0,
    dichVuId: 0
  });

  const [messageApi, com] = message.useMessage();

  const dichVuQuery = useDichVuQuery();
  const canHoQuery = useCanHoQuery();
  const userHopDongQuery = useUserHopDongQuery();

  useEffect(()=>{
    if (dichVuQuery.data)
      setDichVu(dichVuQuery.data);
  },[dichVuQuery.data])

  useEffect(()=>{
    if (canHoQuery.data)
      setCanHo(canHoQuery.data);
  },[canHoQuery.data])

  useEffect(()=>{
    if (userHopDongQuery.data)
      setHopDong(userHopDongQuery.data);
  },[userHopDongQuery.data])

  const add = useMutation({
    mutationFn: () => apiCall('add_hopdong', hopDongDetail),
    onSettled: () => userHopDongQuery.refetch()
  })

  const addHouse = async () => {
    try{
        await add.mutateAsync();
        console.log("ok");
      messageApi.open({
        type: 'success',
        content: 'cập nhật thành công!',
        duration: 10,
      });
    } catch{
      console.log("Thêm thất bại")
    }

  }

  if (dichVuQuery.isLoading || canHoQuery.isLoading || userHopDongQuery.isLoading ) {
    return null;
  }

  return (
    <div>
      {com}
    <Form
      form={form}
      layout="vertical"
    >
      <Row>
      <Form.Item 
        label="Ngày đăng ký"
        style={{padding:5, width:'100%'}} 
      >
        <Input placeholder="Ngày đăng ký"
          value={new Date(hopDongDetail.ngaydangky)}
          onChange={(e)=> setHopDongDetail({...hopDongDetail, ngaydangky: e.target.value.toString()})}
          type="date"/>
      </Form.Item>
      <Form.Item 
        label="Ngày hết hạn"
        style={{padding:5, width:'100%'}} 
      >
        <Input placeholder="Ngày hết hạn"
          value={new Date(hopDongDetail.ngayhethan)}
          onChange={(e)=> setHopDongDetail({...hopDongDetail, ngayhethan: e.target.value})}
          type="date"/>
      </Form.Item>
      <Col span={12}>
      <Form.Item label="Dịch vụ">
          <Select
          //defaultValue="lucy"
          style={{ padding:5}}
          value={hopDongDetail.dichVuId}
          onChange={(value) => setHopDongDetail({...hopDongDetail, dichVuId: value})}
          options={dichVu.map((option)=>({
            value: option.id,
            label: option.name,
          })
          ) } 
        />
      </Form.Item>
      </Col>
      <Col span={12}>
      <Form.Item label="Căn hộ">
          <Select
          //defaultValue="lucy"
          style={{ padding:5}}
          value={hopDongDetail.canHoId}
          onChange={(value) => setHopDongDetail({...hopDongDetail, canHoId: value})}
          options={canHo.map((option)=>({
            value: option.id,
            label: option.name,
          })
          ) } 
        />
      </Form.Item>
      </Col>
    </Row>
      <Form.Item>
        <Button type="primary" onClick={addHouse}>Gửi</Button>
      </Form.Item>
    </Form>
    </div>
    
  );
};
export default AddHopDong;
