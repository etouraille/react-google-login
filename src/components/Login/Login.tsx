import React, {useEffect, useState} from "react";
import {MouseEventHandler} from "react";
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';

export interface ButtonProps {
    client_id: string;
    onSuccess: (response: any) => void;
    title: string;
}

const Login = (props: ButtonProps) => {

    const [loaded, setLoaded] = useState(false);

    const handleCredentialResponse = (response: CredentialResponse) => {
        if(typeof props.onSuccess === 'function') {
            props.onSuccess(response);
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
                client_id: props.client_id,
                callback:  handleCredentialResponse.bind(this), // Whatever function you want to trigger...
                auto_select: true,
                cancel_on_tap_outside: false,
            });
            let googleLoginDiv = document.getElementById('g_id_signin');
            setLoaded(true);
            // @ts-ignore
            google.accounts.id.renderButton(googleLoginDiv, {
                type: "standard",
                theme: "outline",
                size: "large"
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

    }, [props.client_id, loaded]);

    return (
        <>
            <div
                id="g_id_signin"
                    onClick={signin}
            >
            </div>
        </>
    )
}
export default Login;