import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button} from 'react-native';
import NavigationBar from "../../common/NavigationBar";
import CustomKeyPage from "./CustomKeyPage";
import ViewUtils from "../util/ViewUtils";


export default class MyPage extends Component {
    constructor(props){
        
        super(props)
    }

    render() {

        return (
            
            <View style={styles.container}>

                <NavigationBar
                    title='最热'
                    style={{backgroundColor: '#2196F3'}}
                />
                <Text
                    onPress={()=>{
                        this.props.navigation.push('CustomKeyPage',{...this.params})
                    }}
                    style={styles.welcome}>自定义标签</Text>


                <Text
                    onPress={()=>{
                        this.props.navigation.push('SortKeyPage',{...this.params})
                    }}
                    style={styles.welcome}>标签排序</Text>
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
