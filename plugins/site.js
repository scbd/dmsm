import {  useConfigStore } from "~/stores/config";

export default defineNuxtPlugin({
    name:'site',
    dependsOn: ['auth'],
    setup:async (nuxtApp) => {
    // const route       = useRoute();
    const configStore = useConfigStore(nuxtApp.$pinia);
    const headers     = getBaseHeaders();

    const { data } = await useFetch('/api/config', { method: 'GET', headers });


    await configStore.setAll(data.value);

}});