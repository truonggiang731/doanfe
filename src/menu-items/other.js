// assets
import { IconBuildingWarehouse, IconBrandChrome, IconHelp } from '@tabler/icons';

// constant
const icons = { IconBrandChrome,IconBuildingWarehouse, IconHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'sample-docs-roadmap',
  type: 'group',
  children: [
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

  ]
};

export default other;
