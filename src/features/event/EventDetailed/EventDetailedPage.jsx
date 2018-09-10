import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux'
import { withFirestore } from "react-redux-firebase";
import { toastr } from "react-redux-toastr";
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedSidebar from './EventDetailedSidebar';

const mapState = (state) => {
  let event = {};

  if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
    event = state.firestore.ordered.events[0];
  }

  return {
    event
  }
}

class EventDetailedPage extends Component {

  async componentDidMount() {
    const {firestore, match, history} = this.props;
    let event = await firestore.get(`events/${match.params.id}`);
    if (!event.exists) {
      history.push("/events");
      toastr.error("Sorry", "Event not Found")
    }
  }

  render() {
    const {event} = this.props;
    return (
      <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader event={event} />
        <EventDetailedInfo event={event} />
        <EventDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar attendees={event.attendees}/>
      </Grid.Column>
    </Grid>
    )
  }
}

export default withFirestore(connect(mapState)(EventDetailedPage));
