import React from 'react';

class Results extends React.Component {
    
    state = {}

    render() {
        return (
            <div className={"ui label"} >
                <label>
                    {this.props.result.map((data, id) => (
                        <h1 key={id} >
                            {data.username} with id: {id}, password: {data.password}, email: {data.email}
                        </h1>
                    ))}
                </label>
            </div>
        );
    }
}

export default Results;