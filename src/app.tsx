import { React } from './dependencies/react.ts';
// import './style.css'
declare global {
  namespace JSX {
    interface IntrinsicElements {
      button: any;
      div: any;
      h1: any;
      p: any;
    }
  }
}
const App = () => {
  return (
    <div className="app">
      <h1>This is a React page rendered server side by Dino!</h1>
    </div>
  );
};
export default App;
