import React, { useState } from 'react';
import { Button, Form, Input, Select, Col, Row, message  } from 'antd';
const { TextArea } = Input;

const AddHouse = () => {
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState('optional');
  const [typeHouse, setTypeHouse] = useState('');
  const [name,setName]=useState('')
  const [note, setNote] = useState('');
  const [typeBuild, setTypeBuilding] = useState('')
// //[API]
//   const addHouse = useState({
//     tenCanHo: '',
//     toaNhaId:'',
//     loaiCanHoId:'',
//     ghiChu:''
//   })
//   const dispatch = useDispatch();

//   const handleLogin = async () => {
//     try {
//       const res = await apiCall('add_house', {
//         tenCanHo: addHouse.tenCanHo,
//         toaNhaId: addHouse.toaNhaId,
//         loaiCanHoId: addHouse.loaiCanHoId,
//         ghiChu: addHouse.ghiChu
//       });

//       // Giả sử phản hồi từ API chứa mã truy cập (access token) trong dữ liệu phản hồi.
//       const { accessToken } = res;

//       // Dispatch hành động để cập nhật trạng thái xác thực với mã truy cập nhận được.
//       dispatch({ type: '@auth/LOGIN', payload: { token: accessToken } });

//       if (scriptedRef.current) {
//         setStatus({ success: true });
//         setSubmitting(false);
//       }
//     } catch (err) {
//       console.error(err);
//       if (scriptedRef.current) {
//         setStatus({ success: false });
//         setErrors({ submit: 'Tên đăng nhập hoặc mật khẩu không chính xác. Vui lòng thử lại.' });
//         setSubmitting(false);
//       }
//     }
//   };
// //[API]
 
  const handleSubmit = () => {
  };

  return (
    <div>

    <Form
      form={form}
      layout="vertical"
    >
      <Row>
      <Form.Item 
        label="Tên căn hộ"
        style={{padding:5, width:'100%'}} 
      >
        <Input placeholder="Tên căn hộ" onChange={(e)=>setName(e.target.value)} />
      </Form.Item>
      <Col span={12}>
      <Form.Item
          label="Tòa nhà"
        >
          <Select
          defaultValue="lucy"
          style={{ padding:5}}
          onChange={(e) =>setTypeHouse(e.target.value)}
          options={[
            { value: 'jack', label: 'Jack' },
            { value: 'lucy', label: 'Lucy' },
            { value: 'Yiminghe', label: 'yiminghe' },
            { value: 'disabled', label: 'Disabled', disabled: true },
          ]}
        />
      </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          label="Loại căn hộ"
        >
          <Select
          defaultValue="lucy"
          style={{ width: '100%',padding:5}}
          onChange={(e)=>setTypeBuilding(e.target.value)}
          options={[
            { value: 'jack', label: 'Jack' },
            { value: 'lucy', label: 'Lucy' },
            { value: 'Yiminghe', label: 'yiminghe' },
            { value: 'disabled', label: 'Disabled', disabled: true },
          ]}
        />
      </Form.Item>
    </Col>
    <Form.Item
        label="Ghi chú"
        style={{width:'100%'}}
      >
        <TextArea showCount maxLength={100} onChange={(e)=>setNote(e.target.value)} />
      </Form.Item>
    </Row>
      <Form.Item>
        
        <Button type="primary" onClick={handleSubmit}>Gửi</Button>
      </Form.Item>
    </Form>
    </div>
    
  );
};
export default AddHouse;