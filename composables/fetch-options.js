
export const onRequest =  ({ request, options }) => {
    const auth = useAuth();
    // Set the request headers
    options.headers = options.headers || {}
    options.headers.authorization = '...'

    consola.warn('auth',auth)
}

export const getBaseHeaders = () => {
    const auth = useAuth();

    const authorization = auth?.token? `Bearer ${auth.token}` : undefined;
    

    return { authorization }
}