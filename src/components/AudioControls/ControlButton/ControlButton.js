import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ControlButton extends Component {

  static propTypes = {
    onClickButton: PropTypes.func.isRequired,
    imgAlt: PropTypes.string,
    imgTitle: PropTypes.string,
    type: PropTypes.string,
    imgSrc: PropTypes.string
  };

  render() {
    const { imgAlt, imgTitle, type, imgSrc, onClickButton } = this.props;
    return(
      <button className={ type } onClick={ () => onClickButton(type) }>
        <img
          src={ imgSrc }
          alt={ imgAlt }
          title={ imgTitle } />
      </button>
    )
  }
}
