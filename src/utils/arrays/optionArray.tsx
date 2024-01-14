import { ReactComponent as Mark } from 'assets/icons/general/mark.svg';
import { ReactComponent as User } from 'assets/icons/general/image-user.svg';
import { ReactComponent as Star } from 'assets/icons/general/stars.svg';

export const optionArray = [
  {
    navigate: '/home/news',
    name: 'Mới nhất và gần đây',
    description: 'Tìm bản cập nhật mới nhất',
    icon: Mark,
  },
  {
    navigate: '/home/popular',
    name: 'Phổ biến trong ngày',
    description: 'Được giới thiệu bởi quản trị viên',
    icon: User,
  },
];
