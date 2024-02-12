<template>
    <h3>{{env}}</h3>
    <hr>
    <CCard >
        <CCardHeader>
            Control Panel
        </CCardHeader>
        <CCardBody>
            <!-- <CButton @click="reload" color="secondary">Reload</CButton> -->
        </CCardBody>
    </CCard>
                
    <hr>
    <div v-for="(mSite,i) in multiSites || []" :key="i" class="my-3">
        <!-- <NuxtLink   :to="goTo(mSite)" class="text-decoration-none"> -->
            <CCard >
                <CCardHeader>
                    <span class="float-end fs-5 text-muted">{{mSite?.config?.description}}</span>
                    <h2>{{mSite?.config?.name}} </h2> 
                </CCardHeader>
                <CCardBody>
                    <!-- <CCardTitle class="text-decoration-none">{{mSite?.config?.name}}</CCardTitle> -->
                    <!-- <CCardText class="text-decoration-none">{{mSite?.config?.description}}</CCardText> -->
                    <CCardText class="text-decoration-none">
                        <CButton @click="reload(mSite)" color="secondary">Reload</CButton>
                        <hr>
                        Sites: <CBadge color="secondary">{{sitesCount(mSite)}}</CBadge>
                    </CCardText>
                </CCardBody>
            </CCard>
        <!-- </NuxtLink> -->
    </div>
    <hr>

</template>
<script setup>



const configStore = useConfigStore();
const route = useRoute();

const config = computed(()=>configStore.getMultiSite(route.params.multiSiteIdentifier).config);
const multiSites = computed(()=>configStore.multiSites);
const  env = computed(()=>configStore.env);

function goTo(mSite){
   
    const { multiSiteCode } = mSite.config

    consola.warn(`/${env.value}/${multiSiteCode}`)
    return `/${env.value}/${multiSiteCode}`
    return {
        path: `/${env}/${multiSiteCode}`
    }
}

function sitesCount(mSite){
    return Object.keys(mSite.sites).length;
}

function reload(mSite){
    const { multiSiteCode } = mSite.config
    const method  = 'POST';
    const headers = getBaseHeaders();
    const body = { env:env.value, multiSiteCode }
    
    consola.warn('reload')

    return $fetch(`/api/${env.value}/${multiSiteCode}/reload`, { method, body,headers });
    // consola.warn('reload')
}
</script>
