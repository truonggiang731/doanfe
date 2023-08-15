import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, Col, Row, message, DatePicker  } from 'antd';
import { apiCall } from 'apis';
import useCanHoQuery from 'hooks/useCanHoQuery';
import useAddCanHoQuery from 'hooks/UseAddCanHoQuery';
import { useMutation } from 'react-query';
import useLoaiCanHoQuery from 'hooks/useLoaiCanHoQuery';
import useToaNhaQuery from 'hooks/useToaNhaQuery';
import useDichVuQuery from 'hooks/useDichVuQuery';
import useUserQuery from 'hooks/useUserQuery';
import useAddHopDongQuery from 'hooks/useAddHopDongQuery';
import useHopDongQuery from 'hooks/useHopDongQuery';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
const dateFormat = 'YYYY/MM/DD';

const AddHopDongAdmin = () => {
  const customFormat = (value) => `custom format: ${value.format(dateFormat)}`;
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState('optional');
  const [hopDong, setHopDong] = useState([])
  const [canHo, setCanHo] = useState([])
  const [user, setUser] = useState([])
  const [dichVu, setDichVu] = useState([])

  const [messageApi, com] = message.useMessage();

  const [hopDongDetail, setHopDongDetail] = useState({
    ngaydangky: new Date(),
    ngayhethan: new Date(),
    canHoId: 0,
    dichVuId: 0,
    userId: 0
  })

  const addHopDongQuery = useAddHopDongQuery();
  const hopDongQuery = useHopDongQuery();
  const canHoQuery = useCanHoQuery();
  const dichVuQuery = useDichVuQuery();
  const userQuery = useUserQuery();

  useEffect(()=>{
    if (dichVuQuery.data)
      setDichVu(dichVuQuery.data);
  },[dichVuQuery.data])

  useEffect(()=>{
    if (canHoQuery.data)
      setCanHo(canHoQuery.data);
  },[canHoQuery.data])

  useEffect(()=>{
    if (userQuery.data)
      setUser(userQuery.data);
  },[userQuery.data])

  const add = useMutation({
    mutationFn: () => apiCall('add_hopdong', hopDongDetail),
    onSettled: () => addHopDongQuery.refetch()
  })




// //[API]
  

  

  const addHopdong = async () => {
    
    try{
      if (!hopDongDetail.ngayDangKy || !hopDongDetail.canHoId || !hopDongDetail.dichVuId || hopDongDetail.userId) {
        messageApi.open({
          type: 'warning',
          content: 'Vui lòng nhập đầy đủ thông tin!',
          duration: 10,
        });
      }else{
        const exists = hopDongQuery.data.some(hopdong =>
          hopdong.ngayDangKy === hopDongDetail.ngayDangKy &&
          hopdong.canHoId === hopDongDetail.canHoId &&
          hopdong.userId === hopDongDetail.userId&&
          hopdong.dichVuId === hopDongDetail.dichVuId
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
            content: 'Căn hộ đã được đăng ký dịch vụ này!',
            duration: 10,
          });
        }
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
        label="Ngày đăng ký"
        style={{padding:5, width:'100%'}} 
      >
          <DatePicker defaultValue={dayjs()} format={dateFormat}
          onChange={(e)=> setHopDongDetail({...hopDongDetail, ngaydangky: e.target.value})}
          style={{width: '100%'}}  />
      </Form.Item>
      <Form.Item 
        label="Ngày hết hạn"
        style={{padding:5, width:'100%'}} 
      >
        <DatePicker defaultValue={dayjs()} format={dateFormat}
          onChange={(e)=> setHopDongDetail({...hopDongDetail, ngayhethan: e.target.value})}
          style={{width: '100%'}}  />
      </Form.Item>
      <Col span={12}>
      <Form.Item
          label="Người đăng ký"
        >
          <Select
          //defaultValue="lucy"
          style={{ padding:5}}
          value={hopDongDetail.userId}
          onChange={(value) => setHopDongDetail({...hopDongDetail, userId: value})}
          options={user.map((option)=>({
            value: option.id,
            label: option.name,
          })
          ) } 
        />
      </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          label="Căn hộ"
        >
          <Select
          //defaultValue="lucy"
          style={{ width: '100%',padding:5}}
          onChange={(value) => setHopDongDetail({...hopDongDetail, canHoId: value})}
          value={hopDongDetail.loaiCanHoId}
          options={canHo.map((option)=>({
            value: option.id,
            label: option.tenCanHo,
          })) } 
        />
      </Form.Item>
    </Col>
    <Col span={12}>
        <Form.Item
          label="Dịch vụ"
        >
          <Select
          //defaultValue="lucy"
          style={{ width: '100%',padding:5}}
          onChange={(value) => setHopDongDetail({...hopDongDetail, dichVuId: value})}
          value={hopDongDetail.dichVuId}
          options={dichVu.map((option)=>({
            value: option.id,
            label: option.tenDichVu,
          })) } 
        />
      </Form.Item>
    </Col>
    </Row>
      <Form.Item>
        
        <Button type="primary" onClick={addHopdong}>Gửi</Button>
      </Form.Item>
    </Form>
    </div>
    
  );
};
export default AddHopDongAdmin;