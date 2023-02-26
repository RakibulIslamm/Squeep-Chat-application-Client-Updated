import useListenAuth from "./Hooks/useListenAuth";
import Layout from "./Layout/Layout";
import PageLoader from "./utils/Loader/PageLoader";
import 'skeleton-elements/css'


function App() {
  const authChecked = useListenAuth();

  return (
    !authChecked ? <PageLoader authChecked={authChecked} /> : <Layout />
  );
}

export default App;
