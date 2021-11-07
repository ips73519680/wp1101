import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './pages/page1/container'

ReactDOM.render(
  <React.StrictMode>
    <Home />
    <div>說明：
      參考iphone介面設計
    </div>
    <div>
      完成基本要求的加減乘除、浮點數、Divided by 0會跳err
    </div>
    <div>可用的按鈕只有AC、加減乘除、=、0-9，其餘會讓數字跑掉
    </div>
    <div> 使用時請注意：只可以有【兩個數字】的運算(位數不限 ex：123*456 OK！)
    </div>
    <div> 按完＝後，請按ＡＣ才可重新計算。</div>
    <div> </div>
    <div>期中順利！</div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
