import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Create from './Create';
import BlogDetails from './BlogDetails';
import AddidPage from './AddidPage';
import ThankyouPage from './ThankyouPage';
import Results from './Results';
import EditQquestions from './EditQquestions';
import NotFound from './NotFound';
import { createContext, useState } from 'react';
import ReactDOM from "react-dom/client";
import { useLocation } from "react-router-dom";
export const UserContext = createContext(null);
export const QuizContext = createContext(null);

function App() {

  const [user, setUser] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const location = useLocation();
  let isNavbarHidden = location.pathname.includes("quiz");

  return (
      <UserContext.Provider value={{ user: user, setUser: setUser }}>
      <QuizContext.Provider value={{ quiz: quiz, setQuiz: setQuiz }}>

      <div className="App">
         {!isNavbarHidden && <Navbar/>}
          <div className="content">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/create">
                <Create />
              </Route>
              <Route path="/quiz/:id">
                <BlogDetails />
              </Route>
              <Route path="/start">
                <AddidPage />
              </Route>
              <Route path="/thankyou">
                <ThankyouPage />
              </Route>
              <Route path="/results">
                <Results />
              </Route>
              <Route pathe = "/editQquestions">
                < EditQquestions />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </div>
      </div>
      </QuizContext.Provider>
      </UserContext.Provider>
  );
}

export default App;
