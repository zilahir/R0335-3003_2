import uuid from 'react-native-uuid';

export enum FeatureType {
    EXTRA = 'extra',
    MINIMUM = 'minium'
}

export type Features = {
    id: string,
    featureName: string,
    description: string,
    type: FeatureType,
}

const fakeApi = {
    features: [
        { id: uuid.v4().toString(), featureName: 'React Navigation', description: 'Navigatin between screens, using bottom navigator', type: FeatureType.MINIMUM},
        { id: uuid.v4().toString(), featureName: 'Sign In', description: 'The application mocks a Sign In feature, using a fake API', type: FeatureType.MINIMUM},
        { id: uuid.v4().toString(), featureName: 'Sign Up', description: 'The application mocks a Sign Up feature, using a fake API', type: FeatureType.MINIMUM },
        { id: uuid.v4().toString(), featureName: 'Navigation Drawer', description: 'The application has a drawer navigator', type: FeatureType.EXTRA},
        { id: uuid.v4().toString(), featureName: 'Redux', description: 'The app uses redux to mock fake API behaviour', type: FeatureType.EXTRA},
    ],
    getAllFeatures: (): ReadonlyArray<Features> => fakeApi.features
}

export default fakeApi