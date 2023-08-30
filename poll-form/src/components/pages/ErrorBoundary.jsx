import React from "react"

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            errorInfo: null
        };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
    }

    render() {
        if (this.state.errorInfo) {
            return (
                <div style={{
                    height: '100vh',
                    backgroundColor: '#000',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <div >
                        <span style={{ 'width': '80' }} />
                        <h2 style={{ 'color': 'white' }}>We'll be right back.</h2>
                        <h6 style={{ 'color': 'white' }}>Kindly inform us about this issue by writing to us at <a target="_blank" href="https://www.test.com/poll-software" >test@test.com</a></h6>
                        <hr style={{ borderColor: '#ffffff36' }} />
                        <details style={{ whiteSpace: 'pre-wrap', color: '#fff' }}>
                            {this.state.error && this.state.error.toString()}
                            <br />
                            {this.state.errorInfo.componentStack}
                        </details>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary