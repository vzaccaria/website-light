import React from 'react';

let bioPage = React.createClass({
    render() {
        return (
            <div className="bio-container">
                <div className="bio">
                    <div className="bio__title"> Bio </div>
                    <div className="bio__picture"/>
                    <div className="bio-text bio-text--size-medium">
                        <div className="bio-text__title"> Vittorio Zaccaria </div>
                        <div className="bio-text__position"> Assistant Professor </div>
                        <div className="bio-text__description"> .... </div>
                    </div>
                </div>
            </div>);
    }
});

module.exports = { bioPage }
