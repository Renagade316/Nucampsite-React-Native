import {Text, View, ScrollView} from 'react-native';
import { useSelector } from 'react-redux';
import { Card } from 'react-native-elements';
import { baseUrl } from '../shared/baseUrl';
import Loading from '../components/loadingComponent';


const FeaturedItem = (props) => {
    const {item} = props;
    if (props.isLoading) {
        return <Loading />
    }
    if (props.errMess) {
        return (
            <View>
                <Text>{props.errMess}</Text>
            </View>
        )
    }


    /* Conditional rendering in case item is undefined */
    if (item) {
        return (
            <Card containerStyle = {{padding: 0}}>
                <Card.Image source = {{uri: baseUrl + item.image}}>
                    <View style ={{justifyContent: 'center', flex: 1}}>
                        <Text
                            style = {{
                                color: 'white',
                                textAlign: 'center',
                                fontSize: 20
                            }}
                        >
                            {item.name}
                        </Text>
                    </View>
                </Card.Image>
                <Text style = {{margin: 20}}> {item.description} </Text>
            </Card>
        )
    }
}
const HomeScreen = () => {
    const campsites = useSelector((state)=> state.campsites);
    const promotions = useSelector((state)=> state.promotions);
    const partners = useSelector((state)=> state.partners);
    /*
    * find vs. filter
    * find returns a the very first thing that meets the criteria
    *  returns an array of results 
    */     
    const featuredCampsite = campsites.campsitesArray.find((item)=>item.featured);
    const featuredPromotion = promotions.promotionsArray.find((item)=>item.featured);
    const featuredPartner = partners.partnersArray.find((item)=>item.featured);
    return ( 
        /*ScrollView vs. FlatList 
        * ScrollView loads all child components at once
        * FLatList lazy load - only render a part of the list at a time
        * Items removed from the screen to save memory
        * FlatList is better for a large list of screens/ items
        * ScrollView is better here since we have a fixed number of components
        */

        <ScrollView>
            <FeaturedItem 
                item = {featuredCampsite} 
                isLoading = {campsites.isLoading}
                errMess = {campsites.errMess}
            />
            <FeaturedItem 
                item = {featuredPromotion} 
                isLoading = {promotions.isLoading}
                errMess = {promotions.errMess}
            />
            <FeaturedItem 
                item = {featuredPartner} 
                isLoading = {partners.isLoading}
                errMess = {partners.errMess}
            />
        </ScrollView>
    )
}

export default HomeScreen;