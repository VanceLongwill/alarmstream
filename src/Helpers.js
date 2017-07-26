import uuid from 'react-native-uuid';
import moment from 'moment';


export function createNewAlarm (attrs) {
  return(
    {
        "title": attrs.title,
        "note": attrs.note,
        "time": attrs.time,
        "id": uuid.v4(),
        "isActive": attrs.isActive,
        "dateCreated": moment(),
    }
  );
}
