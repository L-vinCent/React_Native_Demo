import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, WebView} from 'react-native';
import NavigationBar from "../common/NavigationBar";
import ViewUtils from "./util/ViewUtils";
import NavigatorUtil from "./NavigatorUtil";

const URL = 'http://www.baidu.com'

export default class RepositoryDetail extends Component {
    constructor(props) {

        super(props);
        const {params} = this.props.navigation.state;
        let projectModel = params.item.item;
        this.url = projectModel.item.html_url;
        let title = projectModel.item.full_name;

        this.state = {
            url: this.url,
            title: title,
            canGoBack: false,
        }
    }

    onBack() {
        NavigatorUtil.goBack(this.props.navigation);

    }

    onNavigationStateChange(e) {
        this.setState({
            canGoBack: e.canGoBack,
            url: e.url,
        })
    }

    render() {

        return (

            <View style={styles.container}>

                <NavigationBar
                    title={this.state.title}
                    style={{backgroundColor: '#2196F3'}}
                    leftButton={ViewUtils.getLeftButton(() => this.onBack())}

                />

                <WebView
                    source={{title: this.state.title, uri: this.state.url}}
                    onNavigationStateChange={(e) => this.onNavigationStateChange(e)}
                    startInLoadingState={true}
                    onLoad={() => {
                        console.log('onLoad')
                    }}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },

});
