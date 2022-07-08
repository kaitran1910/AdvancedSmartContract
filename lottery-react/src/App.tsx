import "./App.css";
import React from "react";
// eslint-disable-next-line
import web3 from "./web3";
import lottery from "./lottery";

interface iProps {
  children?: React.ReactNode
}
interface iState {
  manager: Array<Object>;
};

class App extends React.Component<iProps, iState> {
  constructor(props: any) {
    super(props);

    this.state = {
      manager: [],
    };
  }

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();

    this.setState({ manager }, () => {
      console.log(this.state);
    });
  }

  render() {
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>This contract is managed by {JSON.stringify(this.state.manager[0])}</p>
      </div>
    );
  }
}

export default App;
