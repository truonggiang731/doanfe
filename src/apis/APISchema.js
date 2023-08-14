export const APISchema = {
  auth_login: {
    method: 'POST',
    endpoint: '/auth/login'
  },
  auth_signup: {
    method: 'POST',
    endpoint: '/auth/signup'
  },
  get_all_canho: {
    method: 'GET',
    endpoint: '/canho'
  },
  get_loaicanho: {
    method: 'GET',
    endpoint: '/loaicanho'
  },
  get_toanha: {
    method: 'GET',
    endpoint: '/toanha'
  },
  add_canho: {
    method: 'POST',
    endpoint: '/canho'
  },
  delete_house:{
    method: 'DELETE',
    endpoint: '/canho'
  },
  get_all_dichvu: {
    method: 'GET',
    endpoint: '/dichvu'
  },
  add_dichvu: {
    method: 'POST',
    endpoint: '/dichvu'
  },
  get_all_hoadon: {
    method: 'GET',
    endpoint: '/hoadon'
  },
  get_loaidichvu: {
    method: 'GET',
    endpoint: '/loaidichvu'
  },
  get_user: {
    method: 'GET',
    endpoint: '/user'
  },
  delete_dichvu:{
    method: 'DELETE',
    endpoint: '/dichvu'
  },
  update_house: {
    method: 'PUT',
    endpoint: '/canho'
  },
  update_dichvu: {
    method: 'PUT',
    endpoint: '/dichvu'
  },
  get_user: {
     method: 'GET',
     endpoint: '/user'
  },
  add_hopdong: {
    method: 'POST',
    endpoint: '/hopdong'
  },
  get_all_hopdong: {
    method: 'GET',
    endpoint: '/hopdong'
  },
  user_hopdong: {
    method: 'GET',
    endpoint: '/hopdong/user'
  },
  duser_hopdong: {
    method: 'DELETE',
    endpoint: '/hopdong'
  },
  unpaid_hoadon: {
    method: 'GET',
    endpoint: '/hoadon/unpaid'
  }
};

