import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, Col, Row, message  } from 'antd';
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
const { TextArea } = Input;

const AddHopDong = () => {
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState('optional');
  const [hopDong, setHopDong] = useState([])
  const [canHo, setCanHo] = useState([])
  const [user, setUser] = useState([])
  const [dichVu, setDichVu] = useState([])

  const [messageApi, com] = message.useMessage();

  const [hopDongDetail, setHopDongDetail] = useState({
    ngayDangKy: '',
    ngayHetHan: '',
    userId: 0,
    CanHoId: 0,
    dichVuId: 0,
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
      }
      const exists = hopDongQuery.data.some(hopdong =>
        hopdong.ngayDangKy === hopDongDetail.ngayDangKy &&
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
        <Input placeholder="Ngày đăng ký"
          value={hopDongDetail.tenCanHo}
          onChange={(e)=> setHopDongDetail({...hopDongDetail, ngayDangKy: e.target.value})} />
      </Form.Item>
      <Form.Item 
        label="Ngày hết hạn"
        style={{padding:5, width:'100%'}} 
      >
        <Input placeholder="Ngày hết hạn"
          value={hopDongDetail.tenCanHo}
          onChange={(e)=> setHopDongDetail({...hopDongDetail, ngayHetHan: e.target.value})} />
      </Form.Item>
      <Col span={12}>
      <Form.Item
          label="Tòa nhà"
        >
          <Select
          //defaultValue="lucy"
          style={{ padding:5}}
          value={canHoDetail.toaNhaId}
          onChange={(value) => setCanHoDetail({...canHoDetail, toaNhaId: value})}
          options={toaNha.map((option)=>({
            value: option.id,
            label: option.name,
          })
          ) } 
        />
      </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          label="Loại căn hộ"
        >
          <Select
          //defaultValue="lucy"
          style={{ width: '100%',padding:5}}
          onChange={(value) => setCanHoDetail({...canHoDetail, loaiCanHoId: value})}
          value={canHoDetail.loaiCanHoId}
          options={loaiCanHo.map((option)=>({
            value: option.id,
            label: option.name,
          })) } 
        />
      </Form.Item>
    </Col>
    <Form.Item
        label="Ghi chú"
        style={{width:'100%'}}
      >
        <TextArea showCount maxLength={100} value={canHoDetail.ghiChu} onChange={(e)=> setCanHoDetail({...canHoDetail, ghiChu: e.target.value})} />
      </Form.Item>
    </Row>
      <Form.Item>
        
        <Button type="primary" onClick={addHouse}>Gửi</Button>
      </Form.Item>
    </Form>
    </div>
    
  );
};
export default AddHopDong;