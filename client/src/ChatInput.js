import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ChatInput extends Component {
    static propTypes = {
        onSubmitMessage: PropTypes.func.isRequired,
    }
    state = {
        message: '',
    }

    render() {
        return (
            <form
                action="."
                onSubmit={e => {
                    e.preventDefault()
                    this.props.onSubmitMessage(this.state.message)
                    this.setState({ message: '' })
                }}
            >
                <div className="textarea">
                    <input
                        type="text"
                        placeholder={'Enter message...'}
                        className="msgInput"
                        value={this.state.message}
                        onChange={e => this.setState({ message: e.target.value })}
                    />
                </div>
                {/* <div className="box">
                    <input type="submit" className="submit" value={'Send'} />
                </div> */}
            </form>
        )
    }
}

export default ChatInput;