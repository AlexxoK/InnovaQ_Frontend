import { useRoutes } from "react-router-dom";
import routes from "./routes";
import 'bootstrap/dist/css/bootstrap.min.css';

export const App = () => {
  let element = useRoutes(routes)

  return (
    <>
      {element}
    </>
  )
}

export default App;