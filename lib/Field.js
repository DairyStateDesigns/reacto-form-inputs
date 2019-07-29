import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import customPropTypes from './shared/propTypes';

class Field extends Component {
  static isFormField = true;

  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    errors: customPropTypes.errors,
    label: PropTypes.node,
    labelClassName: PropTypes.string,
    labelFor: PropTypes.string,
    labelStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    isRequired: PropTypes.bool,
    style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  };

  static defaultProps = {
    className: undefined,
    errors: undefined,
    label: undefined,
    labelClassName: undefined,
    labelFor: undefined,
    labelStyle: {},
    isRequired: false,
    style: {},
  };

  getClassName() {
    const { className, errors, isRequired } = this.props;
    const errorClass = Array.isArray(errors) && errors.length > 0 ? 'has-error' : '';
    const requiredClass = isRequired ? 'required' : '';
    return `${className || ''} ${errorClass} ${requiredClass}`.trim();
  }

  renderLabel() {
    const { label, labelClassName, labelFor, labelStyle } = this.props;

    return (
      <label
        className={labelClassName}
        htmlFor={labelFor}
        style={labelStyle}
      >
        {label}
      </label>
    );
  }

  render() {
    const { children, label, style } = this.props;

    return (
      <div className={this.getClassName()} style={style}>
        {!isEmpty(label) && this.renderLabel()}
        {children}
      </div>
    );
  }
}

export default Field;
