import React, { useEffect, useState } from 'react';
import { Form, Table, Switch , Button, Modal, Input, Select, Col, Row, message, DatePicker } from 'antd';
import { apiCall } from 'apis';
import useCanHoQuery from 'hooks/useCanHoQuery';
import { useMutation, useQuery } from 'react-query';
import { useMemo } from 'react';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import useHopDongQuery from 'hooks/useHopDongQuery';
import { useStepContext } from '@mui/material';
import useDichVuQuery from 'hooks/useDichVuQuery';
import useUserQuery from 'hooks/useUserQuery';

dayjs.extend(customParseFormat);
const dateFormat = 'YYYY-MM-DD';

function ListHoaDon() {
  const [hoaDon, setHoaDon] = useState([]);
  const [hopDong, setHopDong] = useState([]);
  const [dichVu, setDichVu] = useState([]);
  const [canHo, setCanHo] = useState([]);
  const [user, setUser] = useState([]);
  const [unpaidSwitch, setUnpaidSwitch] = useState(false);

  const hopDongQuery = useHopDongQuery();
  const canHoQuery = useCanHoQuery();
  const dichVuQuery = useDichVuQuery();
  const userQuery = useUserQuery();

  const hoaDonQuery = useQuery({
    queryKey: ['admin', 'hodon'],
    queryFn: () => apiCall('get_all_hoadon')
  });

  useEffect(() => {
    if (hoaDonQuery?.data) {
      setHoaDon(hoaDonQuery.data);
    }
  }, [hoaDonQuery.data])

  useEffect(() => {
    if (hopDongQuery?.data) {
      setHopDong(hopDongQuery.data);
    }
  }, [hopDongQuery.data])

  useEffect(() => {
    if (dichVuQuery?.data) {
      setDichVu(dichVuQuery.data);
    }
  }, [dichVuQuery.data])

  useEffect(() => {
    if (canHoQuery?.data) {
      setCanHo(canHoQuery.data);
    }
  }, [canHoQuery.data])

  useEffect(() => {
    if (userQuery?.data) {
      setUser(userQuery.data);
    }
  }, [userQuery.data])
   
  
//API
//TABLE
const data = useMemo(() => {
  let data = [];
  if (unpaidSwitch) {
    data = hoaDon.filter((y) => y.trangThai === 'Chưa thanh toán').map((x, i) => {
      const foundHopDong = hopDong.find(y => y.id === x.hopDongId);
      const foundDichVu = foundHopDong ? dichVu.find(z => z.id === foundHopDong.dichVuId) : null;
      const foundCanHo = foundHopDong ? canHo.find(z => z.id === foundHopDong.canHoId) : null;
      const foundUser = foundHopDong ? user.find(z => z.id === foundHopDong.userId) : null;

      return {
        ...x,
        key: i,
        tenDichVu: foundDichVu ? foundDichVu.tenDichVu : 'N/A',
        tenCanHo: foundCanHo ? foundCanHo.tenCanHo : 'N/A',
        tongTien: foundDichVu? foundDichVu.donGia : 0,
        user: foundUser? foundUser.name: 'N/A',
      };
    });
  } else {
    data = hoaDon.map((x, i) => {
      const foundHopDong = hopDong.find(y => y.id === x.hopDongId);
      const foundDichVu = foundHopDong ? dichVu.find(z => z.id === foundHopDong.dichVuId) : null;
      const foundCanHo = foundHopDong ? canHo.find(z => z.id === foundHopDong.canHoId) : null;
      const foundUser = foundHopDong ? user.find(z => z.id === foundHopDong.userId) : null;
      return {
        ...x,
        key: i,
        tenDichVu: foundDichVu ? foundDichVu.tenDichVu : 'N/A',
        tenCanHo: foundCanHo ? foundCanHo.tenCanHo : 'N/A',
        tongTien: x.tongtien,
        user: foundUser? foundUser.name: 'N/A',
      };
    });
  }

  return data;
}, [hoaDon, hopDong, dichVu, canHo, user, unpaidSwitch]);

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
  {
    title: 'Người dùng',
    dataIndex: 'user',
  },
];

const [selectedRowKeys, setSelectedRowKeys] = useState('');
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
    const selectedId = newSelectedRowKeys.length === 1 ? newSelectedRowKeys[0] : '';
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
    
  }
  //TABLE
  //MODAL
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = async () => {
   
  };

  const handleCancel = () => {
    setOpen(false);
  };

  if (canHoQuery.isLoading || dichVuQuery.isLoading || hopDongQuery.isLoading) {
    return null;
  }

  //MODAL
  return (
    <div>
    <Form>
      <Form.Item>
        <Switch onChange={() => {
          setUnpaidSwitch(!unpaidSwitch);
        }} />
      </Form.Item>
      <Form.Item>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
      </Form.Item>
    </Form>
  </div>
  )
}

export default ListHoaDon