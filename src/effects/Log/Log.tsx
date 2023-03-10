import {useEffect, useState} from "react";
import {CredentialResponse, PromptMomentNotification} from "google-one-tap";

export interface LogProps {
    client_id: string;
    onSuccess?: (response: any) => void;
    onFailure?: (response: any) => void;
    onReturn?: (response: any) => void;
    trigger?: boolean;
}

const Log   = (props: LogProps) => {

    const [ logged, setLogged ] = useState(false);

    const handleCredentialResponse = (response: CredentialResponse) => {
        setLogged(true);
        props.onSuccess && props.onSuccess(response);
    }

    useEffect(() => {

        if(props.trigger) {
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
    }, [props.trigger]);

    useEffect(() => {


            // @ts-ignore
            window.onGoogleLibraryLoad = () => {

                // @ts-ignore
                google.accounts.id.initialize({
                    client_id: props.client_id,
                    callback: handleCredentialResponse.bind(this),
                    auto_select: true,
                    cancel_on_tap_outside: false,
                });
                // @ts-ignore

            }
            if(document.getElementById('google-jssdk')) {
                // @ts-ignore
                google.accounts.id.initialize({
                    client_id: props.client_id,
                    callback: handleCredentialResponse.bind(this),
                    auto_select: true,
                    cancel_on_tap_outside: false,
                });

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

    return [logged];

}
export default Log;