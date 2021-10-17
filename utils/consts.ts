import hexToRgba from 'hex-to-rgba';
import { User } from '../store/actions/createNewUser';

export const themeColors = {
    extraFeature: hexToRgba('ff6961', 1),
    minimumFeature: hexToRgba('fdfd96', 1),
    textInputBgColor: hexToRgba('f1f1f1', 1)
}

export const DEMO_USER: User = {
    userId: 'demo1234',
    userName: 'demo',
    password: 'demo1234'
}