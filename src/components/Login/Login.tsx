import React, {useEffect, useState} from "react";
import {MouseEventHandler} from "react";
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';

declare const google : any

export interface ButtonProps {
    client_id: string;
    onSuccess?: (response: any) => void;
    onFailure?: (response: any) => void;
    onReturn?: (response: any) => void;
    content?: (data: any) => React.ReactNode;
}

const Login = (props: ButtonProps) => {

    const handleCredentialResponse = (response: CredentialResponse) => {
        if(typeof props.onSuccess === 'function') {
            props.onSuccess(response);
        }
    }

    const signin = () => {

        // @ts-ignore
        google.accounts.id.prompt((notification: PromptMomentNotification) => {
                if (notification.getDismissedReason() === 'credential_returned') {
                    props.onReturn && props.onReturn(notification);
                }
                if (notification.isNotDisplayed()) {
                    props.onFailure && props.onFailure(notification);
                }
        });
    }


    const setGoogle = () => {
        google.accounts.id.initialize({
            client_id: props.client_id,
            callback: handleCredentialResponse.bind(this), // Whatever function you want to trigger...
            auto_select: true,
            cancel_on_tap_outside: false,
        });
        let googleLoginDiv = document.getElementById('g_id_signin');
        if (!props.content) {
            // @ts-ignore
            google.accounts.id.renderButton(googleLoginDiv, {
                type: "standard",
                theme: "outline",
                size: "large"
            });
        }
    }

    useEffect(() => {



        // @ts-ignore


            // @ts-ignore
            window.onGoogleLibraryLoad = () => {
                setGoogle();
            };

            if(document.getElementById('google-jssdk')) {
                setGoogle();
            }

            (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement('script');
            js.id = id;
            js.src = "https://accounts.google.com/gsi/client?onload=googleSDKLoaded";
            fjs?.parentNode?.insertBefore(js, fjs);
        }(document, 'script', 'google-jssdk'));

    }, [props.client_id]);

    return (
        <>

            { props.content ? props.content(signin) : <div id="g_id_signin" onClick={signin}></div> }
        </>
    )
}
export default Login;