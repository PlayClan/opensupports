import React from 'react';
import _ from 'lodash';

import i18n  from 'lib-app/i18n';
import API   from 'lib-app/api-call';
import store from 'app/store';
import SessionActions     from 'actions/session-actions';

import TicketAction       from 'app-components/ticket-action';
import Form               from 'core-components/form';
import FormField          from 'core-components/form-field';
import SubmitButton       from 'core-components/submit-button';

class TicketViewer extends React.Component {
    static propTypes = {
        ticket: React.PropTypes.object,
        editable: React.PropTypes.bool
    };

    static defaultProps = {
        editable: false,
        ticket: {
            author: {},
            department: {},
            comments: []
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            loading: false
        };
    }


    render() {
        const ticket = this.props.ticket;

        return (
            <div className="ticket-viewer">
                <div className="ticket-viewer__header row">
                    <span className="ticket-viewer__number">#{ticket.ticketNumber}</span>
                    <span className="ticket-viewer__title">{ticket.title}</span>
                </div>
                <div className="ticket-viewer__info-row-header row">
                    <div className="ticket-viewer__department col-md-4">{i18n('DEPARTMENT')}</div>
                    <div className="ticket-viewer__author col-md-4">{i18n('AUTHOR')}</div>
                    <div className="ticket-viewer__date col-md-4">{i18n('DATE')}</div>
                </div>
                <div className="ticket-viewer__info-row-values row">
                    <div className="ticket-viewer__department col-md-4">{ticket.department.name}</div>
                    <div className="ticket-viewer__author col-md-4">{ticket.author.name}</div>
                    <div className="ticket-viewer__date col-md-4">{ticket.date}</div>
                </div>
                <div className="ticket-viewer__info-row-header row">
                    <div className="ticket-viewer__department col-md-4">{i18n('PRIORITY')}</div>
                    <div className="ticket-viewer__author col-md-4">{i18n('OWNER')}</div>
                    <div className="ticket-viewer__date col-md-4">{i18n('STATUS')}</div>
                </div>
                <div className="ticket-viewer__info-row-values row">
                    <div className="ticket-viewer__department col-md-4">
                        {ticket.priority}
                    </div>
                    <div className="ticket-viewer__author col-md-4">
                        {i18n((ticket.closed) ? 'CLOSED' : 'OPEN')}
                    </div>
                    <div className="ticket-viewer__date col-md-4">{ticket.date}</div>
                </div>
                <div className="ticket-viewer__content">
                    <TicketAction type="COMMENT" author={ticket.author} content={ticket.content} date={ticket.date} file={ticket.file}/>
                </div>
                <div className="ticket-viewer__comments">
                    {ticket.actions && ticket.actions.map(this.renderAction.bind(this))}
                </div>
                <div className="ticket-viewer__response">
                    <div className="ticket-viewer__response-title row">{i18n('RESPOND')}</div>
                    <div className="ticket-viewer__response-field row">
                        <Form onSubmit={this.onSubmit.bind(this)} loading={this.state.loading}>
                            <FormField name="content" validation="TEXT_AREA" required field="textarea" />
                            <SubmitButton>{i18n('RESPOND_TICKET')}</SubmitButton>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }

    renderAction(action, index) {
        return (
            <TicketAction {...action} key={index} />
        );
    }

    onSubmit(formState) {
        this.setState({
            loading: true
        });

        API.call({
            path: '/ticket/comment',
            data: _.extend({
                ticketNumber: this.props.ticket.ticketNumber
            }, formState)
        }).then(this.onCommentSuccess.bind(this), this.onCommentFail.bind(this));
    }

    onCommentSuccess() {
        this.setState({
            loading: false
        });

        store.dispatch(SessionActions.getUserData());
    }

    onCommentFail() {
        this.setState({
            loading: false
        });
    }
}

export default TicketViewer;