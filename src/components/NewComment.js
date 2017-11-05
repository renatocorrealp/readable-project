import React, {Component} from 'react';

class NewComment extends Component{
  executeAction(e){
    const { action } = this.props;
    const textarea = e.target.querySelector("textarea");
    const commentMsg = textarea.value;

    // prevent form to submit
    e.preventDefault();

    action(commentMsg);
    textarea.value = "";
  }

  render(){
    return(
      <div>
        <form onSubmit={(event)=> this.executeAction(event)}>
          <div>
            <textarea type="text" />
          </div>
          <div>
            <input type="submit" value="Send"/>
          </div>
        </form>
      </div>
    )
  }
}

export default NewComment;
