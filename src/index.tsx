import React, { Component, ReactElement } from "react";
import ReactDOM from "react-dom/client";
import toast, { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";
import App from "./App.js";
import "./index.css";

class ErrorBoundary extends Component<{ children: ReactElement }> {
  componentDidCatch(error: any, errorInfo: any) {
    console.error(error, errorInfo);
    toast.error(error);
  }
  render() {
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot>
      <ErrorBoundary>
        <React.Suspense fallback={<div>Loading...</div>}>
          <App port={1550} />
        </React.Suspense>
      </ErrorBoundary>
      <Toaster />
    </RecoilRoot>
  </React.StrictMode>
);
