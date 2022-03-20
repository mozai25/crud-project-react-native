import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from "react-native";
import {Product} from "../model/Product";

type ItemProps = {
    product: Product,
}

export class ViewDetails extends React.Component<any, any> {

    constructor(props: ItemProps) {
        super(props);
    }

    render() {

        return (
            <SafeAreaView style={styles.main_area}>

                <ScrollView style={styles.scrollView}>
                    <View style={styles.inner_view}>

                        <View style={styles.image_container}>
                            <Image
                                style={styles.stretch_new}
                                source={{uri: this.props.product.avatar}}
                            />
                        </View>
                        <View style={styles.text_container}>
                            
                            <View style={styles.line_dashed}>
                                <Text style={styles.bold_title}>{this.props.product.name}</Text>
                                <Text style={styles.bold_price}>${this.props.product.price}</Text>
                            </View>
                            <View style={styles.plot}>
                                <Text style={styles.normal_title}>{this.props.product.description}</Text>
                            </View>

                        </View>

                    </View>
                </ScrollView>

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({

  main_area: {
    backgroundColor: '#cccccc',
    flex: 1,
  },
  inner_view: {
    flexDirection: 'column'
  },
  image_container: {
    height: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plot: {
    flexDirection: 'row',
    padding: 5
  },
  text_container: {
    flexDirection: 'column',
    backgroundColor: '#cccccc',
    marginTop: 5,
    paddingBottom: 50,
  },
  normal_title: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'normal'
  },
  bold_title: {
    flex: 4,
    fontSize: 24,
    fontWeight: 'bold'
  },
  bold_price: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'right'
  },
  line_dashed: {
    flexDirection: 'row',
    padding: 5,
    borderBottomWidth: 0.5,
    borderStyle: 'dashed'
  },
  stretch_new: {
    width: Dimensions.get('window').width - 50,
    height: Dimensions.get('window').width,
    resizeMode: 'contain',
  },
  scrollView: {
    marginVertical: 0,
  },
});


