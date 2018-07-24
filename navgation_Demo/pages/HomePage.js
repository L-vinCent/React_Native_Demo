import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button} from 'react-native';


type Props = {};
export default class HomePage extends Component<Props> {
    render() {
        const {navigation} = this.props;

        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Button
                    title = "go to Page1"
                    onPress={()=>{
                        navigation.navigate('Page1',{name:'动态的'})
                    }}
                />
                <Button
                    title = "go to Page2"
                    onPress={()=>{
                        navigation.navigate('Page2')
                    }}
                />
                <Button
                    title = "go to Page3"
                    onPress={()=>{
                        navigation.navigate('Page3',{title:'PP'})
                    }}
                />

                <Button
                    title = "go to TabNavigation"
                    onPress={()=>{
                        navigation.navigate('TabNav',{title:'PP'})
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
