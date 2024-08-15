import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import LogReg from "./components/LogReg";
import  Dashboard  from "./components/dashboard";
import { useState } from "react";
import NetworkStatusHandler from "./components/NetworkStatusHandler";
import OfflinePage from "./components/offlinePage";


const App=()=> {
  const setText= useState(0)
  return (
   <>
   
   <BrowserRouter>
   <NetworkStatusHandler />
   <Routes>
   
    <Route path="/" element={<Layout />} >
      <Route index element={<LogReg />} />
    </Route>
    <Route path='/dashboard' element={<Dashboard />} />
    <Route path="/offline" element={<OfflinePage/>} />
   </Routes>
   </BrowserRouter>
   </>
  );
}

export default App;

