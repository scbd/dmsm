import { getUserToken } from "../utils";

export default defineNuxtPlugin({
  name: "auth",
  setup:async (nuxtApp) => {
    // Skip plugin when rendering error page
    if (nuxtApp.payload.error) {
        return {};
    }
    
    let user = ref<EUser>(null);
    const { authenticationToken:token, expiration } =  await getUserToken();  
    if(token){
        user.value  = await authUser(token);

    }
    consola.warn('token',false)
    const loggedIn: any = computed(() =>{
        return !!user.value?.isAuthenticated
    });
    const reset = ()=>{
        user.value = undefined;
        useAuth().user = undefined;
        useAuth().expiration = undefined;
        useAuth().token = undefined;
    }
  /**
   * Add global route middleware to protect pages using:
   * 
   * definePageMeta({
   *  auth: true
   * })
   */
  // 

  addRouteMiddleware(
    "auth",
    async (to) => {
      consola.info(to)
      if (to.meta.auth){
        if(loggedIn.value == false) {
            await authRedirectToLogin(to.path)
            return;
        }
        else{
          const { checkUserAccess } = useSecurity()
          const userCanAccess = await checkUserAccess({...to.meta, path:to.path});
          if(!userCanAccess){
              return navigateTo('/page403');
          }
        }
      }
    },
    { global: true }
  );

  const currentRoute = useRoute();

  if (process.client) {
    watch(loggedIn, async (loggedIn) => {
      if (!loggedIn && currentRoute.meta.auth) {
        await authRedirectToLogin(currentRoute.path);
      }
    });
  }
  
  if (loggedIn.value) {
    await navigateTo(currentRoute.path  || "/");
  }

  const hasScope = (scope:string)=>{
    if(user.value?.isAuthenticated){
        return user.value.roles.map(e=>e.toLowerCase()).includes(scope.toLowerCase())
    }
    return false;
  }

  return {
    provide: {
      auth: {
        loggedIn,
        expiration,
        user,
        token,
        reset,
        hasScope
      },
    },
  };
}});