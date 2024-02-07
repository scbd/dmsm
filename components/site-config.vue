<template>
    
    <CCard class="text-center">
        <CCardHeader class="">
            <div  @click.passive="openConfig=!openConfig" class="float-start mt-2 w-75 ">
                <h4 class="text-start">{{config.name}}</h4>
            </div>
            <CNav variant="tabs" class="justify-content-end  border-0">
                <CNavItem v-if="openConfig" @click.prevent="editJson=!editJson" >
                    <CNavLink  href="#" v-if="!editJson"> <Icon name="edit" class="fs-4"></Icon></CNavLink>
                    <!-- <CNavLink href="#" v-if="editJson"> <Icon name="eye" class="fs-4"></Icon></CNavLink> -->
                </CNavItem>

                <!-- <CNavItem @click.prevent="openConfig=!openConfig" >
                    <CNavLink href="#" v-if="openConfig"> <Icon name="arrow-down" class="fs-4"></Icon></CNavLink>
                    <CNavLink href="#" v-if="!openConfig"> <Icon name="arrow-up" class="fs-4"></Icon></CNavLink>
                </CNavItem> -->
            </CNav>
        </CCardHeader>
        <CCardBody class="down" v-if="editJson && openConfig">
            <div class="form-floating">
                <ControlJson5Edit v-model="config"/>
                <!-- <textarea class="form-control"  :id="`json-${config.multiSiteCode}`" style="height: 300px"  :value="jsonConfig">
                </textarea>
                <input type="hidden"    v-model="config"/>
            
                <label :for="`json-${config.multiSiteCode}`">JSON</label> -->
            </div>
        </CCardBody>
        <CCardBody class="down" v-if="!editJson && openConfig">
            
            <CContainer  fluid>
                <CRow class="align-items-start mb-3">
                    <CCol class="p-0">
                        <CCard >
                            <CCardHeader class="">
                                    <CCardTitle>General Info</CCardTitle>
                                </CCardHeader>
                            <CCardBody>

                                
                                <CListGroup flush>
                                    <CListGroupItem class="px-0">
                                        <div class="form-floating">
                                            <input type="text" class="form-control form-control-lg" :id="`configName-${config.multiSiteCode}`" v-model="config.name">
                                            <label :for="`configName-${config.multiSiteCode}`">Name</label>
                                        </div>
                                    </CListGroupItem>
                                    <CListGroupItem class="px-0">
                                        <div class="form-floating">
                                            <textarea class="form-control"  :id="`configDescription-${config.multiSiteCode}`" style="height: 100px"  v-model="config.description"></textarea>
                                            <label :for="`configDescription-${config.multiSiteCode}`">Description</label>
                                        </div>
                                    </CListGroupItem>
                                    <CListGroupItem class="px-0">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" :id="`configMultiSiteCode-${config.multiSiteCode}`" v-model="config.multiSiteCode">
                                            <label :for="`configMultiSiteCode-${config.multiSiteCode}`">Multi-site Code</label>
                                            <Icon v-if="config.multiSiteCode" name="copy" class="copy" @click="copyToClipboard(config.multiSiteCode)"/>
                                        </div>
                                    </CListGroupItem>
                                    <CListGroupItem class="px-0">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" :id="`configBaseHost-${config.multiSiteCode}`" v-model="config.baseHost">
                                            <label :for="`configBaseHost-${config.multiSiteCode}`">Base Host</label>
                                            <Icon v-if="config.baseHost" name="copy" class="copy" @click="copyToClipboard(config.baseHost)"/>
                                        </div>
                                    </CListGroupItem>      
                                    <CListGroupItem class="px-0">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" :id="`configBaseHostZoneId-${config.multiSiteCode}`" v-model="config.baseHostZoneId">
                                            <label :for="`configBaseHostZoneId-${config.multiSiteCode}`">Base Host Zone ID</label>
                                            <Icon v-if="config.baseHostZoneId" name="copy" class="copy" @click="copyToClipboard(config.baseHostZoneId)"/>
                                        </div>
                                    </CListGroupItem>                                  
                                    <!-- <CListGroupItem class="px-0">
                                        <div class="form-floating">
                                            <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
                                            <label for="floatingPassword">Password</label>
                                        </div>
                                    </CListGroupItem> -->
                                </CListGroup>
                            </CCardBody>

                        </CCard>
                    </CCol>
                    <CCol class="p-0">
                        <CCard >
                            <CCardHeader class="">
                                    <CCardTitle>Api Keys</CCardTitle>
                                </CCardHeader>
                            <CCardBody>
                                <CListGroup flush>
                                    <CListGroupItem class="px-0">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" :id="`configDrupalApiUser-${config.multiSiteCode}`" :value="config.drupalApiUser">
                                            <label :for="`configDrupalApiUser-${config.multiSiteCode}`">Drupal Api User</label>
                                            <Icon v-if="config.drupalApiUser" name="copy" class="copy" @click="copyToClipboard(config.drupalApiUser)"/>
                                        </div>
                                    </CListGroupItem>
                                    <CListGroupItem class="px-0">
                                        <div class="form-floating">

                                            <input type="text" class="form-control" :id="`configDrupalApiPass-${config.multiSiteCode}`" :value="config.drupalApiPass">

                                            <label :for="`configDrupalApiPass-${config.multiSiteCode}`">Drupal Api Password</label>
                                            <Icon v-if="config.drupalApiPass"  name="copy" class="copy" @click="copyToClipboard(config.drupalApiPass)"/>
                                        </div>
                                    </CListGroupItem>
                                    <CListGroupItem class="px-0">
                                        <div class="form-floating">

                                            <input type="text" class="form-control" :id="`configdrupalApiKey-${config.multiSiteCode}`" :value="config.drupalApiKey">

                                            <label :for="`configdrupalApiKey-${config.multiSiteCode}`">Drupal Api Key (translate page to drupal node)</label>
                                            <Icon v-if="config.drupalApiKey"  name="copy" class="copy" @click="copyToClipboard(config.drupalApiKey)"/>
                                        </div>
                                    </CListGroupItem>
                                    <CListGroupItem class="px-0">
                                        <div class="form-floating">

                                            <input type="text" class="form-control" :id="`configdrupalApiKey-${config.multiSiteCode}`" :value="config.drupalApiKey">

                                            <label :for="`configdrupalApiKey-${config.multiSiteCode}`">Drupal Api Key (translate page to drupal node)</label>
                                            <Icon v-if="config.drupalApiKey"  name="copy" class="copy" @click="copyToClipboard(config.drupalApiKey)"/>
                                        </div>
                                    </CListGroupItem>
                                </CListGroup>
                            </CCardBody>

                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
            <CRow class="align-items-start">
                    <CCol >
                        <CCard >
                            <CCardHeader class="">
                                    <CCardTitle>Database</CCardTitle>
                                </CCardHeader>
                            <CCardBody>
                                <CListGroup flush>
                                    <CListGroupItem class="px-0">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" :id="`configdataBaseName-${config.multiSiteCode}`" :value="config.dataBaseName">
                                            <label :for="`configdataBaseName-${config.multiSiteCode}`">Database Name</label>
                                            <Icon v-if="config.dataBaseName" name="copy" class="copy" @click="copyToClipboard(config.dataBaseName)"/>
                                        </div>
                                    </CListGroupItem>
                                    <CListGroupItem class="px-0">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" :id="`configdataBasePortNumber-${config.multiSiteCode}`" :value="config.dataBasePortNumber">
                                            <label :for="`configdataBasePortNumber-${config.multiSiteCode}`">Database Port</label>
                                            <Icon v-if="config.dataBasePortNumber" name="copy" class="copy" @click="copyToClipboard(config.dataBasePortNumber)"/>
                                        </div>
                                    </CListGroupItem>
                                    <CListGroupItem class="px-0">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" :id="`configdataBaseUserName-${config.multiSiteCode}`" :value="config.dataBaseUserName">
                                            <label :for="`configdataBaseUserName-${config.multiSiteCode}`">Database User Name</label>
                                            <Icon v-if="config.dataBaseUserName" name="copy" class="copy" @click="copyToClipboard(config.dataBaseUserName)"/>
                                        </div>
                                    </CListGroupItem>
                                    <CListGroupItem class="px-0">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" :id="`configdataBasePassword-${config.multiSiteCode}`" :value="config.dataBasePassword">
                                            <label :for="`configdataBasePassword-${config.multiSiteCode}`">Database Password</label>
                                            <Icon v-if="config.dataBasePassword" name="copy" class="copy" @click="copyToClipboard(config.dataBasePassword)"/>
                                        </div>
                                    </CListGroupItem>
                                    <CListGroupItem class="px-0">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" :id="`config.dataBaseHost-${config.multiSiteCode}`" :value="config.dataBaseHost">
                                            <label :for="`config.dataBaseHost-${config.multiSiteCode}`">Database Host</label>
                                            <Icon v-if="config.dataBaseHost" name="copy" class="copy" @click="copyToClipboard(config.dataBaseHost)"/>
                                        </div>
                                    </CListGroupItem>
                                </CListGroup>
                            </CCardBody>

                        </CCard>
                    </CCol>
            </CRow>
        </CCardBody>
        <CCardFooter v-if="openConfig">
            <!-- <CButton @click="save()" color="dark">Save</CButton> -->
            &nbsp;
            <CButton color="light" @click="close()">Close</CButton>
        </CCardFooter>
    </CCard>

</template>
<script setup>
import {  useConfigStore } from "~/stores/config";
const configStore = useConfigStore();
const   route    = useRoute();

const   props    = defineProps({  config: { type: Object } });
const { config:passedConfig } = toRefs(props);

const config = ref(passedConfig.value);

const editJson = ref(true);
const openConfig = ref(true);
const emit = defineEmits(['close-site'])
function copyToClipboard(text) {
    consola.warn(text)
    navigator.clipboard.writeText(text)
}

function save(){
    const { env, multiSiteIdentifier } = route.params;

    configStore.setSite(env, multiSiteIdentifier, config.value.siteCode, config.value);

    openConfig.value = false;
    close();
}

function close(){
    emit('close-site', true)
}

</script>
<style scoped>
.copy{
    position:absolute; 
    right: 12px;
    top: 30%;
    font-size: 21px;
    cursor: pointer;
    transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}
.copy:hover{
    fill: #007bff;
    font-size: 24px;
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
