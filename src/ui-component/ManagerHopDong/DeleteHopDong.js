import React, { useEffect, useState } from 'react';
import { Form, Table, Button, Modal, Input, Select, Col, Row, message, DatePicker } from 'antd';
import { apiCall } from 'apis';
import useCanHoQuery from 'hooks/useCanHoQuery';
import { useMutation } from 'react-query';
import { useMemo } from 'react';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import useAddHopDongQuery from 'hooks/useAddHopDongQuery';
import useHopDongQuery from 'hooks/useHopDongQuery';
import useDichVuQuery from 'hooks/useDichVuQuery';
import useUserQuery from 'hooks/useUserQuery';
dayjs.extend(customParseFormat);
const dateFormat = 'YYYY-MM-DD';

const { TextArea } = Input;

function DeleteHopDong() {
    const [form] = Form.useForm();
    const [hopDong, setHopDong] = useState([])
    const [canHo, setCanHo] = useState([])
    const [user, setUser] = useState([])
    const [dichVu, setDichVu] = useState([])

  const [hopDongDetail, setHopDongDetail] = useState({
    ngaydangky: new Date().toISOString().slice(0,10),
    ngayhethan: new Date().toISOString().slice(0,10),
    canHoId: 0,
    dichVuId: 0,
    userId: 0,
    trangThai: ''
  })

  const hopDongQuery = useHopDongQuery();
  const canHoQuery = useCanHoQuery();
  const dichVuQuery = useDichVuQuery();
  const userQuery = useUserQuery();


  

  const [messageApi, com] = message.useMessage();
  //API
  useEffect(()=>{
    if (dichVuQuery.data)
      setDichVu(dichVuQuery.data);
  },[dichVuQuery.data])
  console.log()

  useEffect(()=>{
    if (canHoQuery.data)
      setCanHo(canHoQuery.data);
  },[canHoQuery.data])

  useEffect(()=>{
    if (userQuery.data)
      setUser(userQuery.data);
  },[userQuery.data])

  useEffect(()=>{
    if (hopDongQuery.data)
      setHopDong(hopDongQuery.data);
  },[hopDongQuery.data])
  console.log(hopDong)

  // const a = async()=>{
  //   const res = await apiCall("get_all_hopdong")
  //   setHopDong(res)
  //   form.resetFields();
  // }
  

  const update = useMutation({
    mutationFn: () => apiCall('update_hopdong', hopDongDetail),
    onSettled: () => hopDongQuery.refetch()
  })

  const remove = useMutation({
    mutationFn: () => apiCall('delete_hopdong', hopDongDetail),
    onSettled: () => hopDongQuery.refetch()
  })

   
const updateHopDong = async () => {
  try{
    if (!hopDongDetail.ngaydangky || hopDongDetail.canHoId===0 || !hopDongDetail.dichVuId===0 || !hopDongDetail.userId===0 || !hopDongDetail.ngayhethan) {
        messageApi.open({
          type: 'warning',
          content: 'Vui lòng nhập đầy đủ thông tin!',
          duration: 10,
        });
      }else{
        const exists = hopDong.some(hopdong =>
          hopdong.ngaydangky === hopDongDetail.ngaydangky &&
          hopdong.canHoId === hopDongDetail.canHoId &&
          hopdong.userId === hopDongDetail.userId&&
          hopdong.dichVuId === hopDongDetail.dichVuId&&
          hopdong.trangThai === hopDongDetail.trangThai
        );
        if (!exists) {
          await update.mutateAsync();
          hopDongQuery.refetch();
          console.log("ok");
          messageApi.open({
          type: 'success',
          content: 'cập nhật thành công!',
          duration: 10,
        });
        form.resetFields();
        } else {
          messageApi.open({
            type: 'error',
            content: 'Căn hộ đã được đăng ký dịch vụ này!',
            duration: 10,
          });
        }
      }

  } catch(err){

    console.log(err);
  }
}
//API
//TABLE
const data = useMemo(() => {
  const data = hopDong.map((x, i) => {return {
    ...x,
    key: i,
    canHoId: canHo.find(y => y.id === x.canHoId).tenCanHo,
    dichVuId: dichVu.find(y => y.id === x.dichVuId).tenDichVu,
    userId: user.find(y => y.id === x.userId).name
  }});

  return data;
}, [hopDong, canHo, dichVu, user])

const columns = [
  {
    title: 'Tên căn hộ',
    dataIndex: 'canHoId',
  },
  {
    title: 'Tên người sở hữu',
    dataIndex: 'userId',
  },
  {
    title: 'Dịch vụ đăng ký',
    dataIndex: 'dichVuId',
  },
  {
    title: 'Ngày đăng ký',
    dataIndex: 'ngaydangky',
  },
  {
    title: 'Ngày hết hạn',
    dataIndex: 'ngayhethan',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'trangThai',
  },
];

const [selectedRowKeys, setSelectedRowKeys] = useState('');
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
    const selectedId = newSelectedRowKeys.length === 1 ? newSelectedRowKeys[0] : '';
    setHopDongDetail(hopDong.find(x => x.id === data[selectedId].id) || {
      canHoId: 0,
      userId: 0,
      dichVuId: 0,
      ngaydangky: new Date().toISOString().slice(0,10),
      ngayhethan: new Date().toISOString().slice(0,10),
      trangThai: ''
    });
    console.log(selectedRowKeys);
  };
  const rowSelection = {
    type: 'radio',
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };
  const handleSubmit = async ()  => {
    try{
      await remove.mutateAsync();
        messageApi.open({
          type: 'success',
          content: 'Xóa hợp đồng thành công!',
          duration: 10,
        })

    }catch{
      console.log("lỗi del");
      messageApi.open({
        type: 'error',
        content: 'Không thể xóa hợp đồng đã có hóa đơn!',
        duration: 10,
      })
    }  
  }
  //TABLE
  //MODAL
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = async () => {
    console.log(hopDongDetail);
    setLoading(true);
    await updateHopDong();
    setLoading(false);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  if (canHoQuery.isLoading || dichVuQuery.isLoading || hopDongQuery.isLoading || userQuery.isLoading) {
    return null;
  }

  //MODAL
  return (
    <div>
      {com}
      <Form>
        <Form.Item>
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />;
        </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={handleSubmit}>Xóa</Button>
      </Form.Item>
      <Form.Item>
      <Button type="primary" onClick={showModal}>
        Sửa
      </Button>
      <Modal
        open={open}
        title="Title"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            Submit
          </Button>,
        ]}
      >
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
          value={hopDongDetail.canHoId}
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
    <Col span={12}>
        <Form.Item
          label="Trạng thái"
        >
          <Select
          //defaultValue="lucy"
          style={{ width: '100%',padding:5}}
          onChange={(value) => {
            setHopDongDetail({...hopDongDetail, trangThai: value})
            console.log(value)
          }}
          //onChange={(value) => {console.log(value)}}
          value={hopDongDetail.trangThai}
          options={[
            { value: 'Được sử dụng', label: 'Được sử dụng' },
            { value: 'Đã hết hạn', label: 'Đã hết hạn' },
            { value: 'Đã hủy', label: 'Đã hủy' },
          ]}
        />
      </Form.Item>
    </Col>
    </Row>
    </Form>
      </Modal>
      </Form.Item>
      </Form>
       
    </div>
  )
}

export default DeleteHopDong