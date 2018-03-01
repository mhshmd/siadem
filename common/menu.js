import { isUrl } from '../util/utils';

const menuData = [
  // {
  //   name: 'dashboard',
  //   icon: 'dashboard',
  //   path: 'dashboard'
  // },
  {
    name: 'Modul Kepegawaian',
    icon: 'user',
    path: 'kepegawaian',
    authority: ['kepegawaian'],
    children: [{
      name: 'Data',
      path: 'data',
    },
    {
      name: 'Notifikasi',
      path: 'notifikasi',
    }],
},
{
  name: 'Modul Keuangan',
  icon: 'wallet',
  path: 'keuangan',
  authority: ['keuangan'],
  children: [{
    name: 'POK',
    path: 'pok',
  },
  {
    name: 'Surat Tugas',
    path: 'surtug',
    children: [{
      name: 'SPD',
      path: 'spd',
    },{
      name: 'Transport',
      path: 'transport',
    },]
  },
  {
    name: 'Honor',
    path: 'honor',
    children: [{
      name: 'Honor Dosen',
      path: 'hondos',
    },{
      name: 'Transport',
      path: 'hontransp',
    },]
  }],
}];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map((item) => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);