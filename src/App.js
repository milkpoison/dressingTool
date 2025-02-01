import React, { useState } from 'react';
import ClothesDisplay from './components/ClothesDisplay';
import Wardrobe from './components/Wardrobe';
import { clothesData } from './data';
import './App.css';
import OutfitGenerator from './components/OutfitGenerator';
import Footer from './components/Footer';
import { Layout, Menu } from 'antd';
import { AppstoreOutlined, InboxOutlined, SkinOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const menuItems = [
  {
    key: 'clothes',
    icon: <AppstoreOutlined />,
    label: '所有衣物'
  },
  {
    key: 'wardrobe',
    icon: <InboxOutlined />,
    label: '我的衣柜'
  },
  {
    key: 'outfit',
    icon: <SkinOutlined />,
    label: '搭配生成'
  }
];

const App = () => {
  const [selectedClothes, setSelectedClothes] = useState([]);
  const [generateTrigger, setGenerateTrigger] = useState(false);
  const [activeTab, setActiveTab] = useState('clothes');

  const handleClothesSelect = (clothes) => {
    const isDuplicate = selectedClothes.some((item) => item.id === clothes.id);
    if (isDuplicate) {
      alert('这件衣服已经在衣柜中了！');
      return;
    }
    setSelectedClothes([...selectedClothes, clothes]);
  };

  const handleClothesRemove = (clothes) => {
    setSelectedClothes(selectedClothes.filter((item) => item.id!== clothes.id));
  };

  const handleGenerateOutfit = () => {
    setGenerateTrigger(prev => !prev); // 切换状态来触发重新生成搭配
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="header">
        <h1 style={{ color: '#fff' }}>衣柜管理工具</h1>
      </Header>
      <Layout>
        <Sider width={200} theme="light">
          <Menu
            mode="inline"
            selectedKeys={[activeTab]}
            items={menuItems}
            onClick={({ key }) => setActiveTab(key)}
            style={{ height: '100%' }}
          />
        </Sider>
        <Layout>
          <Content style={{ padding: '24px', minHeight: 280 }}>
            {activeTab === 'clothes' && (
              <ClothesDisplay clothes={clothesData} onSelect={handleClothesSelect} />
            )}
            {activeTab === 'wardrobe' && (
              <Wardrobe items={selectedClothes} onRemove={handleClothesRemove} />
            )}
            {activeTab === 'outfit' && (
              <OutfitGenerator 
                clothes={selectedClothes} 
                generateTrigger={generateTrigger}
                onGenerate={handleGenerateOutfit} 
              />
            )}
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;