import React              from 'react';
import {connect}          from 'react-redux';
import classNames         from 'classnames';

class MainLayoutFooter extends React.Component {

    render() {
        return (
            <div className={this.getClass()}>
                {this.props.adminPanelOpened ? this.renderExtraLinks() : null}
                <div className="main-layout-footer__powered">
                    <a className="main-layout-footer__os-link" href="https://playclan.hu" target="_blank">PlayClan</a>
                    <span> {this.props.adminPanelOpened ? `v${opensupports_version}` : null}</span>
                </div>
            </div>
        );
    }

    renderExtraLinks() {
        return (
            <div className="main-layout-footer__extra-links">
                <a className="main-layout-footer__extra-link" href="http://www.opensupports.com/documentation/" target="_blank">Documentation</a>
            </div>
        );
    }

    getClass() {
        let classes = {
            'main-layout-footer': true,
            'main-layout-footer_admin-panel': this.props.adminPanelOpened
        };

        return classNames(classes);
    }
}

export default connect((store) => {
    return {
        adminPanelOpened: store.session.staff
    };
})(MainLayoutFooter);
