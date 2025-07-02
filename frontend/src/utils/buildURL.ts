const buildURL = (path:string) =>{
    const baserAPIURL =  import.meta.env.VITE_API_URL;
    return new URL(path,baserAPIURL).toString();
}

export default buildURL;