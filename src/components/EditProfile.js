import React from 'react';
import {startAddAvatar} from '../actions/users';
import { connect } from "react-redux";
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import {
    Image,
    Segment,
    Header,
    Divider,
    Grid,
    Button,
    Card,
    Icon
  } from 'semantic-ui-react';


class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            city: '',
            files: [],
            image: {},
            cropResult: null,
            fileName: ''
        }
    }
    uploadImage = async () => {
        try {
          await  this.props.startAddAvatar(
        this.state.image,
        this.state.fileName
          );
        await this.cancelCrop();
          console.log('Success');
        } catch (error) {
          console.log('Oops', error);
        }
      };
    
    
    cropImage = () => {
        if (typeof this.refs.cropper.getCroppedCanvas() === 'undefined') {
          return;
        }
    
        this.refs.cropper.getCroppedCanvas().toBlob(blob => {
          let imageUrl = URL.createObjectURL(blob);
          this.setState({
            cropResult: imageUrl,
            image: blob
          });
        }, 'image/jpeg');
      };
    
      onDrop = files => {
        this.setState({
          files,
          fileName: files[0].name
        });
      };


    render() {
        return (
            <Segment>
                  <Grid centered>
          <Grid.Row />
          <Grid.Column width={4}>
            <Header color="black" sub content="1 - Add Photo"  style = {{justifyContent: 'center'}} />
            <Dropzone onDrop={this.onDrop} multiple={false} style = {{width: '100%'}}>
              <div style={{ paddingTop: '30px', textAlign: 'center' }}>
                <Icon name="upload" size="huge" />
                <Header content="Drop image here or click to upload" />
              </div>
            </Dropzone>
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Header sub color="black" content="2 - Resize" style = {{justifyContent: 'center', color: 'black'}}/>
            {this.state.files[0] && (
              <Cropper
                style={{ height: 200, width: '100%' }}
                ref="cropper"
                src={this.state.files[0].preview}
                aspectRatio={1}
                viewMode={0}
                dragMode="move"
                guides={false}
                scalable={true}
                cropBoxMovable={true}
                cropBoxResizable={true}
                crop={this.cropImage}
              />
            )}
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Header sub color="black" content="3 - Preview" style = {{justifyContent: 'center'}}/>
            {this.state.files[0] && (
              <div>
                <Image
                  style={{ minHeight: '200px', minWidth: '200px' }}
                  src={this.state.cropResult}
                />
                <Button.Group>
                  <Button
                    // loading={loading}
                    onClick={this.uploadImage}
                    style={{ width: '100px' }}
                    positive
                    icon="check"
                  />
                  <Button
                    onClick={this.cancelCrop}
                    style={{ width: '100px' }}
                    icon="close"
                  />
                </Button.Group>
              </div>
            )}
          </Grid.Column>
        </Grid>
</Segment>

        )
    }

}

  
  const mapDispatchToProps = (dispatch) => ({
    startAddAvatar: (avatar, avatarName) => dispatch(startAddAvatar(avatar, avatarName))
  });
  
  export default connect(null, mapDispatchToProps)(EditProfile);
