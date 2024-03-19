import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import App from '../Components/App/App';

import {
  logOut
} from '../store/Actions';

const mapStateToProps = state => {
  return {
    logoutRes: state.userReducer.logoutRes,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onlogOut: bindActionCreators(logOut, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);