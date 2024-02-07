<template>
    <h3>{{env}}</h3>
    <hr>
    <div v-for="(mSite,i) in multiSites || []" :key="i" class="my-3">
        <NuxtLink   :to="goTo(mSite)" class="text-decoration-none">
            <CCard >
                <CCardBody>
                    <CCardTitle class="text-decoration-none">{{mSite?.config?.name}}</CCardTitle>
                    <CCardText class="text-decoration-none">{{mSite?.config?.description}}</CCardText>
                    <CCardText class="text-decoration-none">Sites: <CBadge color="secondary">{{sitesCount(mSite)}}</CBadge></CCardText>
                </CCardBody>
            </CCard>
        </NuxtLink>
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
    return {
        path: `/${env}/${multiSiteCode}`
    }
}

function sitesCount(mSite){
    return Object.keys(mSite.sites).length;
}
</script>
