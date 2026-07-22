import "./App.css"
import Pages from "./components/pages/Pages"
import { AppProvider } from "./context/AppContext"
import Modal from "./components/common/modal/Modal"

function App() {
  return (
    <AppProvider>
      <Pages />
      <Modal />
    </AppProvider>
  )
}

export default App
