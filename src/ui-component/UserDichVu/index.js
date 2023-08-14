import React, { useEffect, useState } from 'react';
import { Form, Table, Button, Modal, Row, Input, Col, Select, message } from 'antd';
import { apiCall } from 'apis';
import useLoaiDichVuQuery from 'hooks/useLoaiDichVuQuery';
import useDichVuQuery from 'hooks/useDichVuQuery';
import { useMutation } from 'react-query';
import { useMemo } from 'react';
import useCanHoQuery from 'hooks/useCanHoQuery';

function UserDichVu() {
  const [dichVu, setDichVu] = useState([])
  const [form] = Form.useForm();
  const [loaiDichVu, setLoaiDichVu] = useState([])
  const [hopDong, setHopDong] = useState([])

  const [dichVuDetail, setDichVuDetail] = useState({
    id: 0,
    tenDichVu: '',
    loaiDichVuId: 0,
    donGia: 0,
    trangThai: 'Chưa được sử dụng'
  })

  const dichVuQuery = useDichVuQuery();
  const canHoQuery = useCanHoQuery();

  const [messageApi, com] = message.useMessage();

  //API
  useEffect(()=>{
    if (dichVuQuery.data)
      setDichVu(dichVuQuery.data);
  },[dichVuQuery.data])

  const update = useMutation({
    mutationFn: () => apiCall('update_dichvu', dichVuDetail),
    onSettled: () => dichVuQuery.refetch()
  })

  const remove = useMutation({
    mutationFn: () => apiCall('delete_dichvu', dichVuDetail),
    onSettled: () => dichVuQuery.refetch()
  })

  const updateDichVu = async () => {
    try{
      if (!dichVuDetail.tenDichVu || !dichVuDetail.loaiDichVuId) {
        messageApi.open({
          type: 'warning',
          content: 'Vui lòng nhập đầy đủ thông tin!',
          duration: 10,
        });
        console.log("lỗi không có dữ liệu")
      }
  
      const exists = dichVu.some(dichvu =>
        dichvu.id !== dichVuDetail.id &&
        dichvu.tenDichVu === dichVuDetail.tenDichVu &&
        dichvu.loaiDichVuId === dichVuDetail.loaiDichVuId
      );
    
      if (!exists) {
        await update.mutateAsync();
        console.log("ok");
      messageApi.open({
        type: 'success',
        content: 'cập nhật thành công!',
        duration: 10,
      });
      // getCanHo();
      // updateData();
      form.resetFields();
    }else {
      // messageApi.open({
      //   type: 'error',
      //   content: 'Căn hộ đã tồn tại trong cơ sở dữ liệu!',
      //   duration: 10,
      // });
      console.log("lỗi dữ liệu")
    }
    } catch(err){
      // messageApi.open({
      //   type: 'error',
      //   content: 'cập nhật thất bại!',
      //   duration: 10,
      // });
      console.log(err);
    }
  }

  const data = useMemo(() => {
    const data = dichVu.map((x, i) => {return {
      ...x,
      key: i,
      loaiDichVuId: loaiDichVu.find(y => y.id === x.loaiDichVuId).name,
    }});
  
    return data;
  }, [dichVu, loaiDichVu])
const columns = [
  {
    title: 'Tên dịch vụ',
    dataIndex: 'tenDichVu',
  },
  {
    title: 'Loại dịch vụ',
    dataIndex: 'loaiDichVuId',
  },
  {
    title: 'Đơn Giá',
    dataIndex: 'donGia',
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
    setDichVuDetail(dichVu.find(x => x.id === data[selectedId].id) || {
      id: 0,
      tenDichVu: '',
      loaiDichVuId: 0,
      donGia: 0
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
    }catch{
      console.log("lỗi del");
    }  
  }

  //MODAL
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = async () => {
    console.log(dichVuDetail);
    setLoading(true);
    await updateDichVu();
    setLoading(false);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  if (dichVuQuery.isLoading || loaiDichVu.isLoading ) {
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
        label="Tên dịch vụ"
        style={{padding:5, width:'100%'}} 
      >
        <Input
          placeholder="Tên dịch vụ"
          value={dichVuDetail.tenDichVu}
          onChange={(e)=> setDichVuDetail({...dichVuDetail, tenDichVu: e.target.value})} />
      </Form.Item>
      <Col span={12}>
      <Form.Item
          label="Loại dịch vụ"
        >
          <Select
          //defaultValue="lucy"
          style={{ padding:5}}
          value={dichVuDetail.loaiDichVuId}
          onChange={(value) => setDichVuDetail({...dichVuDetail, loaiDichVuId: value})}
          options={loaiDichVu.map((option)=>({
            value: option.id,
            label: option.name,
          })
          ) } 
        />
      </Form.Item>
      </Col>
      <Form.Item 
        label="Đơn giá"
        style={{padding:5, width:'100%'}} 
      >
        <Input
          placeholder="Đơn giá"
          value={dichVuDetail.donGia}
          onChange={(e)=> setDichVuDetail({...dichVuDetail, donGia: e.target.value})} />
      </Form.Item>
    </Row>
    </Form>
      </Modal>
      </Form.Item>
      </Form>
       
    </div>
  )
}
export default UserDichVu;
