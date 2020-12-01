import React, {Fragment} from "react";
import App from './app.js'
import './index.css'
export default function Root(props) {
  // return <section>{props.name} is mounted!</section>;
  return (
    <Fragment>
      <App />
      <div className="colorName">Hello Evan</div>
    </Fragment>
  );
}