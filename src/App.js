import React from 'react';
import './App.css';
import SidePanel from './components/SidePanel';
import WeatherReport from './containers/WeatherReport';
import { Provider } from 'react-redux';
import store from './store';
import '../node_modules/font-awesome/css/font-awesome.min.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

function App() {
  return (
    <Provider store={store} >
      <div className="app">
        <SidePanel />
        <WeatherReport />
      </div>
    </Provider>
  );
}

export default App;
