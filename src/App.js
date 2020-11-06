import styled from "styled-components";
import MainSlotMachine from "./components/MainSlotMachine";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import reducers from "./reducers";
import reduxThunk from "redux-thunk";

const Main = styled.div`
  width: 100vw;
  background: #fff6f8;
  padding: 30px;
`;

const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 });

export const store = createStore(
  reducers,
  {},
  composeEnhancers(applyMiddleware(reduxThunk))
);

function App() {
  return (
    <Provider store={store} className="App">
      <Main className="App">
        <MainSlotMachine />
      </Main>
    </Provider>
  );
}

export default App;
