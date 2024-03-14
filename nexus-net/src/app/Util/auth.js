import {
    CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserAttribute,
} from "amazon-cognito-identity-js"
import {cognitoConfig} from "../cognitoConfig"

const userPool = new CognitoUserPool({
    UserPoolId: cognitoConfig.UserPoolId, ClientId: cognitoConfig.ClientId,
})

export function signUp(username, email, password) {
    const emailAttribute = new CognitoUserAttribute({
        Name: "email", Value: email
    });
    return new Promise((resolve, reject) => {
        userPool.signUp(username, password, [emailAttribute], [], (err, result) => {
            if (err) {
                reject(err)
                return
            }
            resolve(result.user)
        })
    })
}

export function confirmSignUp(username, code) {
    return new Promise((resolve, reject) => {
        const cognitoUser = new CognitoUser({
            Username: username, Pool: userPool,
        })

        cognitoUser.confirmRegistration(code, true, (err, result) => {
            if (err) {
                reject(err)
                return
            }
            resolve(result)
        })
    })
}

export function signIn(username, password) {
    // Sign in implementation
}

export function forgotPassword(username) {
    // Forgot password implementation
}

export function confirmPassword(username, code, newPassword) {
    // Confirm password implementation
}

export function signOut() {
    // Sign out implementation
}

export function getCurrentUser() {
    // Get current user implementation
}

export function getSession() {
    // Get session implementation
}