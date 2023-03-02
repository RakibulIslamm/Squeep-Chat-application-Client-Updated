import useListenAuth from "./Hooks/useListenAuth";
import Layout from "./Layout/Layout";
import PageLoader from "./utils/Loader/PageLoader";
import 'skeleton-elements/css'
import { socket } from "./utils/Socket.io/socket";

function App() {
  socket.connect()
  const authChecked = useListenAuth();

  return (
    !authChecked ? <PageLoader authChecked={authChecked} /> : <Layout />
  );
}

export default App;
