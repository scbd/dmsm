
import type { cibFlickr } from '@coreui/icons';
<template>
        <h4>Sites <CBadge color="primary">{{sitesCount}}</CBadge></h4>
    <CTable v-if="!showSite" class="down" striped hover>
        <CTableHead color="dark">
            <CTableRow>
            <CTableHeaderCell scope="col" width="5%">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Url</CTableHeaderCell>
            <CTableHeaderCell scope="col">Published</CTableHeaderCell>
            <CTableHeaderCell scope="col" width="10%">&nbsp;</CTableHeaderCell>
            </CTableRow>
        </CTableHead>
        <CTableBody >

            <CTableRow @click="selectSite(i)" v-for="(site,i) in sites || []" :key="i" >
                <CTableHeaderCell scope="row" >{{i}}</CTableHeaderCell>
                <CTableDataCell>{{site.name || i}}</CTableDataCell>
                <CTableDataCell>{{ getHost(site)}}</CTableDataCell>
                <CTableDataCell>{{site.published? 'Published': 'Pre-Published'}}</CTableDataCell>
                <CTableDataCell @click="getHost(i)" class="pointer"><Icon name="edit"/></CTableDataCell>
            </CTableRow>

        </CTableBody>
    </CTable>
    <SiteConfig v-if="showSite" @close-site="closeSite" :config="selectedSite" />

</template>
<script setup>
import {  useConfigStore } from "~/stores/config";

const configStore   = useConfigStore();
const route         = useRoute();
const multiSiteIdentifier = computed(()=>route?.params?.multiSiteIdentifier)
const config        = computed(()=>configStore.getMultiSite(multiSiteIdentifier.value).config);
const sites         = computed(()=>configStore.getMultiSite(multiSiteIdentifier.value).sites);
const sitesCount    = computed(()=>Object.keys(sites.value).length);
const selectedSite  = ref(null);
const showSite      = computed(()=>selectedSite.value !== null);

function selectSite(site){
    selectedSite.value = configStore.getSite(multiSiteIdentifier.value, site);
}

function getHost(site){
    const baseHost = config.value?.baseHost;

    return site.host? site.host : `https://${site.siteCode}.${baseHost}`;
}

function closeSite(){
    selectedSite.value = null;
}
</script>
<style scoped>
.pointer{
    cursor: pointer;
}

.down {
    --fadeDown-distance: -1rem;
    animation: fadeDown .25s;
}

@keyframes fadeDown {
    0% {
        transform: translate(0, var(--fadeDown-distance));
        opacity: 0;
    }

    100% {
        transform: translate(0,0);
        opacity: 1;
    }
}


</style>
