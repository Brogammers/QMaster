import React from "react";
import {Text, TouchableOpacity} from 'react-native';
import Image from 'react-native-remote-svg';
import Restaurant from '../assets/images/Restaurant.svg';

interface CategoryProps{
    Img: any,
    Title: String,
}

export default function Category(props: CategoryProps){
    const {Img, Title} = props;
    return (
        <TouchableOpacity className="flex items-center justify-center w-[31%] h-24 bg-white rounded-2xl mb-2.5 ">
            <Image source={Img}/>
            <Text>{Title}</Text>
        </TouchableOpacity>
    )
}