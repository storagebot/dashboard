import * as React from 'react'
import ReactWinJS = require ('react-winjs') 
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { closePane, changeLocation } from './DuckController'
import PeoplePage from './PeoplePage'

function mapStateToProps(state, props) {
  return {
    splitViewId: state.ContactBook.splitViewId,
    paneOpened: state.ContactBook.paneOpened,
    location: state.ContactBook.location,
    splitViewConfigs: state.ContactBook.splitViewConfigs,
    mode: state.ContactBook.mode,
    people: state.ContactBook.people
  }
}

function mapDispatchToProps(dispatch) {
  const actions = {
    closePane: bindActionCreators(closePane, dispatch),
    changeLocation: bindActionCreators(changeLocation, dispatch)
  }
  return { actions }
}

class BodyContactBook extends React.Component<any, any> {
    
    handleCommandInvoked (newLocation) {
        this.props.actions.changeLocation(newLocation)
        this.props.actions.closePane()
    }

    render () {   
        let contentComponent
         if (this.props.location[0] === 'People') {
            contentComponent = <PeoplePage location={this.props.location}  people={this.props.people} />
        } else {
            contentComponent = <h2 className="win-h2" style={{marginLeft: '10px'}}> {this.props.location} </h2>
        }

        let pane = (
            <div>
                <ReactWinJS.SplitView.Command
                    label="People"
                    icon="contact"
                    onInvoked={() => this.handleCommandInvoked(['People'])}
                />
                <ReactWinJS.SplitView.Command
                    label="What's New"
                    icon="comment"
                    onInvoked={() => this.handleCommandInvoked(['What\'s New'])}
                />
                <ReactWinJS.SplitView.Command
                    label="Groups"
                    icon="people"
                    onInvoked={() => this.handleCommandInvoked(['Groups'])}
                />

                <ReactWinJS.SplitView.Command
                    label="Settings"
                    icon="settings"
                    style={{position: 'absolute', bottom: 0, width: '100%'}}
                    onInvoked={() => this.handleCommandInvoked(['Settings'])}
                />
            </div>
        )

        return (
            <ReactWinJS.SplitView
                id={this.props.splitViewId}
                paneComponent={pane}
                style={{height: 'calc(100% - 48px)'}}
                contentComponent={contentComponent}
                paneOpened={this.props.paneOpened}
                onAfterClose={this.props.actions.closePane}
                {...this.props.splitViewConfigs[this.props.mode]} 
            />
        )
    }
}
export default connect <any, {}, {}>(
  mapStateToProps,
  mapDispatchToProps
)(BodyContactBook)