import './App.css'
import ResizableCard from './components/ResizableCard/ResiazableCard'
import { Direction } from "./components/ResizableCard/ResizableCardEnum"

function App() {
  return (
    <>
    {/* 水平範例 */}
      <ResizableCard 
        direction={Direction.Horizontal} 
        
        cards={[
          {
            children: <div ><h1>Card 1</h1></div>,
            defaultSize: 30,
            minSize: 20,
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }
            
          },
          {
            children: <div ><h1>Card 2</h1></div>,
            defaultSize: 30,
            minSize: 20,
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
            handle:{
              style: {
                border: '1px solid #ccc',
              }
            }
          },
          {
            children: <div ><h1>Card 3</h1></div>,
            defaultSize: 40,
            minSize: 20,
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
            handle:{
              style: {
                border: '1px solid #ccc',
              }
            }
          }
        ]}
        style={{
          width:'1000px',
          height:'100px',
          border: '1px solid #ccc',
        }}
      />
      {/* 垂直範例 */}
      <ResizableCard 
        direction={Direction.Vertical} 
        cards={[
          {
            children: <div ><h1>Card 1</h1></div>,
            defaultSize: 30,
            minSize: 20,
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }
          },
          {
            children: <div ><h1>Card 2</h1></div>,
            defaultSize: 30,
            minSize: 20,
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
            handle:{
              style: {
                border: '1px solid #ccc',
              }
            }
          },
          {
            children: <div ><h1>Card 3</h1></div>,
            defaultSize: 40,            
            minSize: 20,
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
            handle:{
              style: {
                border: '1px solid #ccc',
              }
            }
          }
        ]}
        style={{
          width:'500px',
          height:'700px',
          border: '1px solid #ccc',
        }}
      />
    </>
  )
}

export default App
