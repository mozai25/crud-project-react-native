/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Navigation } from "react-native-navigation";
import {ViewDetails} from '../components/ViewDetails';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addMessage} from '../redux/actions';
import {Alert, View} from "react-native";
import {Product} from "../model/Product";

type Props = {
    product: Product
}

class Info extends React.Component<any, any> {

    constructor(props : Props) {
      super(props);
    }

    componentDidMount() {

        // redux sample
        let title = "First visit, pls revisit!";
        if (this.props.messages.subscription != "") {
           title = this.props.messages.subscription;
        }
        //Alert.alert('Hello from Redux', 'Last visited page: ' + title);
        this.props.addMessage(this.props.product.name);
    }

    render() {
        return (
            <ViewDetails product={this.props.product} />
        )
    }
}
const mapStateToProps = (state: any) => {
    const messages = state;
    return messages;
};
const mapDispatchToProps = (dispatch: any) => bindActionCreators({ addMessage }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Info);