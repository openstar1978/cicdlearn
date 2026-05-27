import {
  CalculatorOutlined,
  DashboardOutlined,
  FileTextOutlined,
  PieChartOutlined,
  SafetyCertificateOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined
} from '@ant-design/icons';

const business = {
  id: 'group-business',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'home',
      title: 'Home',
      type: 'item',
      url: '/dashboard',
      icon: DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'schools',
      title: 'Schools',
      type: 'item',
      url: '/customers',
      icon: UserOutlined,
      permission: ['Schools.View', 'School.View']
    },
    {
      id: 'leases',
      title: 'Leases',
      type: 'item',
      url: '/leases',
      icon: FileTextOutlined,
      permission: ['Leases.View', 'Lease.View']
    },
    {
      id: 'payment-points',
      title: 'Payment Points',
      type: 'item',
      url: '/payment-points',
      icon: CalculatorOutlined,
      permission: ['PaymentPoints.View', 'PaymentPoint.View']
    },
    {
      id: 'credit-controls',
      title: 'Credit Controls',
      type: 'item',
      url: '/credit-controls',
      icon: SafetyCertificateOutlined,
      permission: ['CreditPoints.View', 'CreditControls.View', 'CreditControl.View']
    },
    {
      id: 'reports',
      title: 'Reports',
      type: 'item',
      url: '/reports',
      icon: PieChartOutlined
    }
  ]
};

export const settings = {
  id: 'group-settings',
  title: 'Settings',
  type: 'group',
  children: [
    {
      id: 'users',
      title: 'Users',
      type: 'item',
      url: '/users',
      icon: TeamOutlined,
      permission: ['Users.View', 'User.View']
    },
    {
      id: 'theme-options',
      title: 'Theme Options',
      type: 'item',
      url: '/color',
      icon: SettingOutlined
    }
  ]
};

export default business;
