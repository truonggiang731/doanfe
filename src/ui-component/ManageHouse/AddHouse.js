import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, Col, Row, message  } from 'antd';
import { apiCall } from 'apis';
import useCanHoQuery from 'hooks/useCanHoQuery';
import useAddCanHoQuery from 'hooks/UseAddCanHoQuery';
import { useMutation } from 'react-query';
import useLoaiCanHoQuery from 'hooks/useLoaiCanHoQuery';
import useToaNhaQuery from 'hooks/useToaNhaQuery';
const { TextArea } = Input;

const AddHouse = () => {
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState('optional');
  const [typeHouse, setTypeHouse] = useState('');
  const [name,setName]=useState('')
  const [note, setNote] = useState('');
  const [typeBuild, setTypeBuilding] = useState('')
  const [canHo, setCanHo] = useState([])
  const [loaiCanHo, setLoaiCanHo] = useState([])
  const [toaNha, setToaNha] = useState([])
  const [isOk, setisOk] = useState(false)

  const [messageApi, com] = message.useMessage();

  const [canHoDetail, setCanHoDetail] = useState({
    tenCanHo: null,
    toaNhaId: 0,
    loaiCanHoId: 0,
    ghiChu: ''

  
  })

  //const addCanHoQuery = useAddCanHoQuery();
  const loaiCanHoQuery = useLoaiCanHoQuery();
  const canHoQuery = useCanHoQuery();
  const toaNhaQuery = useToaNhaQuery();

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


  const add = useMutation({
    mutationFn: () => apiCall('add_canho', canHoDetail),
    onSettled: () => canHoQuery.refetch()
  })

  // const addCanHo = async()=>{
  //   try {
  //     const res = await apiCall('add_canho', canHoDetail);
  //     //console.log(res);
  //   }catch(err){
  //     //console.log(err)
  //   }
  // }
//   const getCanHo = async()=>{
//     try {
//       const res = await apiCall('get_all_canho');
//       setCanHo(res);
//       //console.log(res);
//     }catch(err){
//       console.log(err)
//     }
//   }
//  console.log(canHo);
//  useEffect(()=>{
//   getCanHo();
// },[])





// //[API]
  

  

  const addHouse = async () => {
    
    try{
      console.log(canHoDetail)
      if (!canHoDetail.tenCanHo || !canHoDetail.loaiCanHoId || !canHoDetail.toaNhaId) {
        messageApi.open({
          type: 'warning',
          content: 'Vui lòng nhập đầy đủ thông tin!',
          duration: 10,
        });
      }else{
      const exists = canHo.some(canho =>
        canho.tenCanHo === canHoDetail.tenCanHo &&
        canho.toaNhaId === canHoDetail.toaNhaId
      );
      if (!exists) {
        messageApi.open({
          type: 'success',
          content: 'cập nhật thành công!',
          duration: 10,
        });
        await add.mutateAsync();
        console.log(canHoDetail)
      } else {
        messageApi.open({
          type: 'error',
          content: 'Căn hộ đã tồn tại trong cơ sở dữ liệu!',
          duration: 10,
        });
      }
      

        
      }
    } catch(err){
      console.log(err)
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
        label="Tên căn hộ"
        style={{padding:5, width:'100%'}} 
      >
        <Input placeholder="Tên căn hộ"
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
      <Form.Item>
        
        <Button type="primary" onClick={addHouse}>Gửi</Button>
      </Form.Item>
    </Form>
    </div>
    
  );
};
export default AddHouse;