import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { MonoText } from '../components/StyledText'
import { commonStyles } from '../utils/styles'
import API, { FeatureType } from '../utils/api/fakeApi'
import { themeColors } from '../utils/consts'

interface IFeature {
    featureType: FeatureType
}

interface FeatureColors {
    bgColor: string,
    textColor: string
}

const Feature = ({ featureType }: IFeature) => {

    function getFeatureColors(type: FeatureType): FeatureColors {
        if (type === FeatureType.EXTRA) {
            return {
                bgColor: themeColors.extraFeature,
                textColor: '#fff'
            }
        } else if (type === FeatureType.MINIMUM) {
            return {
                bgColor: themeColors.minimumFeature,
                textColor: '#000'
            }
        }
        return {
            bgColor: 'black',
            textColor: '#fff'
        }
    }

    return (
        <View style={[styles.featureTypeContainer, { backgroundColor: getFeatureColors(featureType).bgColor}]}>
            <Text style={[styles.featureTypeText, { color: getFeatureColors(featureType).textColor }]}>
                {featureType}
            </Text>
        </View>
    )
}

const DetailsScreen = () => (
    <View>
        <Text>
            This iOS app is bundled with<MonoText style={commonStyles.highLighted}>expo</MonoText>
        </Text>
        <Text>
            It has the following features:
        </Text>
        <View style={[styles.cardContainer]}>
            {
                API.getAllFeatures().map(feature => (
                    <View style={[styles.featureContainer]} key={feature.id}>
                        <Text>
                            {feature.featureName}
                        </Text>
                        <Feature featureType={feature.type} />
                    </View>
                ))
            }
        </View>
    </View>
)

const styles = StyleSheet.create({
    featureTypeContainer: {
        padding: 4,
        borderRadius: 6,
    },
    featureTypeText: {
        color: '#fff',
        fontWeight: "600"
    },
    cardContainer: {
        marginVertical: 10,
    },
    featureContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        borderRadius: 20,
        backgroundColor: '#fff',
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.215,
        shadowRadius: 3.84,

        elevation: 5,
    }
})

export default DetailsScreen