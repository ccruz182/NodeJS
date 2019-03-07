import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";

class EspecieSelector extends Component {
  state = {
    selection: ""
  };

  options = [
    { key: 1, text: "Perro", value: "Perro" },
    { key: 2, text: "Gato", value: "Gato" },
    { key: 3, text: "Ave", value: "Ave" },
    { key: 4, text: "Roedor", value: "Roedor" },
    { key: 5, text: "Reptil", value: "Reptil" },
    { key: 6, text: "Otro", value: "Otro" }
  ];

  componentDidMount() {
    console.log("---> *", this.props.valorSel, "*");
    this.setState({selection: this.props.valorSel});
  }
  valueChanges = (e, d) => {
    this.setState({selection: d.value});
    this.props.handleChange(e, { name: "especie", value: d.value });
  };

  render() {
    return (
      <Dropdown
        placeholder="Elige la especie"
        clearable
        selection
        options={this.options}
        onChange={(e, d) => this.valueChanges(e, d)}
        value={this.state.selection}
      />
    );
  }
}

export default EspecieSelector;
