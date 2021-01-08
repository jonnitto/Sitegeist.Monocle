import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Button from '@neos-project/react-ui-components/lib-esm/Button';
import Icon from '@neos-project/react-ui-components/lib-esm/Icon';

import {withToggableState} from 'components';
import {selectors} from 'state';

import SiteList from './site-list';

import style from './style.css';

@withToggableState('isOpen')
@connect(state => {
    const currentlySelectedSitePackageKey = selectors.sites.currentlySelectedSitePackageKey(state);
    const sites = selectors.sites.all(state);

    return {
        hasMultipleSites: sites && Object.keys(sites).length > 1,
        label: currentlySelectedSitePackageKey ? currentlySelectedSitePackageKey : '---'
    };
})
export default class SiteSelector extends PureComponent {
    static propTypes = {
        isOpen: PropTypes.bool,
        hasMultipleSites: PropTypes.bool,
        label: PropTypes.string.isRequired,
        toggleIsOpen: PropTypes.func.isRequired
    };

    render() {
        const {isOpen, hasMultipleSites, label, toggleIsOpen} = this.props;

        return (
            <div className={style.container}>
                <Button className={style.selector} style="clean" onClick={toggleIsOpen}>
                    <Icon icon="globe" className={style.icon}/>
                    {label}
                </Button>
                <SiteList
                    isVisible={isOpen && hasMultipleSites}
                    onClickOutside={toggleIsOpen}
                    onSelectSite={toggleIsOpen}
                    />
            </div>
        );
    }
}
