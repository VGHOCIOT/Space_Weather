import React, {Component} from 'react';
import {Auth} from 'aws-amplify';
import { Text, StyleSheet, View, TextInput, Button, SafeAreaView, StatusBar, ActivityIndicator, Modal } from 'react-native';
import { ToolTip } from 'react-native-elements';
import { Formik, Field } from 'formik';
import * as yup from 'yup'
import InputComp from './InputComp';

export default class LogIn extends Component {

    constructor(props){
        super(props);

        this.state={
            loading: false,
            username: '',
        }
    }

    handleSubmit(values){
        console.log(values)
        Auth.signIn(values.email, values.password)
        .then(() => {
            this.props.navigation.navigate('Home')
        })
    }

    goToSignUp(){
        this.props.navigation.navigate('SignUp')
    }

    render(){
        const signUpValidationSchema = yup.object().shape({
            email: yup
                .string()
                .email('Valid email required')
                .required('Email is required')
        })

        return(
            <React.Fragment>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView>
                    <View>
                        <Text> Login Screen </Text>
                        <Formik 
                            initialValues={{
                                email: '',
                                password: ''
                            }}
                            onSubmit={values => this.handleSubmit(values)}
                            validationSchema={signUpValidationSchema}
                        >
                            {({ handleSubmit, isValid}) => (
                                <>
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
                        <View style={styles.bottomText} >
                            <Text> Don't have an account? </Text>
                            <Text 
                                onPress={() => {this.goToSignUp()}} 
                                style={styles.url}
                            >
                                Register
                            </Text>
                        </View>

                    </View>
                </SafeAreaView>
            </React.Fragment>
        )
    }
}

const styles = StyleSheet.create({
    bottomText:{
        flexDirection: 'row',
        justifyContent: 'center'
    },
    url:{
        color: 'blue'
    }
})