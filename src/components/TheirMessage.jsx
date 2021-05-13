import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Visualizator from './Visualizator'

const TheirMessage = ({ lastMessage, message }) => {
  const isFirstMessageByUser = !lastMessage || lastMessage.sender.username !== message.sender.username;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (event) => {
    setOpen(true);
    const elements = document.getElementsByClassName('MuiDialog-root');
    for (let element of elements) {
      element?.classList?.remove('pointer-event-none');
      element?.classList?.add('pointer-event-all');
    };
  };

  const handleClose = (event) => {
    setOpen(false);
    const elements = document.getElementsByClassName('MuiDialog-root');
    for (let element of elements) {
      element?.classList?.remove('pointer-event-all');
      element?.classList?.add('pointer-event-none');
    };
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


  return (
    <div className="message-row">
      {isFirstMessageByUser && (
        <div
          className="message-avatar"
          style={{ backgroundImage: message.sender && `url(${message.sender.avatar})` }}
        />
      )}
      {message.attachments && message.attachments.length > 0
        ? (
          <div>
            <button onClick={handleClickOpen}
              style={{ float: 'left', backgroundColor: '#CABCDC', marginLeft: isFirstMessageByUser ? '4px' : '48px', padding: '1rem', cursor: 'pointer' }} className="message-image"          >
              {message.attachments[0].file}
            </button>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
              <AppBar>
                <Toolbar>
                  <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                    <CloseIcon />
                  </IconButton>
                  <Typography variant="h6">
                    <a style={{ color: '#FFFFFF' }} color="inherit" onClick={() => { window.open(`intent://arvr.google.com/scene-viewer/1.0?file=${message.attachments[0].file}#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=https://developers.google.com/ar;end;`, '_blank') }}>
                      View in AR
                    </a>
                  </Typography>
                </Toolbar>
              </AppBar>
              <Visualizator message={message.attachments[0].file}></Visualizator>
            </Dialog>
          </div>
        )
        : (
          <div className="message" style={{ float: 'left', backgroundColor: '#CABCDC', marginLeft: isFirstMessageByUser ? '4px' : '48px' }}>
            {message.text}
          </div>
        )}
    </div>
  );
};

export default TheirMessage;
