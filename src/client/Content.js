import React from 'react';

// Main web page content
const Content = () => {
    return (
            <div className={"ui container"} style={{display: 'flex', justifyContent: 'space-around', opacity: '0.9'}}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div className={"ui raised very padded text container segment"}>
                        <h1>Our Services</h1>
                        <div className="ui horizontal segments">
                            <div className="ui segment">
                                <p>Insurance</p>
                                <i className={"handshake outline icon"}></i>
                                <strong>We take care of you!</strong>
                            </div>
                            <div className="ui segment">
                                <p>Banking</p>
                                <i className={"money bill alternate outline icon"}></i>
                                <strong>Secure Banking</strong>
                            </div>
                            <div className="ui segment">
                                <p>Investments </p>
                                <i className={"balance scale icon"}></i>
                                <strong>Rated #1 in Tennessee</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
};

export default Content;