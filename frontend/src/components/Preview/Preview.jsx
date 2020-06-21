import React from 'react'
import axios, { BASE_URL } from '../../Api'
import './Preview.css'
import PSD from 'psd.js'

class Preview extends React.Component {
  componentDidMount() {
    PSD.fromURL("http://puu.sh/FYLKS/f512c3431d.psd").then(function(psd) {
      document.getElementById('preview').appendChild(psd.image.toPng());
    });
  }

  render() {
    return (
      <div id="preview"></div>
    )
  }
}

export default Preview
