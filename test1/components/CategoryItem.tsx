import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import {iClickCategory} from "../model/Interfaces";
import {Category} from "../model/Category";
import {Colors} from "react-native/Libraries/NewAppScreen";

type CategoryProps = {
    item: Category,
    callback: (i: iClickCategory)=>{},
    selected: string,
}

export class CategoryItem extends React.Component<any, any> {

    constructor(props: CategoryProps) {
        super(props);

    }

    render() {

        return (

            <View style={this.props.selected == this.props.item.name ? styles.itemSelected : styles.item}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                        if(this.props.callback != undefined) {
                            const i:iClickCategory = {
                                id: this.props.item.name
                            }
                            this.props.callback(i);
                        }
                    }} >
                    <View style={styles.text_item}>
                        <Text style={styles.title}>{this.props.item.name}</Text>
                    </View>
                </TouchableOpacity>
            </View>

        );
    }
}

const styles = StyleSheet.create({

    title: {
        flex: 1,
        fontSize: 16,
        textAlign: 'center',
        color: '#000000',
    },
    text_item: {
        flexDirection: 'row',
        padding: 3,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0,
    },
    item: {
        paddingRight: 5,
        paddingLeft: 5,
        borderWidth: 1,
        borderColor: '#ffffff',
        marginTop: 2,
        marginLeft: 2,
        marginRight: 2,
        marginBottom: 2,
    },
    itemSelected: {
        paddingRight: 5,
        paddingLeft: 5,
        borderWidth: 1,
        borderColor: '#ffffff',
        marginTop: 2,
        marginLeft: 2,
        marginRight: 2,
        marginBottom: 2,
        backgroundColor: Colors.white,
    }


});