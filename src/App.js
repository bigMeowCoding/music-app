import React from 'react';
import './common/styles/index.scss';
import {MHeader} from "./components/m-header/m-header";
import {Tab} from "./components/tab/tab";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import {Recommend} from "./components/recommend/recommend";
import SingerList from "./components/singer-list/singer-list";
import {Rank} from "./components/rank/rank";
import {Search} from "./components/search/search";
import SingerDetail from "./components/singer-detail/singer-detail";

function App() {
    return (
        <>
            <MHeader/>
            <Router>
                <Tab/>
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/recommend"/>
                    </Route>
                    <Route path="/recommend">
                        <Recommend/>
                    </Route>
                    <Route path="/singerList">
                        <Switch>
                            <Route exact path="/singerList">
                                <SingerList/>
                            </Route>
                            <Route path="/singerList/:id">
                                <SingerDetail/>
                            </Route>
                        </Switch>
                    </Route>
                    <Route path="/rank">
                        <Rank/>
                    </Route>
                    <Route path="/search">
                        <Search/>
                    </Route>
                </Switch>
            </Router>
        </>

    );
}

export default App;
