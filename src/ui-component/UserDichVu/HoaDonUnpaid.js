import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Table, message  } from 'antd';
import { apiCall } from 'apis';
import useDichVuQuery from 'hooks/useDichVuQuery';
import { useMutation } from 'react-query';
import { useMemo } from 'react';
import useCanHoQuery from 'hooks/useCanHoQuery';
import useUserHopDongQuery from 'hooks/useUserHopDongQuery';
import useUnpaidHoaDonQuery from 'hooks/useUnpaidHoaDonQuery';

function HoaDonUnpaid() {
  const [dichVu, setDichVu] = useState([])
  const [hopDong, setHopDong] = useState([])
  const [canHo, setCanHo] = useState([])
  const [hoaDon, setHoaDon] = useState([])

  const [messageApi, com] = message.useMessage();

  const [hopDongDetail, setHopDongDetail] = useState({
    id: 0
  });

  const dichVuQuery = useDichVuQuery();
  const canHoQuery = useCanHoQuery();
  const userHopDongQuery = useUserHopDongQuery();
  const unpaidHoaDonQuery = useUnpaidHoaDonQuery();
  
  
  const getHoaDon = async()=>{
    try {
      const res = await apiCall('unpaid_hoadon');
      setHoaDon(res);
      //console.log(res);
    }catch(err){
      console.log(err)
    }
  }
 console.log(hoaDon);
 useEffect(()=>{
  getHoaDon();
},[])



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
//   useEffect(()=>{
//     if (unpaidHoaDonQuery.data)
//       setHoaDon(unpaidHoaDonQuery.data);
//   },[unpaidHoaDonQuery.data])

  const remove = useMutation({
    mutationFn: () => apiCall('delete_hopdong', hopDongDetail),
    onSettled: () => dichVuQuery.refetch()
  })

  const data = useMemo(() => {
    const data = hoaDon.map((x, i) => {
      const foundHopDong = hopDong.find(y => y.id === x.hopDongId);
      const foundDichVu = foundHopDong ? dichVu.find(z => z.id === foundHopDong.dichVuId) : null;
      const foundCanHo = foundHopDong ? canHo.find(z => z.id === foundHopDong.canHoId) : null;
      return {
        ...x,
        key: i,
        tenDichVu: foundDichVu ? foundDichVu.tenDichVu : 'N/A',
        tenCanHo: foundCanHo ? foundCanHo.tenCanHo : 'N/A',
        tongTien: foundDichVu? foundDichVu.donGia : 0,
      };
    });
  
    return data;
  }, [dichVu, canHo, hopDong])
  const columns = [
    {
      title: 'Ngày lập',
      dataIndex: 'ngayLap',
    },
    {
      title: 'Ngày thanh toán',
      dataIndex: 'ngayThanhToan',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'tongTien',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trangThai',
    },
    {
      title: 'Tên dịch vụ',
      dataIndex: 'tenDichVu',
    },
    {
      title: 'Tên căn hộ',
      dataIndex: 'tenCanHo',
    },
];
console.log(data)
console.log(hoaDon)
const [selectedRowKeys, setSelectedRowKeys] = useState('');
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
    const selectedId = newSelectedRowKeys.length === 1 ? newSelectedRowKeys[0] : '';
    setHopDongDetail(hopDong.find(x => x.id === data[selectedId].id) || {id: 0})
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

  if (dichVuQuery.isLoading || canHoQuery.isLoading || userHopDongQuery.isLoading ) {
    return null;
  } 
  
  const ThanhToan = async()=>{

  }

  //MODAL
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = async () => {
    setLoading(true);
    await ThanhToan();
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
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
        </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={handleSubmit}>Xóa</Button>
      </Form.Item>
      <Form.Item>
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
        </Modal>
      </Form.Item>
      </Form>
    </div>
  )
}
export default HoaDonUnpaid;
