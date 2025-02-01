import React from 'react';
import { GithubOutlined } from '@ant-design/icons';
import { Layout } from 'antd';

const { Footer: AntFooter } = Layout;

const Footer = () => {
  return (
    <AntFooter style={{ textAlign: 'center', background: '#f0f2f5' }}>
      <a 
        href="https://github.com/milkpoison" 
        target="_blank" 
        rel="noopener noreferrer"
        style={{ color: 'rgba(0, 0, 0, 0.45)' }}
      >
        <GithubOutlined style={{ marginRight: 8 }} />
        @milkpoison
      </a>
    </AntFooter>
  );
};

export default Footer;