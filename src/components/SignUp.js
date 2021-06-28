import React, {Component} from 'react';
import Auth from '@aws-amplify/auth';
import { Text, StyleSheet, View, TextInput, Button, SafeAreaView, StatusBar, ActivityIndicator, Modal } from 'react-native';
import { ToolTip } from 'react-native-elements';
import { Formik, Field } from 'formik';
import * as yup from 'yup'
import InputComp from './InputComp';

export default class SignUp extends Component {

    constructor(props){
        super(props);

        this.state={
            loading: false,
            modalVisible: false,
            username: '',
            redirect: false
        }
    }

    handleSubmit(values, username) {
        // separate into signUp and verifyUser functions 
            try {

                this.setState({
                    loading: true
                });

                if(username){
                    Auth.confirmSignUp(username, values.confirmCode)
                    .then(() => {
                        this.props.navigation.navigate('Home')
                    })
                }
                else {
                    Auth.signUp({
                        username: values.email,
                        password: values.password,
                        attributes: {
                            email: values.email,
                            name: `${values.fname} ${values.lname}`
                        }
                    })
                }
            }
            catch(err) {
                console.log(err)
            }

            if(username){
                this.setState({
                    loading: false
                });
            }
            else{
                this.setState({
                    loading: false,
                    modalVisible: true,
                    username: values.email
                });
            }

    }

    render() {
        const signUpValidationSchema = yup.object().shape({
            fName: yup
                .string()
                .required('First name is required'),
            lName: yup
                .string()
                .required('Last name is required'),
            email: yup
                .string()
                .email('Valid email required')
                .required('Email is required'),
            password: yup
                .string()
                .matches(/\w*[a-z]\w*/,  "Password must have a small letter")
                .matches(/\w*[A-Z]\w*/,  "Password must have a capital letter")
                .matches(/\d/, "Password must have a number")
                .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Password must have a special character")
                .min(8, ({ min }) => `Password must be at least ${min} characters`)
                .required('Password is required'),
            confirmPassword: yup
                .string()
                .oneOf([yup.ref('password')], 'Passwords do not match')
                .required('Passwords must match')
        }) 
    
    // need another schema for the confirmation code for non valid code, non 6-digit code or no code input
        return(
            <React.Fragment>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView>
                    <View>
                        <Text> Sign Up Screen </Text>
                        <Formik 
                            initialValues={{
                                fName: '',
                                lName: '',
                                email: '',
                                password: '',
                                confirmPassword: ''
                            }}
                            onSubmit={values => this.handleSubmit(values)}
                            validationSchema={signUpValidationSchema}
                        >
                            {({ handleSubmit, isValid}) => (
                                <>
                                    <Field
                                        component={InputComp}
                                        name="fName"
                                        secondComp="lName"
                                        placeholder="First Name"
                                    />
                                    <Field
                                        component={InputComp}
                                        name="lName"
                                        secondComp="email"
                                        placeholder="Last Name"
                                    />
                                    <Field 
                                        component={InputComp}
                                        name="email"
                                        secondComp="password"
                                        placeholder="Email Address"
                                        keyboardType="email-address"
                                    />
                                    <Field 
                                        component={InputComp}
                                        name="password"
                                        secondComp="confirmPassword"
                                        placeholder="Password"
                                        secureTextEntry                                     
                                    />
                                    <Field 
                                        component={InputComp}
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                        secureTextEntry
                                    />
                                    {!this.state.loading 
                                        ? <Button
                                            onPress={handleSubmit}
                                            title="Submit"
                                            disabled={!isValid}
                                        /> 
                                        : <ActivityIndicator size="large"/>
                                    }
                                </>
                            )}
                        </Formik>
                    </View>
                </SafeAreaView>
                <Modal
                    visible={this.state.modalVisible}
                    animationType="fade"
                    transparent={true}
                    style={styles.modal}
                >
                    <View style={styles.modalContainer}>
                        <Text> An email has been sent to you, put the confirmation code below: </Text>
                        <Formik
                            initialValues={{confirmCode:''}}
                            onSubmit={values => this.handleSubmit(values, this.state.username)}
                        >
                            {({ handleSubmit, isValid}) => (
                                <>
                                    <Field 
                                        component={InputComp}
                                        name="confirmCode"
                                        placeholder="Confirmation Code"
                                    />
                                    {!this.state.loading 
                                    ? <Button
                                        onPress={handleSubmit}
                                        title="Submit Code"
                                        disabled={!isValid}
                                    />
                                    : <ActivityIndicator size="small"/>
                                    }
                                </>

                            )}
                        </Formik>
                    </View>
                </Modal>
            </React.Fragment>
        )
    }
}

const styles = StyleSheet.create({
    modalContainer:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: '10px'
    },
    modal:{
        width: '200px',
        height: '400px',
        backgroundColor: 'white'
    }
})