import { Provider } from "react-redux";
import Survey from "./components/pages/Survey";
import store from "./components/store";
import ErrorBoundary from "./components/pages/ErrorBoundary";

function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary >
        <Survey />
      </ErrorBoundary>
    </Provider>
    // <Carousel />
  );
}
export default App;
