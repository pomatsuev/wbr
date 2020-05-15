import React from 'react';
import { hot } from 'react-hot-loader/root';

export interface IProps {
  name: string;
}

const App: React.FC<IProps> = ({ name }) => {
  return (
    <div className="logo">
      <h4>Hello from {name}!</h4>
      <p className="small-text">
        Just change <span>index.js</span> into <span>src</span> folder.
      </p>
    </div>
  );
};

export default hot(App);
