import './App.css'
import ResizableCard from './components/ResizableCard/ResiazableCard'
import { Direction } from "./components/ResizableCard/ResizableCardEnum"

function App() {
  return (
    <>
      <ResizableCard 
        // 設置面板的方向：Vertical 為垂直排列，Horizontal 為水平排列
        direction={Direction.Horizontal} 
        
        cards={[
          {
            content: <div ><h1>Card 1</h1></div>,
            defaultSize: 30,
            minSize: 20,
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }
            
          },
          {
            content: <div ><h1>Card 2</h1></div>,
            defaultSize: 30,
            minSize: 20,
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
          },
          {
            content: <div ><h1>Card 3</h1></div>,
            defaultSize: 40,
            minSize: 20,
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }
          }
        ]}
        style={{
          width:'1000px',
          height:'400px',
          border: '1px solid #ccc',
        }}
      />
    </>
  )
}

export default App
