import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Table, message  } from 'antd';
import { apiCall } from 'apis';
import useDichVuQuery from 'hooks/useDichVuQuery';
import { useMutation } from 'react-query';
import { useMemo } from 'react';
import useCanHoQuery from 'hooks/useCanHoQuery';
import useUserHopDongQuery from 'hooks/useUserHopDongQuery';
import useUnpaidHoaDonQuery from 'hooks/useUnpaidHoaDonQuery';

import {CardElement, Elements, useElements, useStripe} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { isAxiosError } from 'axios';

import "./style.css"

const stripePromise = loadStripe('pk_test_51IFwpWCpBejooWZYsmTcqPL7wfAcx58B6lQNiE3K8XEueAbjRJCRzczedDQO3LbJ1afIh6oln6VT6SZXOZYtiL6G00Ow7S9qTG', 'vi');

function HoaDonUnpaid() {
  const [dichVu, setDichVu] = useState([])
  const [hopDong, setHopDong] = useState([])
  const [canHo, setCanHo] = useState([])
  const [hoaDon, setHoaDon] = useState([])


  const [hoaDonId, setHoaDonId] = useState(0);

  const [messageApi, com] = message.useMessage();

  const [hopDongDetail, setHopDongDetail] = useState({
    id: 0
  });

  const dichVuQuery = useDichVuQuery();
  const canHoQuery = useCanHoQuery();
  const userHopDongQuery = useUserHopDongQuery();
  const unpaidHoaDonQuery = useUnpaidHoaDonQuery();


  useEffect(() => {
    if (unpaidHoaDonQuery.data) {
      setHoaDon(unpaidHoaDonQuery.data);
    }
  }, [unpaidHoaDonQuery.data])

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
  }, [dichVu, canHo, hopDong, hoaDon])
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
    setHoaDonId(data[selectedId].id);
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
  

 
  
  const ThanhToan = async()=>{

  }

  //MODAL
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    // console.log(hoaDonDetail);
    setLoading(true);
    setLoading(false);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  if (dichVuQuery.isLoading || canHoQuery.isLoading || userHopDongQuery.isLoading ) {
    return null;
  }

  async function cardPayment(token) {
    apiCall('payment', {invoiceId: hoaDonId, token: token})
      .then(() => {
        messageApi.open({
          type: 'success',
          content: "Thanh toán thành công!",
          duration: 10,
        });

        unpaidHoaDonQuery.refetch();

        setOpen(false);
      })
      .catch((error) => {
        if (isAxiosError(error) && error.response) {
          messageApi.open({
            type: 'error',
            content: "Kiểm tra lại kết nối!",
            duration: 10,
          });
        } else {
          messageApi.open({
            type: 'error',
            content: "Thanh toán không thành công!",
            duration: 10,
          });
        }
      })
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
        <Button type="primary" onClick={showModal}>Thanh toán</Button>
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
          </Button>
        ]}
      >
         <Elements stripe={stripePromise || null}>
            <CheckoutForm onSubmitted={cardPayment} />
          </Elements>
      </Modal>  
      </Form.Item>
      </Form>
    </div>
  )
}

const CheckoutForm = ({onSubmitted}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();

    console.log(elements);

    if (elements == null) {
      return;
    }

  

    const stripResponse = await stripe.createToken(elements.getElement(CardElement))

    console.log(stripResponse);

    await onSubmitted(stripResponse.token?.id || '');
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
          <CardElement options={{
            hidePostalCode: true,
            style: {
              base: {
                fontSize: '1.0em',
       
                '::placeholder': {
         
                },
           
                padding: '8px 12px',
              },
              invalid: {
      
              }
            },
          }}
          />
          <button type='submit'>submit</button>
    </form>
  );
};

export default HoaDonUnpaid;
