/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import type from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    SectionList,
    Image,
    Dimensions,
    TouchableOpacity,
    RefreshControl,
    Button,
    Alert,
    FlatList,
    Animated,
    Easing,
    NativeModules,
    NativeEventEmitter,
    EmitterSubscription
} from 'react-native';

import {ClickFunc, HelloInterfaceFromAndroid, iClickCategory, iDeleteProduct} from '../model/Interfaces';
import EmptyImage from "../components/EmptyImage";
import {ProductItem} from "../components/ProductItem";
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addMessage} from '../redux/actions';
import {Category} from "../model/Category";
import {CategoryItem} from "../components/CategoryItem";
import {Product} from "../model/Product";
import {Colors} from "react-native/Libraries/NewAppScreen";

const HelloFromAndroid = NativeModules.HelloFromAndroid;
const helloEmitter = new NativeEventEmitter(HelloFromAndroid);

type Props = {}
class App extends React.Component<any, any> {

    screenPoppedListener: EmitterSubscription | undefined;

    constructor(props: Props) {
        super(props);

        this.state = {
            categories: [],
            products: [],
            refreshing: true,
            selectedCategory: "all",
        };

    }

    loadCategories = (id?: string) => {

        new Category().getCategories().then((data: Category[]) => {
            this.setState({categories: data});
        }).catch((error) => {
            console.log(error);
        });
    }

    loadProducts = (category?: string) => {

        this.setState({refreshing: true});
        new Product().getProducts(category).then((data: Product[]) => {
            this.setState({products: data, refreshing: false});
        }).catch((error) => {
           console.log(error);
        });
    }

    deleteProduct = (id?: string) => {

        this.setState({refreshing: true});
        new Product().deleteProduct(id).then((data: Product) => {
            this.loadProducts();
        }).catch((error) => {
            console.log(error);
        });

    }

    componentDidMount() {

        this.loadCategories();
        this.loadProducts();

        this.screenPoppedListener = Navigation.events().registerScreenPoppedListener(({ componentId }) => {
            this.loadProducts(this.state.selectedCategory);
        });
    }

    componentWillUnmount() {
        if(this.screenPoppedListener != undefined) this.screenPoppedListener.remove();
    }

    render() {

       return (

            <SafeAreaView style={styles.top_container}>
              <View style={styles.topContainer}>
                  <View>
                      {/*top scroll*/}
                      <FlatList
                          style={styles.category_section}
                          horizontal={true}
                          data={this.state.categories}
                          renderItem={({ item }) => {
                              return <CategoryItem item={item} selected={this.state.selectedCategory} callback={(check: iClickCategory) => {
                                  this.setState({selectedCategory: check.id, refreshing: true});
                                  this.loadProducts(check.id);
                              }} ></CategoryItem>;
                          }}
                          showsHorizontalScrollIndicator={false}
                      />
                      {/*end top scroll*/}
                  </View>
                  <View>
                      <FlatList
                          contentContainerStyle={styles.contentContainerStyle}
                          style={styles.flatListSize}
                          data={this.state.products}
                          renderItem={({ item }) => {
                              return <ProductItem info={item} callback={(check: ClickFunc)=>{

                                  if (check.done) {
                                      Navigation.push(this.props.componentId, {
                                          component: {
                                              name: 'test1.info',
                                              passProps: {
                                                  product: item
                                              },
                                              options: {
                                                  topBar: {
                                                      title: {
                                                          text: 'Info Page'
                                                      }
                                                  }
                                              }
                                          }
                                      })
                                  }
                              }} delete={(check: iDeleteProduct) => {
                                  Alert.alert(
                                      'Are you sure?',
                                      'Do you want to delete ' + item.name + '?',
                                      [
                                          {
                                              text: 'Cancel',
                                              onPress: () => {

                                              },
                                              style: "cancel"
                                          },
                                          {
                                              text: 'Delete', onPress: () => {
                                                  this.deleteProduct(check.id);
                                              }
                                          }
                                      ]);
                              }}></ProductItem>
                          }}
                          refreshControl={
                              <RefreshControl
                                  title={"Requesting"}
                                  titleColor={'#3a6b33'}
                                  refreshing={this.state.refreshing}
                                  enabled={this.state.refreshing}
                                  progressViewOffset={10}
                                  colors={['white']}
                                  progressBackgroundColor={'#dddddd'}
                                  onRefresh={() => {

                                  }}
                              />
                          }
                      />
                  </View>
                  <View style={{
                      position: 'absolute',
                      bottom: 1,
                      right: 1,
                  }}>
                      <TouchableOpacity style={styles.addItemButton}
                          onPress={() => {

                              Navigation.push(this.props.componentId, {
                                  component: {
                                      name: 'test1.add',
                                      passProps: {
                                          categories: this.state.categories
                                      },
                                      options: {
                                          topBar: {
                                              title: {
                                                  text: 'Add Product'
                                              }
                                          }
                                      }
                                  }
                              })

                          }}
                      >
                          <Text style={{fontSize: 26, color: Colors.black}}>+</Text>
                      </TouchableOpacity>
                  </View>
              </View>
            </SafeAreaView>
      );
    }
}
const mapStateToProps = (state: any) => {
    const {messages} = state;
    return {messages};
};
const mapDispatchToProps = (dispatch: any) => bindActionCreators({ addMessage }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(App);

const styles = StyleSheet.create({
  addItemButton: {
    borderColor: Colors.black,
    borderWidth: 0.5,
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatListSize: {
    width: '100%',
    height: '100%',
  },
  topContainer: {
    flex: 1,
    paddingBottom: 50,
  },
  contentContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  category_section: {
    marginTop: 5,
    marginBottom: 5,
  },
  section_title: {
    flexDirection: 'column',
    marginBottom: 5,
    width: '100%'
  },
  top_container: {
    backgroundColor: '#cccccc',
    flex: 1,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  header: {
    borderWidth: 0,
    borderColor: 'red',
    fontSize: 28,
    backgroundColor: "#fff",
    width: '100%',
    textAlign: 'center',
  },
  stretch_new: {

  },
});

