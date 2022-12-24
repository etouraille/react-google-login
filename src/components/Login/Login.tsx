import React, {useEffect} from "react";
import {MouseEventHandler} from "react";
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';

const Login = ({ client_id , onSuccess}) => {


    const handleCredentialResponse = (response: CredentialResponse) => {
        if(typeof onSuccess === 'function') {
            onSuccess(response);
        }
    }

    const signin = () => {

        // @ts-ignore
        google.accounts.id.prompt((notification: PromptMomentNotification) => {
                console.log(notification);
        });

    }


    useEffect(() => {

        // @ts-ignore
        window.onGoogleLibraryLoad = () => {
            // @ts-ignore
            google.accounts.id.initialize({
                client_id: client_id,
                callback:  handleCredentialResponse.bind(this), // Whatever function you want to trigger...
                auto_select: true,
                cancel_on_tap_outside: false,
            });
        };


        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement('script');
            js.id = id;
            js.src = "https://accounts.google.com/gsi/client?onload=googleSDKLoaded";
            fjs?.parentNode?.insertBefore(js, fjs);
        }(document, 'script', 'google-jssdk'));

    }, [client_id]);

    return (
        <button className="btn" onClick={signin}></button>
    )
}
export default Login;