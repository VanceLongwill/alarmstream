// export class AltTimeInput extends Component {
//   state = {
//     time: this.props.moment
//   }
//   handleHourIncrement = () => {
//     this.setState({
//       time: this.state.time.add(1, 'hours')
//     });
//   }
//   handleMinIncrement = () => {
//     this.setState({
//       time: this.state.time.add(1, 'minutes')
//     });
//   }
//   handleHourDecrement = () => {
//     this.setState({
//       time: this.state.time.subtract(1, 'hours')
//     });
//   }
//   handleMinDecrement = () => {
//     this.setState({
//         time: this.state.time.subtract(1, 'minutes')
//     });
//   }
//   render() {
//     const hours = this.state.time.format("HH");
//     const mins =  this.state.time.format("mm");
//     return(
//       <div className="timeInput">
//         <br />
//         <Grid columns={2}>
//           <Grid.Row id="incrementButtons">
//             <Grid.Column>
//               <Icon name="chevron up" onClick={this.handleHourIncrement}/>
//             </Grid.Column>
//             <Grid.Column>
//               <Icon name="chevron up" onClick={this.handleMinIncrement}/>
//             </Grid.Column>
//           </Grid.Row>
//           <Grid.Row id='timeInputRow'>
//             <Grid.Column>
//               <span>{hours}</span>
//             </Grid.Column>
//             <Grid.Column>
//               <span>{mins}</span>
//             </Grid.Column>
//           </Grid.Row>
//           <Grid.Row id="decrementButtons">
//             <Grid.Column>
//               <Icon name="chevron down" onClick={this.handleHourDecrement}/>
//             </Grid.Column>
//             <Grid.Column>
//               <Icon name="chevron down" onClick={this.handleMinDecrement}/>
//             </Grid.Column>
//           </Grid.Row>
//         </Grid>
//
//       </div>
//     )
//   }
// }
