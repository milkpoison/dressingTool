import React from 'react';
import { Card, Typography } from 'antd';
import './ClothesDisplay.css';

const { Text } = Typography;

const ClothesDisplay = ({ clothes, onSelect }) => {
  return (
    <div>
      <Text type="secondary" className="clothes-instruction">
        点击衣物卡片将其添加到衣柜中
      </Text>
      <div className="clothes-grid">
        {clothes.map((item) => (
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
            onClick={() => onSelect(item)}
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

export default ClothesDisplay;