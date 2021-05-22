import React, {Component} from 'react';
import { Text, TextInput, StyleSheet } from 'react-native';

export default class InputComp extends Component {
    // not sure if these are necessary
    static defaultProps = {
        field:{
            name: '',
            secondComp: '',
            onBlur: {},
            onChange: {},
        },
        form:{
            errors: {},
            touched: false,
            setFieldTouched: {}
        }
    }

    constructor(props){
        super(props);
    }

    render() {
        const hasError = this.props.form.errors[this.props.field.name] && this.props.form.touched[this.props.field.name];

        return(
            <React.Fragment>
                <TextInput
                    onChangeText={(text) => this.props.field.onChange(this.props.field.name)(text)}
                    onBlur={() => {
                        this.props.form.setFieldTouched(this.props.field.name)
                        this.props.field.onBlur(this.props.field.name)
                    }}
                    {...this.props}
                    // need to fix this section to allow for "Enter" key press to start with next field

                    // returnKeyType="next"
                    // returnKeyLabel="next"
                    // ref={ref => this.props.field.name = ref}
                    // onSubmitEditing={() => this.props.field.secondComp.focus()}
                />
                {hasError && <Text>{this.props.form.errors[this.props.field.name]}</Text>}
            </React.Fragment>
        )
    }
}