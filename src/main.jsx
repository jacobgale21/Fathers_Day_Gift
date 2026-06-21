import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// #region agent log
fetch('http://127.0.0.1:7326/ingest/34458363-68e0-4c79-a188-a56dc8753eea',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'a39d4d'},body:JSON.stringify({sessionId:'a39d4d',location:'main.jsx:boot',message:'app boot',data:{scriptSrc:document.querySelector('script[type=module]')?.getAttribute('src'),hasJsxSrc:!!document.querySelector('script[src*=.jsx]')},timestamp:Date.now(),hypothesisId:'A',runId:'post-fix'})}).catch(()=>{});
// #endregion

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
