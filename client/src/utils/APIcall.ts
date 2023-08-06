export const baseURL = "http://localhost:4000/";

type Props = {
    address: string;
    method: string;
    body?: any;
    credentials?: any;
}

export const apiCall = async (props: Props) => {
    const { address, method, body, credentials } = props;
    const response = await fetch(address, {
        method,
        body,
        credentials
    })
}