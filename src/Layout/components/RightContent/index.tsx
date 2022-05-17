import React from 'react';
import { Avatar, Menu, Dropdown } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { RootState } from '@/store';
import styles from './index.module.less';
import { logout } from '@/services/user';

import type { UserInfo } from '@/services/user/model';

const RightContent: React.FC = () => {
  const userInfo = useSelector<RootState, UserInfo>(state => state.user.userInfo)
  const navigate = useNavigate()
  
  const logoutHandler = async () => {
    try {
      await logout()
      localStorage.removeItem('TOKEN')
      navigate({
        pathname: '/login'
      })
    } catch (error) {
      
    }
  }
  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: '退出登录',
        },
      ]}
      onClick={logoutHandler}
    />
  );
  
  return (
    <Dropdown overlay={menu} trigger={['hover']}>
      <div className={styles.container}>
        <Avatar
          src={userInfo.avatar}
        />
        <span
          style={{
            marginLeft: 10
          }}
        >{userInfo.realName}</span>
      </div>
    </Dropdown>
  )
}

export default RightContent