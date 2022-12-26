import {useEffect, useState} from "react";
import {PromptMomentNotification} from "google-one-tap";

export interface UnlogProps {
    onSuccess?: (response: any) => void;
    onFailure?: (response: any) => void;
    trigger?: boolean;
}

const Unlog = (props: UnlogProps) => {

    const [ unlog, setUnlog ] = useState(false);

    useEffect(() => {
        if(props.trigger) {
            // @ts-ignore
            window.onGoogleLibraryLoad = () => {
                try {
                    // @ts-ignore
                    google.accounts.id.disableAutoSelect();
                    setUnlog(true);
                    props.onSuccess && props.onSuccess(true);
                } catch (e) {
                    props.onFailure && props.onFailure(e);
                }
            };

            (function (d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {
                    return;
                }
                js = d.createElement('script');
                js.id = id;
                js.src = "https://accounts.google.com/gsi/client?onload=googleSDKLoaded";
                fjs?.parentNode?.insertBefore(js, fjs);
            }(document, 'script', 'google-jssdk'));
        }
    },[props.trigger]);

    return [unlog];
};
export default Unlog;