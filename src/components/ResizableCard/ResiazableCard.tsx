import { PanelGroup, Panel, PanelResizeHandle, PanelResizeHandleProps, PanelProps, PanelGroupProps, PanelGroupStorage } from "react-resizable-panels";
import { Direction } from "./ResizableCardEnum";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Fragment } from "react/jsx-runtime";

/**
 * ResizableCard 的主要 Props 介面
 * 繼承自 PanelGroupProps，並添加自定義屬性
 */
interface ResizableCardGroupProps extends PanelGroupProps {
    direction: Direction;                // 面板排列方向：水平或垂直
    storage?: PanelGroupStorage;        // 用於保存/加載面板大小的存儲實現
    autoSaveId?: string;                // 自動保存面板大小時使用的唯一標識符
    cards: {
        content: React.ReactNode;        // 面板的內容
        defaultSize?: number;            // 面板的預設大小（百分比）
        minSize?: number;                // 面板的最小大小（百分比）
        style?: React.CSSProperties;     // 面板的樣式
        handleIcon?: JSX.Element;        // 自定義拖動把手圖標
        handleStyle?: React.CSSProperties; // 拖動把手的樣式
        handleClassName?: string;        // 拖動把手的類名
        className?: string;              // 面板的類名
        collapsible?: boolean;           // 是否可收起面板
    }[];
}

/**
 * 拖動把手的 Props 介面
 */
interface ResizableCardHandleProps extends PanelResizeHandleProps {
    icon?: JSX.Element;                 // 自定義圖標
    style?: React.CSSProperties;        // 自定義樣式
    className?: string;                 // 自定義類名
}

/**
 * 面板的 Props 介面
 */
interface ResiazableCardProps extends PanelProps {
    defaultSize?: number;               // 預設大小
    minSize?: number;                   // 最小大小
    className?: string;                 // 自定義類名
    collapsible?: boolean;              // 是否可收起面板
}

/**
 * 拖動把手元件
 * 用於在面板之間提供可拖動的分隔符
 */
const ResizableCardHandle = ({ icon, style, className, ...props }: ResizableCardHandleProps) => {
    return <PanelResizeHandle 
        className={className}
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
 * 單個面板元件
 * 包裝了 react-resizable-panels 的 Panel 元件
 */
const Card = ({ defaultSize, minSize, className, style, collapsible, ...props }: ResiazableCardProps) => {
    return <Panel 
        defaultSize={defaultSize} 
        minSize={minSize}
        className={className} 
        style={style}
        collapsible={collapsible}
        {...props} 
    />;
};

/**
 * ResizableCard 元件
 * 一個可調整大小的卡片容器，支援多個面板
 * 
 * @param direction {Direction} - 面板的排列方向（水平/垂直）
 * @param cards {Array<{content: React.ReactNode, defaultSize?: number, minSize?: number, handleIcon?: JSX.Element, handleStyle?: React.CSSProperties, handleClassName?: string, className?: string}>} - 面板配置數組，包含內容和大小設置
 * @param storage {PanelGroupStorage} - 可選的存儲實現，用於保存面板大小
 * @param autoSaveId {string} - 自動保存的唯一標識符
 * @param className {string} - 容器的類名
 * @param props - 其他 PanelGroup 支援的屬性
 * @return {JSX.Element}
 * 
 * @example
 * <ResizableCard
 *   direction={Direction.Horizontal}
 *   cards={[
 *     { content: <div>Panel 1</div>, defaultSize: 30 },
 *     { content: <div>Panel 2</div>, defaultSize: 70 }
 *   ]}
 * />
 */
const ResizableCard = ({ direction, cards, storage, autoSaveId, className, ...props }: ResizableCardGroupProps) => {
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
            className={className}
            {...props}
        >
            {cards.map((card, index) => (
                <Fragment key={index}>
                    {/* 在第一個面板之後的每個面板前添加拖動把手 */}
                    {index > 0 && (
                        <ResizableCardHandle 
                            key={Math.random()} 
                            icon={handleIcon(card.handleIcon)}
                            style={card.handleStyle}
                            className={card.handleClassName}
                        />
                    )}
                    {/* 渲染面板內容 */}
                    <Card 
                        key={index} 
                        defaultSize={card.defaultSize} 
                        minSize={card.minSize}
                        className={card.className}
                        style={card.style}
                        collapsible={card.collapsible}
                    >
                        {card.content}
                    </Card>
                </Fragment>
            ))}
        </PanelGroup>
    );
};

export default ResizableCard;