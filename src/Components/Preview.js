import React, { Component } from 'react';
import Template from '../Components/Template'

class Preview extends Component {
  render() {
    return (
      <div>
        <PrintDocument 
          currentStep={this.props.data.meta.currentStep} 
          data={this.props.data.data}
          preview={this.props.preview}
          width={this.props.data.meta.width} 
          height={this.props.data.meta.height}
          ></PrintDocument>
          
        <div className="hidden-print">
          <ActionHeader 
            onClick={this.props.onClick}
            preview={this.props.preview}>
            </ActionHeader>
          <Document 
            currentStep={this.props.data.meta.currentStep} 
            data={this.props.data.data}
            preview={this.props.preview}
            width={this.props.data.meta.width} 
            height={this.props.data.meta.height}
            ></Document>
        </div>
      </div>
    );
  }
}
class ActionHeader extends Component {
  render(){
    return (
      <div className="row">
        <div className="action-header">
          <div className={
            this.props.preview
            ? 'col-xs-8 col-sm-8 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2'
            : 'col-xs-8 col-sm-8 col-md-12 col-lg-12'
          }>
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 text-left">
              <span onClick={this.props.onClick}>
                <i className="glyphicon glyphicon-fullscreen"></i> Preview
              </span>
            </div>
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 center">
              <span>Document Title</span>
            </div>
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 text-right">
              <button className="btn btn-default">Download</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
class Document extends Component {
  componentDidMount(){
    let padding = 25,
        scrollW = 10,
        offset = padding * 2 + scrollW,
        wrapper = document.querySelector('.document-wrapper'),
        width = wrapper.offsetWidth,
        elem = document.querySelector('.document'),
        factor = ((width - offset) / this.props.width).toFixed(2)

    elem.style.width = `${this.props.width}px`
    elem.style.height = `${this.props.height}px`
    elem.style.transform = `scale(${factor},${factor})`
  }

  render(){
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 overflow-y-scroll">
          <div className={
            this.props.preview
            ? 'col-xs-8 col-sm-8 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 document-wrapper'
            : 'col-xs-8 col-sm-8 col-md-12 col-lg-12 document-wrapper'
          }>
            <div className="document animation-fade-in">
              <Template
                currentStep={this.props.currentStep} 
                data={this.props.data}
              ></Template>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class PrintDocument extends Component {
  render(){
    return (
      <div className="print visible-print-block">
        <Template
          data={this.props.data}
        ></Template>
      </div>
    );
  }
}

export default Preview;