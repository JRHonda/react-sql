import React from 'react';

class Results extends React.Component {
    state = {}

    render() {
        return (
            <div className={"ui container"} >
                <label className={"label"} styles={{marginTop: '30px', paddingLeft: '30px'}}>
                    {this.props.result.map((data, id) => (
                        <h1 key={id} >
                            {data.username} with id: {id} and password: {data.password}
                        </h1>
                    ))}
                </label>
            </div>
        );
    }
}

export default Results;