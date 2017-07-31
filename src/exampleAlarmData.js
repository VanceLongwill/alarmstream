import moment from 'moment';
export const exampleAlarms = [
      {
          "title": "Welcome to AlarmStream, this is an example alarm",
          "note": "You can add your own by hitting the + button at the bottom",
          "time": moment().unix(),
          "id": "a73c1d19-f32d-4aff-b470-cea4e792406a",
          "isActive": true,
          "dateCreated": moment().unix()
      },
      {
          "title": "Title",
          "note": "Note",
          "id": "40f768b0-100b-4a60-924e-f40abf67e35b",
          "time": moment("2017-07-28 19:40").unix(),
          "isActive": false,
          "dateCreated": moment("2017-07-08 15:30").unix()

      },
      {
          "title": "Work",
          "note": "File reports",
          "id": "cc84ce3b-f597-4b05-aa36-71a775fefcd2",
          "time": moment("2017-07-26 07:30").unix(),
          "isActive": false,
          "dateCreated": moment("2017-07-20 07:30").unix()
      },
      {
          "title": "Inventory check",
          "note": "Office, front desk, and supplies...",
          "time": moment("2017-08-08 09:30").unix(),
          "id": "a78c1d19-f32d-4aff-b470-cea4e792406a",
          "isActive": false,
          "dateCreated": moment("2017-06-08 02:30").unix()
      },
      {
          "title": "This is another example alarm",
          "note": "This is the accompanying note",
          "time": moment("2017-08-08 09:30").unix(),
          "id": "a79c1d19-f32d-4aff-b470-cea4e792406a",
          "isActive": false,
          "dateCreated": moment("2017-06-08 02:30").unix()
      },
      {
          "title": "Wake up time",
          "note": "Get out of bed!",
          "time": moment("2017-08-08 09:30").unix(),
          "id": "a74c1d19-f32d-4aff-b470-cea4e792406a",
          "isActive": false,
          "dateCreated": moment("2017-06-08 02:30").unix()
      }
  ];
