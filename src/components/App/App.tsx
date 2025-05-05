import { IGraph } from 'components/UIControl/lib/graphTypes';
import UiControl from 'components/UIControl/UIControl';
import { getData } from 'utils/test/fixtures';

/**
* Компонент-контейнер приложения.
* @returns {void}
*/
function App() {
  const sourceData: IGraph = getData();
  
  return (
    <div style={{ width: '1000px', height: '80vh', position: 'relative', border: '1px solid black', overflow: 'hidden' }}>
      <UiControl sourceData={sourceData} />
    </div>
  );
}

export default App;
