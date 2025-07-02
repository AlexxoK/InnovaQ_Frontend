import { useRoutes } from "react-router-dom";

export const App = () => {
  let element = useRoutes(routes)

  return (
    <>
      {element}
    </>
  )
}

export default App;