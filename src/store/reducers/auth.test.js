import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
    it('should return the inital state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'           
        });
    });

    it('Should store toke upon login', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        }, {type: actionTypes.AUTH_SUCCESS,
            idToken: 'asdasd',
            userId: 'asd'
        })).toEqual({
            token: 'asdasd',
            userId: 'asd',
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });

    it('SHould logout', () => {
        expect(reducer({
            token: 'asdasd',
            userId: 'asd',
            error: null,
            loading: false,
            authRedirectPath: '/'
        }, {
            type: actionTypes.AUTH_LOGOUT
        })).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        })
    })
});