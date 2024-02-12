export default defineNuxtConfig({
    runtimeConfig : {
        G_I18N_KEY:'',//process.env.NUXT_G_I18N_KEY,
        gI18nKey:'',
        validationKey:'',
        encryptionKey: '',
        public:{
            env: '',
            isLocalHost: '',
            baseHost:'',
            gaiaApi: '',
            ACCOUNTS_HOST_URL : '',
            API_URL           : '',
            TAG               : '',
            COMMIT            : '',
            auth : {
                // accountsHostUrl : process.env.NUXT_PUBLIC_ACCOUNTS_HOST_URL,
                redirect: {
                    login:  `/signin`,
                    logout: `/logout`,
                    callback: false,
                    home: '/'
                },
                name: "scbd-iframe-session",
                stratagey:'ScbdIframeAuthStrategy',
                strategies: {
                    ScbdIframeAuthStrategy: {
                        token: {
                            global: true,
                            prefix: '_token.',
                            property: 'authenticationToken',
                            type: 'Bearer',
                            name: 'Authorization',
                            required:true
                        },
                        endpoints: {
                            logout: false,
                            login: {
                                url: `/api/v2013/authentication/token`,
                                method: 'post'
                            },
                            user: {
                                url: `/api/v2013/authentication/user`,
                                method: 'get'
                            }
                        },
                        user: {
                            property: false,
                            autoFetch: true
                        },
                    }
                },
            },
            socketIo: {
                name: 'SCBD',
                url: `/`,
                default: true,
            },
        }
    }
})