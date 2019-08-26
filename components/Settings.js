import React, { Component } from "react";
import { connect } from 'react-redux'
import {
    View,
    Text,
    StyleSheet,
    Button
} from "react-native";
import ImagePicker from 'react-native-image-picker'
// import RNFetchBlob from 'rn-fetch-blob'
import { uploadImage } from '../redux/actionCreators/imageUploadActions'

const cloudinaryName = 'aaulinho';

class Settings extends Component {
    state = {
        image: ''
    }

    uploadToCloudinary = (photo) => {
        console.log(RNFetchBlob.wrap(photo.uri))
        let cleanUri = string_.ltrim(photo.uri, "file://");
        RNFetchBlob.fetch(
            'POST',
            'https://api.cloudinary.com/v1_1/' + cloudinaryName + '/image/upload/',
            {
                'Content-type': 'multipart/form-data'
            },
            [
                { name: 'Photo', filename: photo.fileName, type: photo.type, data: RNFetchBlob.wrap(cleanUri) }
            ]
        )
            .then(res => {
                console.log(res.json())
            })
            .then(result => {
                console.log(result)
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleChoosePhoto = () => {
        const options = {
            noData: true
        };
        ImagePicker.launchImageLibrary(options, response => {
            this.setState({ image: response.uri })
            this.uploadToCloudinary(response)

        })
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Settings</Text>
                <Button
                    title="Choose Image"
                    onPress={this.handleChoosePhoto}
                />
            </View>
        );
    }
}

const mapStateToProps = ({ imageUploadReducer }) => ({
    isUploading: imageUploadReducer.isUploading,
    image: imageUploadReducer.image
})
export default connect(mapStateToProps, { uploadImage })(Settings);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
