import React from 'react';

class DrumPadButton extends React.Component {

    constructor (props) {
        super(props);
        this.onButtonClick = this.props.onButtonClick.bind(null, this.props.type);
    }

    render () {
        return (
            <div className="drumpad__part">
                <button
                    className="drumpad__btn btn--drumpad btn"
                    onClick={this.onButtonClick}
                ></button>
                <div className="drumpad__part_name">{this.props.name}</div>
            </div>
        );
    }

}

export default DrumPadButton;
