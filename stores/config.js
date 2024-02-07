import { defineStore } from 'pinia'
import clone from 'lodash.clonedeep'

const actions = { setSite,addMeta, getSite, setEnv, setAll, getMultiSite, setMultiSiteConfig, saveEnv  }
const getters = { environments,multiSites, multiSiteConfigs }

export const useConfigStore = defineStore('config', { state, getters, actions,  persist: true, })

const initState = {
    env : 'dev',
    dev : {},
    stg : {}
}

function state(){ return initState }

function setAll(allData){

    for (const env in allData)
        this.$patch({ [env]: allData[env]});

    return this;
}

async function setMultiSiteConfig(env, mSite, config){
    const mSiteData = this[env][mSite];
    const envData   = this[env];

    this.$patch({ [env]: { [mSite]: this.addMeta(mSiteData) }});
    this.$patch({ [env]: this.addMeta(envData)});
    this.$patch({ [env]: { [mSite]: { config: this.addMeta(config) }  }});

    await this.saveEnv(env);

    return this;
}

async function setSite(env, mSite, siteName, siteData){
    const sites = this[env][mSite].sites;
    const mSiteData = this[env][mSite];
    const envData   = this[env];

    this.$patch({ [env]: { [mSite]: this.addMeta(mSiteData) }});
    this.$patch({ [env]: this.addMeta(envData)});
    this.$patch({ [env]: { [mSite]: { sites: this.addMeta(sites)}}});
    this.$patch({ [env]: { [mSite]: { sites: { [siteName]: this.addMeta(siteData) }}}});

    await this.saveEnv(env);

    return this;
}

function getMultiSite(site){
    const multiSite = clone(this[this.env][site]);

    delete multiSite.meta;
    delete multiSite.sites.meta

    return multiSite;
}
function getSite(mSite, site){
    const sites = clone(this[this.env][mSite].sites);

    delete sites.meta;

    return sites[site];
}
function multiSites(){
    const multiSites = clone(this[this.env]);

    delete multiSites.meta;

    return multiSites;
}

function multiSiteConfigs(){
    const msMap = {};

    for (const key in this[this.env])
        if(key !== 'meta')
            msMap[key] = this[this.env][key].config;

    return msMap;
}

function setEnv(env){

    // if(!['dev', 'stg', 'prod'].includes(env)) throw new Error(`useConfigStore.setEnv -> State ${env} is not one of ['dev', 'stg', 'prod']`);

    this.$patch({ env });

    return this;
}

async function saveEnv(env){
    const method = 'POST';
    const body = this[env];
    const headers     = getBaseHeaders();
    return $fetch(`/api/config/${env}`, { method, body,headers });
}

function addMeta(data){
    const auth = useAuth();

    if(!data?.meta) data.meta = {};
    if(!data?.meta?.created) data.meta.created = new Date();
    if(!data?.meta?.createdBy?.email) data.meta.createdBy = { email: auth?.user?.value?.email, uid: auth?.user?.value?.userID};
    
    data.meta.updated    = new Date();
    data.meta.updatedBy = { email: auth?.user?.value?.email, uid: auth?.user?.value?.userID};


    return data
}


function environments(){

    const envs = clone(this.$state);

    delete envs.env;

    for (const key in envs)
        if(!Object.keys(envs[key]).length) delete envs[key];


    return Object.keys(envs)
}





