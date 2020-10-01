import React from 'react';
import { withRouter } from 'react-router-dom';

// Details
// https://reactrouter.com/web/guides/scroll-restoration/scroll-to-top
// https://stackoverflow.com/questions/33188994/scroll-to-the-top-of-the-page-after-render-in-react-js/44854959#44854959

class ScrollToTop extends React.Component {
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0);
        }
    }

    render() {
        // return <React.Fragment />
        return this.props.children
    }
}

export default withRouter(ScrollToTop)