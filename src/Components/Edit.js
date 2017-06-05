import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import Wizard from '../Components/Wizard'
import Preview from '../Components/Preview'
import { goBack, goNext, updateDocument, patchDocument } from '../Redux/Reducer/Actions'
import Store from '../Redux/App.store.js'
import Validate from '../Components/Validate'

class Edit extends Component {
  constructor(){
    super()
    this.state = {
      data : Store.getState(),
      preview : false,
      valid : {
        status : true
      }
    }
  }
  componentDidMount(){
    this.unsubscribe = Store.subscribe(()=>{
      this.setState({
        data : Store.getState()
      })
    })
  }
  componentWillUnmount(){
    this.unsubscribe()
  }
  togglePreview(){
    this.setState({
      preview : !this.state.preview
    })
  }
  save(){
    Store.dispatch(patchDocument())
  }
  update(id, widget, content){
    let state = Object.assign({}, this.state),
        validStatus = Validate.isValid({
          type : widget.type,
          value : content,
          condition : widget.condition,
          touched : true
        })

      state.data.Document.data[id].value = content
      this.setState({ 
        data : state.data,
        valid : validStatus
      })
  }
  goBack(widgetId, content){
    Store.dispatch(updateDocument(widgetId, content))
    Store.dispatch(goBack())
    this.save()
  }
  goNext(widgetId, content){
    Store.dispatch(updateDocument(widgetId, content))
    Store.dispatch(goNext())
    this.save()
  }
  render() {
    const preview = this.state.data.Document.meta 
    ? !this.state.preview 
    ? ( 
        <div className="row">
           <div className="col-xs-12 col-sm-12 col-md-6 col-lg-7 bg-grey height-100">
             <Wizard 
             valid={this.state.valid}
             document={this.state.data.Document} 
             back={this.goBack.bind(this)}
             next={this.goNext.bind(this)}
             update={this.update.bind(this)}
             />
           </div>
           <div className="col-xs-12 col-sm-12 col-md-6 col-lg-5 bg-light-grey height-100">
             <Preview 
              preview={this.state.preview}
              data={this.state.data.Document} 
              onClick={this.togglePreview.bind(this)}/>
           </div>
         </div>
       )
    : (
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 bg-light-grey height-100">
            <Preview 
              preview={this.state.preview}
              data={this.state.data.Document}
              onClick={this.togglePreview.bind(this)}/>
          </div>
        </div>
      )
    :  <Redirect push to={{pathname: '/'}}/>;

    return (
      <div className="container-fluid">
        { preview }
      </div>
    );
  }
}

export default Edit;