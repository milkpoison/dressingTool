// 定义服装风格类型和搭配规则
const STYLE_COMPATIBILITY = {
    '休闲': ['简约', '文艺', '运动', '街头'],
    '正式': ['商务', '精致', '优雅', '职场'],
    '运动': ['休闲', '街头', '舒适'],
    '优雅': ['正式', '甜美', '淑女', '高级'],
    '时尚': ['潮流', '酷感', '个性'],
    '文艺': ['休闲', '简约', '淑女'],
};

// 计算两件衣物的风格匹配度
const calculateStyleCompatibility = (item1, item2) => {
    let compatibility = 0;
    
    for (const style1 of item1.style) {
        for (const style2 of item2.style) {
            // 相同风格直接加分
            if (style1 === style2) {
                compatibility += 2;
                continue;
            }
            
            // 检查风格是否互相兼容
            if (STYLE_COMPATIBILITY[style1]?.includes(style2) || 
                STYLE_COMPATIBILITY[style2]?.includes(style1)) {
                compatibility += 1;
            }
        }
    }
    
    return compatibility;
};

// 生成穿搭组合
export const generateOutfit = (clothes) => {
    if (!clothes || clothes.length < 2) {
        return [];
    }

    // 随机选择一件主要单品作为搭配基础
    const mainPiece = clothes[Math.floor(Math.random() * clothes.length)];
    let outfit = [mainPiece];
    let remainingClothes = clothes.filter(item => item.id !== mainPiece.id);

    // 根据与主要单品的风格匹配度选择其他单品
    while (outfit.length < 3 && remainingClothes.length > 0) {
        let bestMatch = null;
        let bestScore = -1;

        for (const candidate of remainingClothes) {
            let totalScore = 0;
            
            // 计算候选单品与已选单品的总匹配度
            for (const selected of outfit) {
                totalScore += calculateStyleCompatibility(candidate, selected);
            }

            if (totalScore > bestScore) {
                bestScore = totalScore;
                bestMatch = candidate;
            }
        }

        if (bestMatch) {
            outfit.push(bestMatch);
            remainingClothes = remainingClothes.filter(item => item.id !== bestMatch.id);
        } else {
            break;
        }
    }

    return outfit;
};

// 获取整体搭配的主要风格
export const getOutfitStyle = (outfit) => {
    if (!outfit || outfit.length === 0) {
        return '休闲';
    }

    // 统计所有风格出现的次数
    const styleCount = {};
    outfit.forEach(item => {
        item.style.forEach(style => {
            styleCount[style] = (styleCount[style] || 0) + 1;
        });
    });

    // 找出出现次数最多的风格
    let dominantStyle = '休闲';
    let maxCount = 0;

    Object.entries(styleCount).forEach(([style, count]) => {
        if (count > maxCount) {
            maxCount = count;
            dominantStyle = style;
        }
    });

    return dominantStyle;
};
