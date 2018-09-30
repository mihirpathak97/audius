import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

const styles = theme => ({
  close: {
    marginLeft: '20px'
  },
});

class Notification extends React.Component {
  state = {
    open: true
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
    this.props.onClose()
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Snackbar
          style={{ maxWidth: '400px', flexGrow: 0, marginBottom: '20px', marginLeft: '20px' }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={3000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.props.message}</span>}
          action={[
            <Button className={classes.close} key="undo" color="secondary" size="small" onClick={this.handleClose}>
              Close
            </Button>
          ]}
        />
      </div>
    );
  }
}

Notification.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired
};

export default withStyles(styles)(Notification);
