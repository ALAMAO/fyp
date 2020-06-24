import React, { Component } from "react";
import Dropzone from "react-dropzone";
import classes from "./Upload.module.css";
import config from "./config";
import { uploadS3 } from "../../util/s3";
import { v4 as uuidv4 } from "uuid";
import PSD from 'psd.js';

export default class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      isLoading: false,
      errMsg: [],
      s3Location: null,
      s3Key: null,
    };
  }

  render() {
    let dropZone = (
      <Dropzone
        onDropAccepted={this.onDrop}
        onDropRejected={(fileRejections) => {
          return this.onDropRejected(fileRejections);
        }}
        minSize={1048576 * config.sizeRestrictions.minSizeInMB}
        maxSize={1048576 * config.sizeRestrictions.maxSizeInMB}
        // accept={"image/*"}
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div
              {...getRootProps({ className: "dropzone" })}
              className={classes.Card}
            >
              <img
                class={classes.uploadImage}
                src={`https://image.flaticon.com/icons/svg/1837/1837526.svg`}
                width={"50px"}
                alt="uploadIcon"
              />
              {/* Creates a break for the words to be on next line */}
              <div className={classes.break}></div>
              <input {...getInputProps()} />
              <p>Drag and drop a file here</p>
              {!!this.state.s3Location && (
                <p>Previous file URL: {this.state.s3Location}</p>
              )}
              {!!this.state.s3Key && (
                <p>Previous file S3 key: {this.state.s3Key}</p>
              )}
              <div className={classes.break}></div>
              <p>{this.state.errMsg}</p>
              <div className={classes.break}></div>
              {/* eslint-disable-next-line */}
              <a className={classes.MockButton}>
                <span className={classes.away}>Or click to select a file</span>
                <span className={classes.over}>Max File Size: 5MB</span>
              </a>
              <span className={classes.Info}>
                Max image size: {config.sizeRestrictions.maxSizeInMB}MB.
                Supported image types: jpg, jpeg or png{" "}
              </span>
            </div>
          </section>
        )}
      </Dropzone>
    );

    if (this.state.isLoading) {
      dropZone = (
        <>
          <div className={classes.Loader}>Loader</div>
          <div className={classes.break}></div>
          <h1 style={{ color: "rgb(0,37,53)" }}>
            {config.uiMessages.spinnerMessage}
          </h1>
          <div className={classes.break}></div>
          <span style={{ fontSize: "5rem" }} role="img" aria-label="sheep">
            {config.uiMessages.spinnerEmoji}
          </span>
        </>
      );
    }

    return <div className={classes.Centre}>{dropZone}</div>;
  }

  onDropRejected = (fileRejections) => {
    const errorMessages = [];
    const errObject = fileRejections[0].errors;

    errObject.forEach((errorObj) => {
      let errorCode = errorObj.code;
      switch (errorCode) {
        case "file-invalid-type":
          errorMessages.push(
            <React.Fragment key={errorCode}>
              <span className={classes.Danger}>
                {config.errorMessages.invalidFileMessage}{" "}
              </span>{" "}
              <div className={classes.break}></div>
            </React.Fragment>
          );
          break;
        case "file-too-large":
          errorMessages.push(
            <React.Fragment key={errorCode}>
              <span className={classes.Danger}>
                {config.errorMessages.fileSizeExceedMessage(
                  config.sizeRestrictions.maxSizeInMB
                )}
              </span>{" "}
              <div className={classes.break}></div>
            </React.Fragment>
          );
          break;
        default:
          errorMessages.push(
            <React.Fragment key={errorCode}>
              <span className={classes.Danger}>"Unidentified Error" </span>{" "}
              <div className={classes.break}></div>
            </React.Fragment>
          );
      }
    });
    this.setState({ errMsg: errorMessages });
  };

  onDrop = async (files) => {
    try {
      this.setState({ files });
      this.setState({ isLoading: true });
      let file = files[0];

      let fileType = file.name.split(".")[1];
      let key = `files/${uuidv4()}.${fileType}`;
      let result = await uploadS3(file, key);

      this.setState({
        isLoading: false,
        s3Location: result.Location,
        s3Key: result.Key,
      });
      this.props.history.push('/preview', { s3Location: result.Location, s3Key: result.Key })
    } catch (err) {
      console.log(err);
    }
  };
}
