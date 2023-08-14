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
          title: 'Xóa căn hộ',
          type: 'item',
          url: '/manage/delete',
          target: false
        },
        {
          id: 'updatehouse',
          title: 'Sửa căn hộ',
          type: 'item',
          url: '/manage/update',
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
          title: 'Xóa dịch vụ',
          type: 'item',
          url: '/manageDV/delete',
          target: false
        },
        {
          id: 'updatehouse',
          title: 'Sửa dịch vụ',
          type: 'item',
          url: '/manageDV/update',
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
        }
      ]
    }
  ]
};

export default other;
