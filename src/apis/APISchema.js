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
  get_all_hopdong: {
    method: 'GET',
    endpoint: '/hopdong'
  },
  get_loaicanho: {
    method: 'GET',
    endpoint: '/loaicanho'
  },
  get_toanha: {
    method: 'GET',
    endpoint: '/toanha'
  },
  unpaid_hoadon: {
    method: 'GET',
    endpoint: '/hoadon/unpaid'
  },
  canho_hopdong:{
    method: 'GET',
    endpoint: '/canho/{id}'
  },
  user_hopdong: {
    method: 'GET',
    endpoint: '/hopdong/user'
  },
  get_user: {
    method: 'GET',
    endpoint: '/user'
  },
  get_all_dichvu: {
    method: 'GET',
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
  used_hopdong: {
    method: 'GET',
    endpoint: '/hopdong/used'
  },
  hoadon_hopdong: {
    method: 'GET',
    endpoint: '/hoadon/hopdong'
  },
  add_adminhopdong: {
    method: 'POST',
    endpoint: '/hopdong/admin'
  },
  add_canho: {
    method: 'POST',
    endpoint: '/canho'
  },
  add_dichvu: {
    method: 'POST',
    endpoint: '/dichvu'
  },
  add_hoadon: {
    method: 'POST',
    endpoint: '/hoadon'
  },
  delete_hopdong:{
    method: 'DELETE',
    endpoint: '/hopdong'
  },
  delete_dichvu:{
    method: 'DELETE',
    endpoint: '/dichvu'
  },
  delete_house:{
    method: 'DELETE',
    endpoint: '/canho'
  },
  duser_hopdong: {
    method: 'DELETE',
    endpoint: '/hopdong'
  },
  update_house: {
    method: 'PUT',
    endpoint: '/canho'
  },
  update_dichvu: {
    method: 'PUT',
    endpoint: '/dichvu'
  },
  update_hopdong: {
    method: 'PUT',
    endpoint: '/hopdong'
  }
};

