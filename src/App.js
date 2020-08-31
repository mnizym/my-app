import React, { Suspense, Component } from 'react';
import 'antd/dist/antd.less';
import { Spin } from 'antd';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Loadable from 'react-loadable';

// 动态加载方案一：使用Loadable
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
)

// 动态加载方案二：使用lazy
const OtherComponent = React.lazy(() => import('./Topics'));
function MyComponent(props) {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent {...props}/>
      </Suspense>
    </div>
  );
}

// 动态加载方案三：手动封装一个组件，用来处理import()的加载状态组件怎么展示
// 方案1、2、3都是处理在import动态导入没有resolve的时候，手动返一个可以替代的loading组件
class MyCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Component: null,
    }
  }
  
  getComponent = () => import('./Topics');
  
  async componentWillMount() {
    
    if (this.state.Component) return
    
    const Component = await this.getComponent()
    
    if (Component) {
      this.setState({Component: Component.default ? Component.default : Component})
    }
  }
  
  render() {
    const {Component} = this.state;
    return Component ? <Component {...this.props} /> :
      <div style={{fontSize: 18, color: '#aaa', textAlign: 'center', marginTop: 40}}>
        加载中...
      </div>
  }
}


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
      <Route path="/topics" component={MyCom}/>
    </div>
  </Router>
)
export default BasicExample
