import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RootStackParams } from '../navigation/Navigation';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { MovieDetails } from '../components/MovieDetails';
import Icon from 'react-native-vector-icons/Ionicons';

const screenHeight = Dimensions.get('screen').height

interface Props extends StackScreenProps<RootStackParams, 'Detail'> {}

export const DetailScreen = ({route, navigation}:Props) => {
    const movie = route.params
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

    const {isLoading, movieFull, cast} = useMovieDetails(movie.id)

    console.log(movieFull)

    return (
        <ScrollView>
            <View style={style.imageContainer}>
                <View style={style.imageBorder}>
                    <Image
                        source={{uri}}
                        style={style.posterImage}
                    />
                </View>
            </View>
            <View style={style.marginContainer}>
                <Text style={style.subTitle}>{movie.original_title}</Text>
                <Text style={style.title}>{movie.title}</Text>
            </View>

            {
                isLoading ? 
                    <ActivityIndicator size={33} color="grey" style={{marginTop: 20}} />
                :
                    <MovieDetails movieFull={movieFull!} cast={cast} />
            }

            {/* Boton para volver */}
            <TouchableOpacity 
                style={style.backButotn}
                onPress={() => navigation.goBack()}
            >
                <Icon 
                    name="arrow-back-outline"
                    color="white"
                    size={60}
                />
            </TouchableOpacity>
            
        </ScrollView>
    )
}

const style = StyleSheet.create({
    imageContainer: {
        width: '100%',
        height: screenHeight * 0.7,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,
        elevation: 9,
        borderBottomEndRadius: 25,
        borderBottomStartRadius: 25
    },
    imageBorder: {
        flex: 1,
        overflow: 'hidden',
        borderBottomEndRadius: 25,
        borderBottomStartRadius: 25
    },
    posterImage: {
        flex: 1,
    },
    marginContainer: {
        marginHorizontal: 20,
        marginTop: 20
    },
    subTitle:{
        fontSize: 16,
        opacity: 0.8
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold'
    },
    backButotn:{
        position: 'absolute',
        zIndex: 999,
        elevation: 9,
        top: 10,
        left: 5
    }
})