import React from 'react';
import { Card, Tag, Typography, Row, Col, Button, Empty } from 'antd';
import { generateOutfit, getOutfitStyle } from '../utils/outfitAlgorithm';
import { ReloadOutlined } from '@ant-design/icons';

const { Title } = Typography;

const OutfitGenerator = ({ clothes, generateTrigger, onGenerate }) => {
    if (!clothes || clothes.length < 2) {
        return (
            <Empty 
                description="需要至少两件衣物才能生成搭配" 
                style={{ margin: '40px 0' }}
            />
        );
    }

    const outfit = generateOutfit(clothes);
    const style = getOutfitStyle(outfit);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <Title level={2}>推荐搭配</Title>
                <Button 
                    type="primary" 
                    icon={<ReloadOutlined />} 
                    onClick={onGenerate}
                >
                    重新生成
                </Button>
            </div>
            <Tag color="blue" style={{ marginBottom: 20 }}>主要风格: {style}</Tag>
            <Row gutter={[16, 16]}>
                {outfit.map((item) => (
                    <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
                        <Card
                            hoverable
                            cover={
                                <img
                                    alt={item.name}
                                    src={item.imageUrl}
                                    style={{ height: 200, objectFit: 'cover' }}
                                />
                            }
                        >
                            <Card.Meta
                                title={item.name}
                                description={item.style.join(', ')}
                            />
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default OutfitGenerator;