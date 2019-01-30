import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/AddIcon';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});


type Props = {
  classes: {},
  onClick: Function,
};


function MyFab(props: Props) {
  const { classes, onClick } = props;

  return (
    <Fab variant="extended" aria-label="Delete" className={classes.fab} onClick={onClick}>
      <AddIcon className={classes.extendedIcon} />
      Extended
    </Fab>
  );
}

export default withStyles(styles)(MyFab);
