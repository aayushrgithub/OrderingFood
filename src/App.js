import './App.css';
import Body from './components/Body';
import Header from './components/Header';
import About from './components/About';
import { Outlet, createBrowserRouter } from "react-router-dom";
import Contact from './components/Contact';
import RestaurantMenu from './components/RestaurantMenu';
import UserContext from './Utils/UserContext';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import appStore from './Utils/appStore';

function App() {

  const [UserName, setUserName] = useState();
  useEffect(() => {
    const data = {
      name: "Aayush"
    }
    setUserName(data.name);
  }, [])
  return (
    <Provider store={appStore}>
      <UserContext.Provider value={{ LoggedInUser: UserName, setUserName }}>
        <div>
          <Header />
          <Outlet />
        </div>
      </UserContext.Provider>
    </Provider>
  );
}

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />,
      }
    ],
  },
])

export default App;
