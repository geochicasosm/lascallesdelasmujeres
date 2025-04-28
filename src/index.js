import './styles.css';
import './ga';
// import 'mapbox-gl/dist/mapbox-gl.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'animate.css';

import MyApp from './services/MyApp';

window.onload = () => {
  const myApp = new MyApp();
  myApp.startApp();
};
