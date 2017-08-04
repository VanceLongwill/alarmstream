import React from 'react';
import { Feed } from 'semantic-ui-react';
import AlarmFeedItem from './AlarmFeedItem';

function AlarmFeed(props) {
  const feedItemsList = props.alarms.map(alarm => (
    <AlarmFeedItem
      title={alarm.title}
      key={alarm.id}
      id={alarm.id}
      note={alarm.note}
      time={alarm.time}
      active={alarm.isActive}
      dateCreated={alarm.dateCreated}
      onToggleAlarm={props.onToggleAlarm}
      onDeleteAlarm={props.onDeleteAlarm}
      tone={alarm.tone}
    />
  ));

  return (
    <Feed>
      {feedItemsList}
      <br />
      <br />
      <br />
      <br />
      <br />
    </Feed>
  );
}

export default AlarmFeed;

//
//  class AlarmFeed extends Component {
//   render() {
//     const feedItemsList = props.alarms.map(alarm => (
//       <AlarmFeedItem
//         title={alarm.title}
//         key={alarm.id}
//         id={alarm.id}
//         note={alarm.note}
//         time={alarm.time}
//         active={alarm.isActive}
//         dateCreated={alarm.dateCreated}
//         onToggleAlarm={props.onToggleAlarm}
//         onDeleteAlarm={props.onDeleteAlarm}
//         tone={alarm.tone}
//       />
//     ));
//
//   }
// }
