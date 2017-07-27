class ToggleableAlarmForm extends Component {

  state = {
    modalOpen: false,
    step: 0,
  }

    handleOpen = (e) => this.setState({
      modalOpen: true,
    })
    handleClose = (e) => this.setState({
      modalOpen: false,
    })
    handleBack = (e) => this.setState({
      step: this.state.step - 1,
    })
    handleForward = (e) => this.setState({
       step: this.state.step + 1,
     })

     handleAlarmFormSubmit = (attrs) => {
       this.setState({
         modalOpen: false,
         step: 0,
       });
      this.props.onAlarmFormSubmit(attrs);
     }

    render() {
      const stepForm = [
        {
          step: 0,
          message:  "Choose a date: ",
          button:
            <Button color='green' onClick={this.handleForward} inverted>
                  Choose a time <Icon name='arrow right' />
            </Button>,
        },
        {
          step: 1,
          message:  "Now, add a time: ",
          button:
            <ButtonStepGroup
              onBack={this.handleBack}
              onForward={this.handleForward}
              backButtonText="Back to date"
              forwardButtonText="Name your alarm"
            />,
        },
        {
          step: 2,
          message:  "Give your alarm a name: ",
          button:
            <ButtonStepGroup
              onBack={this.handleBack}
              onForward={this.handleForward}
              backButtonText="Back to title"
              forwardButtonText="Add a note"
            />,
        },
        {
          step: 3,
          message: "Finally, add a note to your alarm: ",
          button:
            <ButtonStepGroup
              onBack={this.handleBack}
              onForward={this.handleForward}
              backButtonText="Back to note"
              forwardButtonText="Confirm"
            />,
        },
        {
          step: 4,
          message: "Confirm your alarm",
          button:
            <Button color='yellow' onClick={this.handleBack} float="left" inverted>
                 <Icon name='arrow left' /> Go back to change something
              </Button>,
        },
      ];
      const activeStep = stepForm[this.state.step];
      return (
        <Modal
          trigger={<p> old shit </p>}
          open={this.state.modalOpen}
          onClose={this.handleClose}
          basic
          size='small'
        >
          <Header>
            Create a new alarm
          </Header>
          <Modal.Content>
            <h5>{activeStep.message}</h5>
            <AlarmForm step={this.state.step} onAlarmSubmit={this.handleAlarmFormSubmit} />
          </Modal.Content>
          <Modal.Actions>
              {activeStep.button}
          </Modal.Actions>
        </Modal>
      )
    }
}

class AlarmForm extends Component {
  state = {
    "title": this.props.title || "",
    "note": this.props.note || null,
    "time": this.props.time || moment(),
    "id": this.props.id || null,
    "isActive": this.props.isActive || true,
    "dateCreated": this.props.dateCreated || null,
  }

  handleDayChange = (day) => {
    const newMoment = moment(day, "MMM DD YYYY");
    const timeFromMoment = {
      hour:  this.state.time.hour(),
      minutes: this.state.time.minutes(),
      seconds: this.state.time.seconds(),
    };
    this.setState({
      time: newMoment.set(timeFromMoment),
    });
  }
  handleTitleChange = (titleInput) => {
    this.setState({
      title: titleInput || null,
    });
  }
  handleNoteChange = (noteInput) => {
    this.setState({
      note: noteInput || null,
    });
  }
  handleTimeChange = (timeInputMoment) => {
    this.setState({
      time: timeInputMoment,
    });
  }
  // componentWillUnmount() {
  //   this.onUnmount={}
  // }
  handleAlarmSubmit = () => {
    if (this.state.id===null) {
      this.props.onAlarmSubmit(this.state);
    } else {
      // ADD UPDATE FUNCTION FOR EDITING ALARMS
    }
  }

  render() {
    const formSteps = [
      <DateInput moment={this.state.time} onUpdate={this.handleDayChange} />,
      <TimeInput moment={this.state.time} onUpdate={this.handleTimeChange}/>,
      <TitleInput onTitleSubmit={this.handleTitleChange}/>,
      <NoteInput onNoteSubmit={this.handleNoteChange} />,
      <AlarmFormSuccess
         note={this.state.note}
         time={this.state.time}
         title={this.state.title}
         onSubmit={this.handleAlarmSubmit}
      />,
    ];
    const activeFormStep = formSteps[this.props.step];
    return(
      activeFormStep
    );
  }
}
