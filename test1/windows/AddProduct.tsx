import React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addMessage} from '../redux/actions';
import {
    Alert,
    FlatList,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TextInput,
    View,
    Text,
    TouchableOpacity
} from "react-native";
import {Product} from "../model/Product";
import {Category} from "../model/Category";
import {CategoryItem} from "../components/CategoryItem";
import {iAddProduct, iClickCategory} from "../model/Interfaces";
import {Colors} from "react-native/Libraries/NewAppScreen";

type Props = {
    categories: Category[],
}

class AddProduct extends React.Component<any, any> {

    constructor(props: Props) {
        super(props);

        this.state = {
            categories: [],
            selectedCategory: "all",
            productTitle: "",
            productPrice: "",
            productDescription: "",
            productImage: "",
        };
    }

    componentDidMount() {

    }

    addProduct = () => {

        const i:iAddProduct  = {
            Description: this.state.productDescription,
            Category: this.state.selectedCategory,
            Image: this.state.productImage,
            Price: this.state.productPrice,
            DeveloperEmail: "victor_naz@hotmail.com",
            Name: this.state.productTitle,
        }

        new Product().addProduct(i).then((p) => {
            Alert.alert("Success", "New Product was successfully added!");
        }).catch((e) => {
            console.log(e);
            Alert.alert("Error", "Please try again!");
        })
    }

    render() {
        return (
            <SafeAreaView style={styles.main_area}>
                <ScrollView style={styles.scrollView}>

                    <View style={styles.titleMainContainer}>
                        <View style={styles.titleContainer}>
                            {this.state.productTitle != '' ? (
                                <Text style={styles.descriptionText}>Product Title</Text>
                            ) : (
                                null
                            )}
                        </View>

                        <TextInput
                            placeholder = "Product Title"
                            onChangeText = {title => this.setState({ productTitle: title })}
                            style={styles.textInput} />

                    </View>
                    <View style={styles.titleMainContainer}>
                        <View style={styles.titleContainer}>
                            {this.state.productPrice != '' ? (
                                <Text style={styles.descriptionText}>Price</Text>
                            ) : (
                                null
                            )}
                        </View>
                        <TextInput
                            keyboardType = "numeric"
                            placeholder = "Price"
                            onChangeText = {price => this.setState({ productPrice: price })}
                            style={styles.textInput} />

                    </View>
                    <View style={styles.titleMainContainer}>
                        <View style={styles.titleContainer}>
                            {this.state.productDescription != '' ? (
                                <Text style={styles.descriptionText}>Description</Text>
                            ) : (
                                null
                            )}
                        </View>

                        <TextInput
                            textAlignVertical={"top"}
                            textBreakStrategy={"highQuality"}
                            multiline={true}
                            placeholder = "Description"
                            onChangeText = {description => this.setState({ productDescription: description })}
                            style={styles.textMultiInput} />

                    </View>
                    <View style={styles.titleMainContainer}>
                        <View style={styles.titleContainer}>
                            {this.state.productImage != '' ? (
                                <Text style={styles.descriptionText}>Image Link</Text>
                            ) : (
                                null
                            )}
                        </View>
                        <TextInput
                            placeholder = "Image Link"
                            onChangeText = {link => this.setState({ productImage: link })}
                            style={styles.textInput} />
                    </View>
                    <View style={styles.categoryMainContainer}>
                        <Text style={styles.categoryLabel}>Selected Category:</Text>
                        <Text style={styles.categoryText}>{this.state.selectedCategory}</Text>
                    </View>
                    <View>
                        {/*top scroll*/}
                        <FlatList
                            style={styles.category_section}
                            horizontal={true}
                            data={this.props.categories}
                            renderItem={({ item }) => {
                                return <CategoryItem item={item} selected={this.state.selectedCategory} callback={(check: iClickCategory) => {
                                    this.setState({selectedCategory: check.id});
                                }} ></CategoryItem>;
                            }}
                            showsHorizontalScrollIndicator={false}
                        />
                        {/*end top scroll*/}
                    </View>
                    <View style={styles.addButtonContainer}>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={styles.addButton}
                            onPress={()=>{
                                this.addProduct();
                            }}
                        >
                            <Text style={styles.addButtonText}>Add Product</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }

}
const mapStateToProps = (state: any) => {
    const {messages} = state;
    return {messages};
};
const mapDispatchToProps = (dispatch: any) => bindActionCreators({ addMessage }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);

const styles = StyleSheet.create({

    categoryText: {
        fontSize: 16,
        color: Colors.black,
        textAlign: 'left',
        marginLeft: 10,
        fontWeight: 'bold'
    },
    categoryLabel:{
        fontSize: 16,
        color: Colors.black,
        textAlign: 'left',
    },
    categoryMainContainer: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        marginBottom: 10,
        flexDirection: 'row'
    },
    titleMainContainer: {
        alignItems: 'center',
        marginTop: 3,
    },
    titleContainer: {
        height: 20,
        paddingLeft: 10,
        width: '100%',
    },
    descriptionText: {
        textAlign: 'left',
        width: '100%',
    },
    addButtonContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    addButton: {
        borderWidth: 1,
        borderColor: '#000000',
        padding: 10,
        borderRadius: 10,
        backgroundColor: Colors.white
    },
    addButtonText: {
        color: Colors.black,
        fontSize: 20,
        fontWeight: 'bold'
    },
    textMultiInput: {
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 10,
        width: '95%',
        height: 120,
        fontSize: 20,
        alignItems: 'flex-start',
        paddingLeft: 10,
        paddingRight: 10,
    },
    textInput: {
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 10,
        width: '95%',
        fontSize: 20,
        paddingLeft: 10,
        paddingRight: 10,
    },
    category_section: {
        marginTop: 5,
        marginBottom: 5,
    },
    main_area: {
        backgroundColor: '#cccccc',
        flex: 1,
    },
    scrollView: {
        marginVertical: 0,
    },

});