

// Styles CSS
import './App.css';

// Shacdn components
import { Button } from "@/components/ui/button"

const App = () => {
  return (
    <div className="App flex flex-col items-center justify-center gap-2">
      <h1 className='text-3xl font-bold underline'>Hello World My Names is Shinobu!</h1>
      <Button>Click me</Button>
    </div>
  )
}

export default App;
