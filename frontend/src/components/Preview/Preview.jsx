import React from 'react'
import './Preview.css'
import PSD from 'psd.js'
import { downloadS3 } from '../../util/s3'

class Preview extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      ...this.props.location.state,
      outfile: '',
      psd: '',
      availableFormats: ['150x150', '350x150', '600x200', '150x500']
    }
    this.imagePreview = React.createRef();
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

  showResult = (e, id) => {
    this.imagePreview.current.src = `https://via.placeholder.com/${this.state.availableFormats[id]}`

  }

  render() {
    return (
      <React.Fragment>
        <table id="preview-wrapper">
          <tbody>
            <tr>
              <td>
                <div id="left-sidebar">

                  <h3 style={{ alignSelf: 'center', textAlign: 'center', width: '100%' }}>Select your ad size:</h3>
                  {this.state.availableFormats.map((value, index) => {
                    return (
                      <React.Fragment>
                        <button className="ad-selection" onClick={(e) => this.showResult(e, index)}>
                          <p>{value}</p>
                          <img src={`https://via.placeholder.com/${value}`}></img>
                        </button>
                      </React.Fragment>
                    )
                  })}
                </div>
              </td>
              <td>
                <article id="right-article">
                  <h1 class="image-tag">Original image</h1>
                  <div id="preview"></div>
                  <hr style={{ width: '90%' }}></hr>
                  <h1 class="image-tag">Output Preview</h1>
                  <img id="preview-img" ref={this.imagePreview} />
                </article>
              </td>
            </tr>
          </tbody>
        </table>
      </React.Fragment>
    )
  }
}

export default Preview
