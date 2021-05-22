import { Auth } from 'aws-amplify';

async function SignIn() {
    try {
        const { user } = await Auth.signIn(username, password)
    } catch(error) {

    }
}