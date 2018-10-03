import React, { Component } from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { emojify } from "node-emoji";


class MyEditor extends Component {
  state = {
    editorState: !this.props.description ? EditorState.createEmpty() :
    EditorState.createWithContent(convertFromRaw(JSON.parse(emojify(this.props.description))))
  }
  
  componentDidUpdate = () => {
    this.props.clear === 1 && this.setState({EditorState: EditorState.createEmpty()})
  }

  onEditorStateChange =  (editorState) => {
  this.setState({
      editorState
    });
  const editorData = convertToRaw(editorState.getCurrentContent())
  const data  = JSON.stringify(editorData)
  this.props.editorData(data)
};



  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
        placeholder = {this.props.comment ? 'Add comment' : 'Add a deal description'}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
          editorState={editorState}
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            options: ['inline', 'emoji', 'list', 'colorPicker', 'textAlign', 'link', 'embedded', 'image', 'remove', 'history'],
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
          }}
        />
      </div>
    );
  }
}

export default MyEditor;
