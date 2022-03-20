import React from 'react';
import {Animated, Easing, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';

import EmptyImage from "../components/EmptyImage";
import {ClickFunc, iDeleteProduct} from '../model/Interfaces';
import {Product} from "../model/Product";

type ItemProps = {
    info: Product,
    callback: (i: ClickFunc)=>{},
    delete: (i: iDeleteProduct)=>{}
}

export class ProductItem extends React.Component<any, any> {

    public targetRotateSmall: any;

    constructor(props: ItemProps) {
        super(props);
        this.targetRotateSmall = new Animated.Value(0);
    }

    render() {

        return (

            <View style={styles.item}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                        Animated.timing(this.targetRotateSmall, {toValue: 720, duration: 500, easing: Easing.bounce, useNativeDriver: true}).start(() => {
                            this.targetRotateSmall.setValue(0);
                            if(this.props.callback != undefined) {
                                const i:ClickFunc = {
                                    done: true
                                }
                                this.props.callback(i);
                            }
                        });
                    }} >
                    <View style={styles.item_container}>
                        <EmptyImage url={this.props.info.avatar} style={{
                            width: 100,
                            height: 170,
                            resizeMode: 'contain',
                            transform: [
                            {
                                rotateY: this.targetRotateSmall.interpolate({
                                    inputRange: [0, 360],
                                    outputRange: ['0deg', '360deg'],
                                })
                            }]
                        }} />
                    </View>
                    <View style={styles.text_item}>
                        <Text numberOfLines={1} style={styles.title}>{this.props.info.name}</Text>
                    </View>
                    <View style={styles.price_item}>

                        <View style={{
                            flexDirection: 'row',
                        }}>
                            <View style={{
                                flex: 1
                            }}>
                                <Text numberOfLines={1} style={styles.title}>${this.props.info.price}</Text>
                            </View>
                            <View style={{
                                flex: 1,
                            }}>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => {
                                        if (this.props.delete != null) {
                                            const i:iDeleteProduct = {
                                                id: this.props.info.id
                                            }
                                            this.props.delete(i);
                                        }
                                    }}>
                                    <Text style={styles.edit_link}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </TouchableOpacity>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    edit_link: {
        textAlign: 'right',
        textDecorationLine: 'underline',
        color: '#000000'
    },
    price_item: {
        flexDirection: 'row',
        padding: 3,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0,
        borderColor: 'green',
    },
    text_item: {
        flexDirection: 'row',
        padding: 3,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0,
        borderColor: 'green',
    },
    item_container: {
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    title: {
        flex: 1,
        fontSize: 14,
        textAlign: 'left',
        borderColor: 'red',
        borderWidth: 0,
        flexWrap: 'wrap',
        color: '#000000',
        fontWeight: 'bold'
    },
    item: {
        flexDirection: 'column',
        borderWidth: 1,
        borderColor: '#ffffff',
        margin: 10,
        height: 'auto',
        width: 140,
    }
});