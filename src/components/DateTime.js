import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from 'material-ui-pickers';


type Props = {
  onChange: Function,
  date: {},
};


function DateTime(props: Props) {
  const { onChange, date } = props;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DateTimePicker
        margin="normal"
        label="Time picker"
        value={date}
        onChange={onChange}
      />
    </MuiPickersUtilsProvider>
  );
}


export default DateTime;
