import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash.uniqueid';

import customPropTypes from './shared/propTypes';

class BooleanCheckboxInput extends Component {
  static isFormInput = true;

  static propTypes = {
    ...customPropTypes.inputs,
    className: PropTypes.string,
    label: PropTypes.node.isRequired,
    value: PropTypes.bool,
    style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  };

  static defaultProps = {
    className: undefined,
    isReadOnly: false,
    name: undefined,
    onChange() {},
    onChanging() {},
    style: {},
    value: undefined,
  };

  constructor(props) {
    super(props);

    this.state = {
      id: uniqueId('BooleanCheckboxInput_'),
      value: props.value || false,
    };
  }

  componentWillMount() {
    this.handleChange(this.props.value || false);
  }

  componentWillReceiveProps(nextProps) {
    const { value } = this.props;
    const { value: nextValue } = nextProps;

    // Whenever a changed value prop comes in, we reset state to that, thus becoming clean.
    if (value !== nextValue) {
      this.setState({ value: nextValue || false });
      this.handleChange(nextValue || false);
    }
  }

  onChange = (event) => {
    this.setValue(event.target.checked);
  };

  getValue() {
    return this.state.value;
  }

  setValue(value) {
    this.setState({ value });
    this.handleChange(value);
  }

  resetValue() {
    this.setValue(this.props.value || false);
  }

  handleChange(checked) {
    if (this.lastValue === checked) return;
    this.lastValue = checked;
    const { onChanging, onChange } = this.props;
    onChanging(checked);
    onChange(checked);
  }

  // Input is dirty if value prop doesn't match value state. Whenever a changed
  // value prop comes in, we reset state to that, thus becoming clean.
  isDirty() {
    return this.state.value !== this.props.value;
  }

  render() {
    const { className, isReadOnly, label, style } = this.props;
    const { id, value } = this.state;

    return (
      <div className={className} style={style}>
        <label htmlFor={id}>
          <input
            checked={value === true}
            id={id}
            onChange={this.onChange}
            readOnly={isReadOnly}
            type="checkbox"
            value="true"
          />
          {label}
        </label>
      </div>
    );
  }
}

export default BooleanCheckboxInput;
