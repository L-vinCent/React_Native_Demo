import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button} from 'react-native';


type Props = {};
export default class Page2 extends Component<Props> {
    render() {
        const {navigation} = this.props;

        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to page2!</Text>
                <Button
                    title= "Go Back"
                    onPress={()=>{
                        navigation.goBack();
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
