import React, { Suspense, Component } from 'react';
import 'antd/dist/antd.less';
import { Spin } from 'antd';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Loadable from 'react-loadable';

// 动态加载：使用Loadable
const LoadableComponent = Loadable({
  loader: () => import('./Topics'),
  loading:  () => {
    return <Spin size="large" className="global-spin" />;
  },
});

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/topics">Topics</Link></li>
      </ul>
      
      <hr/>
      
      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/topics" component={LoadableComponent}/>
    </div>
  </Router>
)
export default BasicExample
