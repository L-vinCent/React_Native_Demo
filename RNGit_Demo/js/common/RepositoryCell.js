import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

export default class RepositoryCell extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFavorite: this.props.projectModel.item.isFavorite,
            favoriteIcon: this.props.projectModel.item.isFavorite ? require('../../res/images/ic_star.png') : require('../../res/images/ic_unstar_transparent.png'),
        }
    }

    setFavoriteState(isFavorite){
        this.props.projectModel.item.isFavorite = isFavorite;
        this.setState({
            isFavorite:isFavorite,
            favoriteIcon: this.props.projectModel.item.isFavorite ? require('../../res/images/ic_star.png') : require('../../res/images/ic_unstar_transparent.png'),
        })

    }

    onPressFavoriteBtn() {

        this.setState({


            isFavorite: !this.state.isFavorite,
            favoriteIcon: !this.state.isFavorite ? require('../../res/images/ic_star.png') : require('../../res/images/ic_unstar_transparent.png'),

        })
        this.props.onFavorite(this.props.projectModel.item.item,!this.state.isFavorite)
    }

    componentWillReceiveProps(nextProps) {

        this.setFavoriteState(nextProps.projectModel.item.isFavorite);
    }

    render() {

        let item = this.props.projectModel.item.item ? this.props.projectModel.item.item : this.props.projectModel.item;
        console.log(item);
        let favoriteBtn = <TouchableOpacity

            onPress={() => this.onPressFavoriteBtn()}
        >

            <Image
                style={[{height: 22, width: 22}, {tintColor: '#2196F3'}]}
                source={this.state.favoriteIcon}
            />

        </TouchableOpacity>

        return <TouchableOpacity

            onPress={this.props.onSelect}

        >

            <View style={styles.cell_container}>
                <Text style={styles.title}>{item.archive_url}</Text>
                <Text>{item.description}</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text>Author:</Text>
                        <Image
                            style={{height: 22, width: 22}}
                            source={{uri: item.owner.avatar_url}}
                        />
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text>Stars:</Text>
                        <Text>{item.stargazers_count}</Text>

                    </View>
                    {favoriteBtn}
                </View>

            </View>


        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontSize: 18,
        marginBottom: 2,
        color: '#212121'
    },
    description: {
        fontSize: 14,
        marginBottom: 2,
        color: '#757575',
        borderRadius: 2,

    },
    cell_container: {
        backgroundColor: 'white',
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        marginVertical: 3,
        borderWidth: 0.5,
        shadowColor: 'gray',
        shadowOffset: {width: 0.5, height: 0.5},
        shadowRadius: 1,
        borderColor: '#dddddd'
    },
})