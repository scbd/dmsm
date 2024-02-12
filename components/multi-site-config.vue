<template>
    
    <CCard class="text-center">
        <CCardHeader class="">
            <div  @click.passive="openConfig=!openConfig" class="float-start mt-2 w-75 ">
                <h4 class="text-start">Configuration</h4>
            </div>
            <CNav variant="tabs" class="justify-content-end  border-0">
                <CNavItem v-if="openConfig" @click.prevent="editJson=!editJson" >
                    <CNavLink  href="#" v-if="!editJson"> <Icon name="edit" class="fs-4"></Icon></CNavLink>
                    <CNavLink href="#" v-if="editJson"> <Icon name="eye" class="fs-4"></Icon></CNavLink>
                </CNavItem>

                <CNavItem @click.prevent="openConfig=!openConfig" >
                    <CNavLink href="#" v-if="openConfig"> <Icon name="arrow-down" class="fs-4"></Icon></CNavLink>
                    <CNavLink href="#" v-if="!openConfig"> <Icon name="arrow-up" class="fs-4"></Icon></CNavLink>
                </CNavItem>
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
                                    <CCardTitle>Public Info</CCardTitle>
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
                                        <!-- https://us-east-1.console.aws.amazon.com/route53/v2/hostedzones?region=us-east-1#ListRecordSets/ -->
                                        <div class="form-floating">
                                            <input type="text" class="form-control" :id="`configprePublishedBaseHost-${config.multiSiteCode}`" v-model="config.prePublishedBaseHost">
                                            <label :for="`configprePublishedBaseHost-${config.multiSiteCode}`">Pre-publish Base Host</label>
                                            <Icon v-if="config.prePublishedBaseHost" name="copy" class="copy" @click="copyToClipboard(config.prePublishedBaseHost)"/>
                                        </div>
                                    </CListGroupItem>                                  

                                </CListGroup>
                            </CCardBody>

                        </CCard>
                    </CCol>
                    <CCol class="p-0">
                        <CCard v-if="config.drupal">
                            <CCardHeader class="">
                                    <CCardTitle>Drupal</CCardTitle>
                                </CCardHeader>
                            <CCardBody>
                                <CListGroup flush>
                                    <CListGroupItem class="px-0">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" :id="`configDrupalApiUser-${config.multiSiteCode}`" :value="config.drupal.apiUser">
                                            <label :for="`configDrupalApiUser-${config.multiSiteCode}`">Drupal Root Api User</label>
                                            <Icon v-if="config.drupal.apiUser" name="copy" class="copy" @click="copyToClipboard(config.drupal.ApiUser)"/>
                                        </div>
                                    </CListGroupItem>
                                    <CListGroupItem class="px-0">
                                        <div class="form-floating">

                                            <input type="text" class="form-control" :id="`configDrupalUserApiUserPass-${config.multiSiteCode}`" :value="config.drupal.apiUserPass">

                                            <label :for="`configDrupalUserApiUserPass-${config.multiSiteCode}`">Drupal Api Password</label>
                                            <Icon v-if="config.drupal.apiUserPass"  name="copy" class="copy" @click="copyToClipboard(config.drupal.apiUserPass)"/>
                                        </div>
                                    </CListGroupItem>
                                    <CListGroupItem class="px-0">
                                        <div class="form-floating">

                                            <input type="text" class="form-control" :id="`configdrupalApiKey-${config.multiSiteCode}`" :value="config.drupal.apiKey">

                                            <label :for="`configdrupalApiKey-${config.multiSiteCode}`">Drupal Api Key (translate page to drupal node)</label>
                                            <Icon v-if="config.drupal.apiKey"  name="copy" class="copy" @click="copyToClipboard(config.drupal.apiKey)"/>
                                        </div>
                                    </CListGroupItem>

                                </CListGroup>
                            </CCardBody>

                        </CCard>
                        <CCard v-if="config.dataBase">
                            <CCardHeader class="">
                                    <CCardTitle>Drupal Database Root</CCardTitle>
                                </CCardHeader>
                            <CCardBody>
                                <CListGroup flush>
                                    <CListGroupItem class="px-0">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" :id="`configdataBaseName-${config.multiSiteCode}`" :value="config.dataBase.name">
                                            <label :for="`configdataBaseName-${config.multiSiteCode}`">Database Name</label>
                                            <Icon v-if="config.dataBase.name" name="copy" class="copy" @click="copyToClipboard(config.dataBase.name)"/>
                                        </div>
                                    </CListGroupItem>
                                    <CListGroupItem class="px-0">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" :id="`configdataBasePortNumber-${config.multiSiteCode}`" :value="config.dataBase.port">
                                            <label :for="`configdataBasePortNumber-${config.multiSiteCode}`">Database Port</label>
                                            <Icon v-if="config.dataBase.port" name="copy" class="copy" @click="copyToClipboard(config.dataBase.port)"/>
                                        </div>
                                    </CListGroupItem>
                                    <CListGroupItem class="px-0">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" :id="`configdataBaseUserName-${config.multiSiteCode}`" :value="config.dataBase.userName">
                                            <label :for="`configdataBaseUserName-${config.multiSiteCode}`">Database User Name</label>
                                            <Icon v-if="config.dataBase.userName" name="copy" class="copy" @click="copyToClipboard(config.dataBase.userName)"/>
                                        </div>
                                    </CListGroupItem>
                                    <CListGroupItem class="px-0">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" :id="`configdataBasePassword-${config.multiSiteCode}`" :value="config.dataBase.userPassword">
                                            <label :for="`configdataBasePassword-${config.multiSiteCode}`">Database Password</label>
                                            <Icon v-if="config.dataBase.userPassword" name="copy" class="copy" @click="copyToClipboard(config.dataBase.userPassword)"/>
                                        </div>
                                    </CListGroupItem>
                                    <CListGroupItem class="px-0">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" :id="`config.dataBase.host-${config.multiSiteCode}`" :value="config.dataBase.host">
                                            <label :for="`config.dataBase.host-${config.multiSiteCode}`">Database Host</label>
                                            <NuxtLink v-if="config.dataBase.host" :to="awsRdsUrl(config.dataBase.host)" class="external-link" external target="_blank"><Icon name="external-link" class="external-link" /></NuxtLink>
                                            <Icon v-if="config.dataBase.host" name="copy" class="copy" @click="copyToClipboard(config.dataBase.host)"/>
                                        </div>
                                    </CListGroupItem>
                                </CListGroup>
                            </CCardBody>

                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
            <CRow class="align-items-start">
                <CCol class="p-0">
                        <CCard v-if="config.dns">
                            <CCardHeader class="">
                                    <CCardTitle>DNS</CCardTitle>
                                </CCardHeader>
                            <CCardBody>
                                <CListGroup flush>
                                    <CListGroupItem class="px-0">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" :id="`configDnsHostZoneId-${config.multiSiteCode}`" :value="config.dns.hostZoneId">
                                            <label :for="`configDnsHostZoneId-${config.multiSiteCode}`">AWS Host Zone Id {{config.baseHost}}</label>
                                            <NuxtLink v-if="config.dns.hostZoneId" :to="awsHostZoneUrl(config.dns.hostZoneId)" class="external-link" external target="_blank"><Icon name="external-link" class="external-link" /></NuxtLink>
                                            <Icon v-if="config.dns.hostZoneId" name="copy" class="copy" @click="copyToClipboard(config.dns.hostZoneId)"/>
                                        </div>
                                    </CListGroupItem>
                                    <CListGroupItem v-if="config.prePublishedBaseHost" class="px-0">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" :id="`configDnsPrePublishedHostZoneId-${config.multiSiteCode}`" :value="config.dns. prePublishedHostZoneId">
                                            <label :for="`configDnsPrePublishedHostZoneId-${config.multiSiteCode}`">AWS Host Zone Id {{config.prePublishedBaseHost}}</label>
                                            <NuxtLink v-if="config.dns.prePublishedHostZoneId" :to="awsHostZoneUrl(config.dns.prePublishedHostZoneId)" class="external-link" external target="_blank"><Icon name="external-link" class="external-link" /></NuxtLink>
                                           
                                            <Icon v-if="config.dns.prePublishedHostZoneId" name="copy" class="copy" @click="copyToClipboard(config.dns. prePublishedHostZoneId)"/>
                                        </div>
                                    </CListGroupItem>

                                </CListGroup>
                            </CCardBody>

                        </CCard>
                        <CCard v-if="config.auth" >
                            <CCardHeader class="">
                                    <CCardTitle>{{config.auth.uri || 'Auth'}}</CCardTitle>
                                </CCardHeader>
                            <CCardBody>
                                <CListGroup flush>
                                    <CListGroupItem class="px-0">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" :id="`configAuthUri-${config.multiSiteCode}`" :value="config.auth.uri">
                                            <label :for="`configAuthUri-${config.multiSiteCode}`">Uri</label>

                                            <Icon v-if="config.auth.uri" name="copy" class="copy" @click="copyToClipboard(config.auth.uri)"/>
                                        </div>
                                    </CListGroupItem>
                                    <CListGroupItem class="px-0">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" :id="`configAuthValidationKey-${config.multiSiteCode}`" :value="config.auth.validationKey">
                                            <label :for="`configAuthValidationKey-${config.multiSiteCode}`">Validation Key</label>

                                            <Icon v-if="config.auth.validationKey" name="copy" class="copy" @click="copyToClipboard(config.auth.validationKey)"/>
                                        </div>
                                    </CListGroupItem>
                                    <CListGroupItem  class="px-0">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" :id="`configAuthEncryptionKey-${config.multiSiteCode}`" :value="config.auth.encryptionKey">
                                            <label :for="`configAuthEncryptionKey-${config.multiSiteCode}`">Encryption Key</label>
                                           
                                            <Icon v-if="config.auth.encryptionKey" name="copy" class="copy" @click="copyToClipboard(config.auth.encryptionKey)"/>
                                        </div>
                                    </CListGroupItem>

                                </CListGroup>
                            </CCardBody>

                        </CCard>
                    </CCol>
                    <CCol >
                        <CCard v-if="config.defaultSmtpCredentials">
                            <CCardHeader class="">
                                    <CCardTitle>Default SMTP</CCardTitle>
                                </CCardHeader>
                            <CCardBody>
                                <CListGroup flush>
                                    <CListGroupItem class="px-0">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" :id="`configSmtpPortNumber-${config.multiSiteCode}`" :value="config.defaultSmtpCredentials.port">
                                            <label :for="`configSmtpPortNumber-${config.multiSiteCode}`">Port</label>
                                            <Icon v-if="config.defaultSmtpCredentials.port" name="copy" class="copy" @click="copyToClipboard(config.defaultSmtpCredentials.port)"/>
                                        </div>
                                    </CListGroupItem>
                                    <CListGroupItem class="px-0">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" :id="`configdataBaseUserName-${config.multiSiteCode}`" :value="config.defaultSmtpCredentials.userName">
                                            <label :for="`configdataBaseUserName-${config.multiSiteCode}`"> User Name</label>
                                            <Icon v-if="config.defaultSmtpCredentials.userName" name="copy" class="copy" @click="copyToClipboard(config.defaultSmtpCredentials.userName)"/>
                                        </div>
                                    </CListGroupItem>
                                    <CListGroupItem class="px-0">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" :id="`configSmtpPassword-${config.multiSiteCode}`" :value="config.defaultSmtpCredentials.userPassword">
                                            <label :for="`configSmtpPassword-${config.multiSiteCode}`">User Password</label>
                                            <Icon v-if="config.defaultSmtpCredentials.userPassword" name="copy" class="copy" @click="copyToClipboard(config.defaultSmtpCredentials.userPassword)"/>
                                        </div>
                                    </CListGroupItem>
                                    <CListGroupItem class="px-0">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" :id="`config.defaultSmtpCredentials.host-${config.multiSiteCode}`" :value="config.defaultSmtpCredentials.host">
                                            <label :for="`config.defaultSmtpCredentials.host-${config.multiSiteCode}`">Host</label>
                                            <NuxtLink v-if="config.defaultSmtpCredentials.host" :to="awsRdsUrl(config.dataBase.host)" class="external-link" external target="_blank"><Icon name="external-link" class="external-link" /></NuxtLink>
                                            <Icon v-if="config.defaultSmtpCredentials.host" name="copy" class="copy" @click="copyToClipboard(config.defaultSmtpCredentials.host)"/>
                                        </div>
                                    </CListGroupItem>
                                </CListGroup>
                            </CCardBody>

                        </CCard>
                    </CCol>
                    
            </CRow>
        </CCardBody>
        <CCardFooter v-if="openConfig">
            <CButton @click="save()" color="dark">Save</CButton>
            &nbsp;
            <CButton color="light" @click="openConfig=!openConfig">Close</CButton>
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

const editJson = ref(false);
const openConfig = ref(false);

function copyToClipboard(text) {
    consola.warn(text)
    navigator.clipboard.writeText(text)
}

function save(){
    const { env, multiSiteIdentifier } = route.params;

    configStore.setMultiSiteConfig(env, multiSiteIdentifier, config.value );
    openConfig.value = false;
}

function awsHostZoneUrl(hostZoneId){
    return `https://us-east-1.console.aws.amazon.com/route53/v2/hostedzones?region=us-east-1#ListRecordSets/${hostZoneId}`
}

function awsRdsUrl(url){
    const [dbId] = url.split('.');
    return `https://us-east-1.console.aws.amazon.com/rds/home?region=us-east-1#database:id=${dbId}`
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

.external-link{
    position:absolute; 
    right: 20px;
    top: 30%;
    font-size: 21px;
    cursor: pointer;
    transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}
.external-link:hover{
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
