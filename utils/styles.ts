import { StyleSheet } from 'react-native'
import hexToRgba from 'hex-to-rgba'

export const commonStyles = StyleSheet.create({
    highLighted: {
        backgroundColor: hexToRgba('00c851', 0.5),
        marginHorizontal: 10,
        marginVertical: 10
    }
})

