import React from 'react';
import { Card, Button, Empty, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import './Wardrobe.css';

const { Text } = Typography;

const Wardrobe = ({ items, onRemove }) => {
  if (items.length === 0) {
    return <Empty description="衣柜是空的，快去添加一些衣物吧！" />;
  }

  return (
    <div className="wardrobe-container">
      <Text type="secondary" className="wardrobe-tip">
        提示：衣柜中不能存放重复的衣服
      </Text>
      <div className="wardrobe-grid">
        {items.map((item) => (
          <Card
            key={item.id}
            hoverable
            cover={
              <img
                alt={item.name}
                src={item.imageUrl}
                style={{ height: 200, objectFit: 'cover' }}
              />
            }
            actions={[
              <Button 
                type="text" 
                danger 
                icon={<DeleteOutlined />}
                onClick={() => onRemove(item)}
              >
                移除
              </Button>
            ]}
          >
            <Card.Meta
              title={item.name}
              description={item.style.join(', ')}
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Wardrobe;