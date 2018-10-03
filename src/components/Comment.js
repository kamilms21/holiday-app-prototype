import React from 'react';
import moment from 'moment';
import draftToHtml from "draftjs-to-html";
import convert from 'htmr';
import { Icon } from 'semantic-ui-react';
import { deleteComment} from '../actions/deals'
import { connect } from 'react-redux';

class CommentItem extends React.Component {
  render() {
    const renderDesc = this.props.comment && convert(draftToHtml(JSON.parse(this.props.comment)))
    const {addedBy, date, users, user} = this.props
    return (
      <div className = "comment_container">
        <div className = 'comment_avatar'>
          <img src={users.filter((user) => user.username === addedBy).map((user) => user.avatar)}  />
          </div>
        <div className = "comment">
        <div className = "comment_header">
            <span className = "comment_author"><strong>{addedBy}</strong></span>
              <span className = "comment_data">{moment(date).format("LT - ll")}</span>
        </div>
            <div className = "comment_text">{renderDesc}</div>
        </div>
        {user === addedBy && <Icon name='delete' style = {{marginTop: '26px', marginLeft: '7px'}} size='large' onClick = {() => {this.props.deleteComment(this.props.deal_id, this.props.id)}}/>}
        </div>
      )

  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteComment: (deal_id, id) => dispatch(deleteComment(deal_id, id))
})

export default connect(undefined, mapDispatchToProps)(CommentItem)