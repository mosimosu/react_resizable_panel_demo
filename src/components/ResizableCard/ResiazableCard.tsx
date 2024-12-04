import { PanelGroup, Panel, PanelResizeHandle, PanelResizeHandleProps, PanelProps, PanelGroupProps, PanelGroupStorage } from "react-resizable-panels";
import { Direction } from "./ResizableCardEnum";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Fragment } from "react/jsx-runtime";

/**
 * ResizableCard 的主要屬性介面
 * 繼承自 PanelGroupProps，用於配置整個可調整大小的卡片群組
 */
interface ResizableCardGroupProps extends PanelGroupProps {
    direction: Direction;                // 面板排列方向：水平或垂直
    storage?: PanelGroupStorage;        // 用於保存/加載面板大小的存儲實現
    autoSaveId?: string;                // 自動保存面板大小時使用的唯一標識符
    cards: ({
        children?: React.ReactNode;      // 面板內容
        handle?: ResizableCardHandleProps; // 拖動把手的配置
    } & PanelProps & ResizableCardHandleProps)[];  // 合併 Panel 和 Handle 的所有屬性
}

/**
 * 拖動把手的屬性介面
 * 繼承自 PanelResizeHandleProps，添加自訂的圖標屬性
 */
interface ResizableCardHandleProps extends PanelResizeHandleProps {
    icon?: JSX.Element;                 // 自訂拖動把手圖標
}

/**
 * 拖動把手元件
 * 用於在相鄰面板之間提供可拖動的分隔線
 * 
 * @param props - 拖動把手的屬性
 * @param props.icon - 自訂圖標元件
 * @param props.style - 把手的樣式
 * @param props.className - 把手的 CSS 類名
 */
const ResizableCardHandle = ({ icon, style, ...props }: ResizableCardHandleProps) => {
    return <PanelResizeHandle
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ...style
        }}
        {...props}
    >
        {icon || <MoreVertIcon />}
    </PanelResizeHandle>;
};

/**
 * Card 元件
 * 包裝了 react-resizable-panels 的 Panel 元件，提供基本的面板功能
 * 
 * @param props - Panel 的所有原生屬性
 */
const Card = ({ defaultSize, minSize, className, style, ...props }: PanelProps) => {
    return <Panel 
        defaultSize={defaultSize} 
        minSize={minSize}
        className={className} 
        style={style}
        {...props} 
    />;
};

/**
 * 可調整大小的卡片群組元件
 * 提供一個靈活的面板系統，支援：
 * - 水平或垂直方向的面板排列
 * - 可拖動調整面板大小
 * - 自訂拖動把手的外觀
 * - 面板大小的保存和恢復
 * 
 * @param props - 元件屬性
 * @param direction - 面板排列方向（水平/垂直）
 * @param cards - 面板配置陣列，每個面板可以設置內容、大小、樣式等
 * @param storage - 可選項目，用於保存面板大小，預設為 localStorage，搭配 autoSaveId 使用
 * @param autoSaveId - 自動保存時使用的唯一標識符，搭配 storage 使用
 * 
 * @example
 * <ResizableCard
 *   direction={Direction.Horizontal}
 *   cards={[
 *     {
 *       children: <div>Panel 1</div>,
 *       defaultSize: 30,
 *       handle: {
 *         icon: <CustomIcon />,
 *         style: { border: '1px solid #ccc' }
 *       }
 *     },
 *     {
 *       children: <div>Panel 2</div>,
 *       defaultSize: 70
 *     }
 *   ]}
 * />
 */
const ResizableCard = ({ direction, cards, storage, autoSaveId, ...props }: ResizableCardGroupProps) => {
    // 根據方向選擇適當的圖標
    const handleIcon = (icon: JSX.Element | undefined) => {
        if (icon) {
            return icon;
        }
        return direction === Direction.Vertical ? <MoreHorizIcon /> : <MoreVertIcon /> ;
    };

    return (
        <PanelGroup 
            direction={direction} 
            storage={storage}
            autoSaveId={autoSaveId}
            {...props}
        >
            {cards.map((card, index) => {
                const { handle, ...panelProps } = card;
                return (<Fragment key={index}>
                    {/* 在第一個面板之後的每個面板前添加拖動把手 */}
                    {index > 0 && (
                        <ResizableCardHandle 
                            key={Math.random()} 
                            icon={handleIcon(handle?.icon)}
                            style={handle?.style}
                            className={handle?.className}
                            {...handle}
                        />
                    )}
                    {/* 渲染面板內容 */}
                    <Card 
                        key={index} 
                        defaultSize={card.defaultSize} 
                        minSize={card.minSize}
                        className={card.className}
                        style={card.style}
                        {...panelProps}
                    >
                        {card.children}
                    </Card>
                </Fragment>)
            })}
        </PanelGroup>
    );
};

export default ResizableCard;