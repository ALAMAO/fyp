import React from 'react'
import './Preview.css'
import PSD from 'psd.js'
import { downloadS3 } from '../../util/s3'

class Preview extends React.Component {

  constructor(props) {
    super(props)
    this.state = {...this.props.location.state,
      outfile: '',
      psd: '',
    }
  }

  componentDidMount() {
    this.getPsd().then(psdFile => {
      let psd = new PSD(psdFile.Body)
      psd.parse()
      this.setState({
        psd: psd,
        outfile: psdFile.Body
      })
      document.getElementById('preview').append(psd.image.toPng())
    })
  }

  getPsd = async () => {
    return await downloadS3(this.state.s3Key ?? '')
  }

  render() {
    return (
      <React.Fragment>
        <div id="preview-wrapper">
          <div id="left-sidebar"></div>
          <div id="preview"></div>
        </div>
      </React.Fragment>
    )
  }
}

export default Preview
