import React from "react";
import {useEffect} from "react";
import {PromptMomentNotification} from "google-one-tap";

export interface UnlogProps {
    onSuccess ?: (response: any) => void;
    onFailure ?: (response: any) => void;
    client_id ?: string;
    content?: (data: any) => React.ReactNode;
}

const UnlogGoogle = (props: UnlogProps) => {

    const unlog = () => {
        try {
            // @ts-ignore
            google.accounts.id.disableAutoSelect();
            props.onSuccess && props.onSuccess(true);
        } catch (e) {
            props.onFailure && props.onFailure(e);
        }
    }

    useEffect(() => {
            (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement('script');
            js.id = id;
            js.src = "https://accounts.google.com/gsi/client?onload=googleSDKLoaded";
            fjs?.parentNode?.insertBefore(js, fjs);
        }(document, 'script', 'google-jssdk'));
    }, []);

    return (
        <div>
            { props.content ? props.content(unlog) : <button onClick={unlog}>Unlog</button> }
        </div>
    )
}
export default UnlogGoogle;