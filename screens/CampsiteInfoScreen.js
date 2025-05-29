import RenderCampsite from '../features/campsites/RenderCampsites'
import { FlatList, StyleSheet, Text, View, Modal, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
//import { Button, Modal, View } from 'react-native';
import { useState } from 'react';
import {postComment} from '../features/comments/commentsSlice';
import {Rating, Input} from 'react-native-elements';


const CampsiteInfoScreen = ({ route }) => {
    const {campsite} = route.params;
    const comments = useSelector((state)=> state.comments)
    const [showModal, setShowModal] = useState(false);
    const favorites = useSelector((state)=> state.favorites);
    const dispatch = useDispatch();
    const [rating, setRating] = useState(5);
    const [author, setAuthor] = useState('');
    const [text, setText] =  useState('');
    
    const  handleSubmit = () => {
        const newComment = {
            author,
            rating,
            text,
            campsiteId: campsite.id
        };
        dispatch(postComment(newComment));
        setShowModal(false);
    }

    const resetForm = () => {
        setRating(5);
        setAuthor('');
        setText('');
    }

    const renderCommentItem = ({item}) => {
        return (
            <View style={StyleSheet.commentItem}>
                <Text style = {{fontSize: 14}}>{item.text}</Text>
                <Rating
                    readonly
                    startingValue = {item.rating}
                    imageSize = {10}
                    style = {{alignItems: 'flex-start', paddingVertical: '5%'}}
                />
                <Text style = {{fontSize: 12}}>{`--${item.author}, ${item.date}`}</Text>
            </View>
        )
    }

    return (
        <>
        <FlatList
            data={comments.commentsArray.filter(
                (comment) => comment.campsiteId == campsite.id
            )}
            renderItem = {renderCommentItem}
            keyExtractor={(item)=> item.id.toString()}
            contentContainerStyle = {{
                marginHorizontal: 20,
                paddingVertical: 20
            }}
            ListHeaderComponent={
                <>
                    <RenderCampsite 
                        campsite = {campsite}
                        isFavorite = {favorites.includes(campsite.id)}
                        markFavorite = {()=> dispatch(toggleFavorite(campsite.id))}
                        onShowModal = {()=> setShowModal(!showModal)}
                    />
                    <Text style = {styles.commentsTitle}>Comments</Text>
                </>
            }
        />
        <Modal 
            animationType = 'slide'
            transparent = {false}
            visible = {showModal}
            onRequestClose = {()=> setShowModal(false)}
        >
            <View style = {styles.modal}>
                <Rating 
                    showRating
                    startingValue = {rating}
                    imageSize = {40}
                    onFinishRating = {(rating) => setRating(rating)}
                    style = {{paddingVertical: 10}}

                />

                <Input  
                    placeholder = 'Author'
                    leftIcon = {{type: 'font-awesome', name: 'user-o'}}
                    leftIconContainerStyle = {{paddingRight: 10}}
                    onChangeText = {(value)=> setAuthor(value)}
                    value={author}
                /> 
                <Input 
                    placeholder= 'Comment'
                    leftIcon = {{type: 'font-awesome', name: 'comment-o'}}
                    leftIconContainerStyle= {{paddingRight: 10}}
                    onChangeText = {(value)=> setText(value)}
                    value = {text}
                /> 

                <View style = {{margin: 10}}>
                    <Button 
                        title = 'Submit'
                        color = '#5637DD'
                        onPress = {()=> {
                            handleSubmit();
                            resetForm();
                        }}
                    />
                </View>

                <View style = {{margin: 10}}>
                    <Button
                        title = 'Cancel'
                        color = '#808080'
                        onPress = {() => setShowModal(!showModal)}
                    />
                </View>
            </View>
        </Modal>
        </>
        
    )
}

const styles = StyleSheet.create({
    commentsTitle: {
        textAlign: 'center',
        backgroundColor: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#43484D',
        padding: 10,
        paddingTop: 30
    },
    commentItem: {
        paddingVertical: 10,
        padingHorizontal: 20,
        backgroundColor: '#fff' 
    },

    modal: {
        justifyContent: 'center',
        margin: 20
    }
})

export default CampsiteInfoScreen;