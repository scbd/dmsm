import auth from 'aspnet-formsauthentication';

export const ANONYMOUS = Object.freeze({ id: 1, anonymous: true, roles: [ 'Everyone' ], scopes: [] });

const { validationKey, encryptionKey }  = useRuntimeConfig()

auth.initialize({ validationKey, encryptionKey });

export default defineEventHandler(async (event) => {
    const authorization = getHeader(event, 'authorization');
    const Authorization = getHeader(event, 'Authorization');

    const user = await getUser(event);

    user.isAnon  = user?.anonymous;
    user.isAdmin = user?.roles?.includes('Administrator');

    console.log('=================', user)
    event.context.user = user;
})

async function getUser(event){
    const authorization = getHeader(event, 'authorization');

    if(!authorization)
        return { ...ANONYMOUS };

    const token  = authorization.replace(/^(Ticket|Token|Bearer)\s+/, '');
    const ticket = tryDecrypt(token);

    if(!ticket || !(ticket.version==2 || ticket.version==100) || ticket.expiration<new Date())
        return { ...ANONYMOUS };

    if(ticket.version==2)
        ticket.userData = '{ "scopes": [ "all" ] }';

    const headers = { authorization: `Token ${token}` };


    const { userID: id, anonymous, email, name, roles,userGroups,government} = await $fetch('https://accounts.cbddev.xyz/api/v2013/authentication/user', { method: 'GET', headers});


    const ticketData = JSON.parse(ticket.userData);
    const { scopes } = ticketData;

    delete ticketData.scopes;

    return {  id, anonymous:!!anonymous, email, name, roles, userGroups, government, scopes, ticketData  }; 
}

function tryDecrypt (token) {
    try { return auth.decrypt(token); }
    catch(error) { return null; }
}
