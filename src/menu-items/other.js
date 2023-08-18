// assets
import { IconBuildingWarehouse, IconBrandChrome, IconHelp } from '@tabler/icons';
import { store } from 'store';

// constant
const icons = { IconBrandChrome,IconBuildingWarehouse, IconHelp };
const isAdmin = store.getState().auth.isAdmin;

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'sample-docs-roadmap',
  type: 'group',
  children: isAdmin ? [
    {
      id: 'manage',
      title: 'Quản lý căn hộ',
      type: 'collapse',
      // url: '/manage',
      icon: icons.IconBuildingWarehouse,
      // breadcrumbs: false,
      target: true,
      children: [
        {
          id: 'addHouse',
          title: 'Thêm căn hộ',
          type: 'item',
          url: '/manage/add',
          target: false
        },
        {
          id: 'deletehouse',
          title: 'Danh sách căn hộ',
          type: 'item',
          url: '/manage/delete',
          target: false
        },
        
      ]
    },
    {
      id: 'manageDV',
      title: 'Quản lý dịch vụ',
      type: 'collapse',
      // url: '/manage',
      icon: icons.IconBuildingWarehouse,
      // breadcrumbs: false,
      target: true,
      children: [
        {
          id: 'addHouse',
          title: 'Thêm dịch vụ',
          type: 'item',
          url: '/manageDV/add',
          target: false
        },
        {
          id: 'deletehouse',
          title: 'Danh sách dịch vụ',
          type: 'item',
          url: '/manageDV/delete',
          target: false
        },
        
      ]
    },
    {
      id: 'manageHD',
      title: 'Quản lý hợp đồng',
      type: 'collapse',
      // url: '/manage',
      icon: icons.IconBuildingWarehouse,
      // breadcrumbs: false,
      target: true,
      children: [
        {
          id: 'addHopdong',
          title: 'Thêm hợp đồng',
          type: 'item',
          url: '/manageHD/add',
          target: false
        },
        {
          id: 'deleteHopDong',
          title: 'Danh sách hợp đồng',
          type: 'item',
          url: '/manageHD/update',
          target: false
        },
        
      ]
    },
    {
      id: 'managehd',
      title: 'Quản lý hóa đơn',
      type: 'collapse',
      // url: '/manage',
      icon: icons.IconBuildingWarehouse,
      // breadcrumbs: false,
      target: true,
      children: [
        {
          id: 'addHoaDon',
          title: 'Thêm hóa đơn',
          type: 'item',
          url: '/managehoadon/add',
          target: false
        },
        {
          id: 'listHoaDon',
          title: 'Danh sách hóa đơn',
          type: 'item',
          url: '/managehoadon',
          target: false
        },
      ]
    },
  ]
  :
  [
    {
      id: 'services',
      title: 'Dịch vụ',
      type: 'collapse',
      icon: icons.IconBuildingWarehouse,
      // breadcrumbs: false,
      target: true,
      children: [
        {
          id: 'deletehouse',
          title: 'Quản lý dịch vụ',
          type: 'item',
          url: '/services',
          target: false
        },
        {
          id: 'addService',
          title: 'Đăng ký dịch vụ',
          type: 'item',
          url: '/services/add',
          target: false
        },
        {
          id: 'unpaidService',
          title: 'Hóa đơn chưa trả',
          type: 'item',
          url: '/services/unpaid',
          target: false
        }
      ]
    }
  ]
};

export default other;
