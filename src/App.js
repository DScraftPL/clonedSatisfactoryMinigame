import './App.css';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragAndDropComponent from './DragAndDropComponent'

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <DragAndDropComponent />
    </DndProvider>
  );
}

export default App;
