import React, { useEffect, useState } from 'react';
import { Form, Table, Button, Modal, Input, Select, Col, Row, message } from 'antd';
import { apiCall } from 'apis';
import useCanHoQuery from 'hooks/useCanHoQuery';
import useToaNhaQuery from 'hooks/useToaNhaQuery';
import useLoaiCanHoQuery from 'hooks/useLoaiCanHoQuery';
import { useMutation } from 'react-query';
import { useMemo } from 'react';

const { TextArea } = Input;

function DeleteHouse() {
  const [canHo, setCanHo] = useState([])
  const [form] = Form.useForm();
  const [loaiCanHo, setLoaiCanHo] = useState([])
  const [toaNha, setToaNha] = useState([])

  const [canHoDetail, setCanHoDetail] = useState({
    id: 0,
    tenCanHo: '',
    toaNhaId: 0,
    loaiCanHoId: 0,
    ghiChu: ''
  })

  const loaiCanHoQuery = useLoaiCanHoQuery();
  const canHoQuery = useCanHoQuery();
  const toaNhaQuery = useToaNhaQuery();

  

  const [messageApi, com] = message.useMessage();
  //API
  useEffect(()=>{
    if (loaiCanHoQuery.data)
      setLoaiCanHo(loaiCanHoQuery.data);
  },[loaiCanHoQuery.data])

  useEffect(()=>{
    if (canHoQuery.data)
      setCanHo(canHoQuery.data);
  },[canHoQuery.data])

  useEffect(()=>{
    if (toaNhaQuery.data)
      setToaNha(toaNhaQuery.data);
  },[toaNhaQuery.data])

  const update = useMutation({
    mutationFn: () => apiCall('update_house', canHoDetail),
    onSettled: () => canHoQuery.refetch()
  })

  const remove = useMutation({
    mutationFn: () => apiCall('delete_house', canHoDetail),
    onSettled: () => canHoQuery.refetch()
  })

   
const updateCanHo = async () => {
  try{
    if (!canHoDetail.tenCanHo || !canHoDetail.loaiCanHoId || !canHoDetail.toaNhaId) {
      messageApi.open({
        type: 'warning',
        content: 'Vui lòng nhập đầy đủ thông tin!',
        duration: 10,
      });
      console.log("lỗi không có dữ liệu")
    }

    const exists = canHo.some(canho =>
      canho.id !== canHoDetail.id &&
      canho.tenCanHo === canHoDetail.tenCanHo &&
      canho.toaNhaId === canHoDetail.toaNhaId
    );
  
    if (!exists) {
      await update.mutateAsync();
      console.log("ok");
    messageApi.open({
      type: 'success',
      content: 'cập nhật thành công!',
      duration: 10,
    });
    form.resetFields();
  }else {
    console.log("lỗi dữ liệu")
  }
  } catch(err){

    console.log(err);
  }
}
//API
//TABLE
const data = useMemo(() => {
  const data = canHo.map((x, i) => {return {
    ...x,
    key: i,
    loaiCanHoId: loaiCanHo.find(y => y.id === x.loaiCanHoId).name,
    toaNhaId: toaNha.find(y => y.id === x.toaNhaId).name
  }});

  return data;
}, [canHo, loaiCanHo, toaNha])

const columns = [
  {
    title: 'Tên căn hộ',
    dataIndex: 'tenCanHo',
  },
  {
    title: 'Loại căn hộ',
    dataIndex: 'loaiCanHoId',
  },
  {
    title: 'Tòa nhà',
    dataIndex: 'toaNhaId',
  },
  {
    title: 'Ghi chú',
    dataIndex: 'ghiChu',
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
    setCanHoDetail(canHo.find(x => x.id === data[selectedId].id) || {
      id: 0,
      tenCanHo: '',
      toaNhaId: 0,
      loaiCanHoId: 0,
      ghiChu: ''
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
      const res = await remove.mutateAsync();
      if(res){
        messageApi.open({
          type: 'success',
          content: 'Xóa căn hộ thành công!',
          duration: 10,
        });
      } 
      else {
        messageApi.open({
          type: 'warning',
          content: 'Không thể xóa căn hộ có hợp đồng!',
          duration: 10,
        });
      }
    }catch{
      console.log("lỗi del");
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
    console.log(canHoDetail);
    setLoading(true);
    await updateCanHo();
    setLoading(false);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  if (canHoQuery.isLoading || loaiCanHo.isLoading || toaNhaQuery.isLoading) {
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
        <Button type="primary" onClick={handleSubmit}>Gửi</Button>
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
        label="Tên căn hộ"
        style={{padding:5, width:'100%'}} 
      >
        <Input
          placeholder="Tên căn hộ"
          value={canHoDetail.tenCanHo}
          onChange={(e)=> setCanHoDetail({...canHoDetail, tenCanHo: e.target.value})} />
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
    </Form>
      </Modal>
      </Form.Item>
      </Form>
       
    </div>
  )
}

export default DeleteHouse