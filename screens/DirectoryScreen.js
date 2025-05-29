import {FlatList} from 'react-native';
import {Tile} from 'react-native-elements';
import { useSelector } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from '../components/loadingComponent';

const DirectoryScreen = ({navigation})=> {
    const campsites = useSelector((state)=> state.campsites);
    if(campsites.isLoading){
        return <Loading />
    }
    if (campsites.errMess) {
        return (
            <View>
                <Text>{campsites.errMess}</Text>
            </View>
        )
    }
    const renderDirectoryItem = ({item: campsite}) => { //item prop is destructured her and renamed campsite
        return (
            <Tile 
            title = {campsite.name}
            caption = {campsite.description}
            featured
            onPress= {() => navigation.navigate('CampsiteInfo', {campsite})} 
            imageSrc = {{uri: baseUrl + campsite.image}}
            />
        )
    }

    return (    
        <FlatList
            data = {campsites.campsitesArray}// Must be in the form of an array
            renderItem = {renderDirectoryItem}// Special rendering function for render prop
            keyExtractor = {(item)=> item.id.toString()}//idk
        />
    )
}

export default DirectoryScreen;