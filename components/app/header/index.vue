<template>
  <CHeader position="sticky" class="mb-4">
    <CContainer fluid>
      <!-- <CHeaderToggler class="ps-1" @click="userPreferences.setSidebarUnfoldable(!userPreferences.sidebarUnfoldable)">
        <CIcon icon="cil-menu" size="lg" />
      </CHeaderToggler> -->
      <CHeaderBrand class="mx-auto d-lg-none" to="/">
        <!-- <CIcon :icon="logo" height="48" alt="Logo" /> -->
      </CHeaderBrand>
      <CHeaderNav class="d-none d-md-flex me-auto">
        <!-- <CNavItem>
          <NuxtLink class="nav-link" :to="'/'"> dash</NuxtLink>
        </CNavItem> -->
        <!-- <CNavItem>
          <NuxtLink class="nav-link" :to="'/'" exact>
            {{xxx}}
          </NuxtLink>
        </CNavItem>
        <CNavItem>
          <NuxtLink class="nav-link" :to="'/'">
         xxx
          </NuxtLink>
        </CNavItem>
        <CNavItem>
          <NuxtLink class="nav-link" target="_blank" href="https://chm.cbd.int">
            CHM
          </NuxtLink>
        </CNavItem> -->
      </CHeaderNav>
      <CHeaderNav>
        <!-- <CNavItem>
          <NuxtLink class="nav-link" href="#">
            <CIcon class="mx-2" icon="cil-bell" size="lg" />
          </NuxtLink>
        </CNavItem>
        <CNavItem>
          <NuxtLink class="nav-link" href="#">
            <CIcon class="mx-2" icon="cil-list" size="lg" />            
          </NuxtLink>
        </CNavItem> -->
        <CNavItem>
          <span class="nav-link">
            <!-- <CDropdown variant="nav-item">
              <CDropdownToggle placement="bottom-end" class="py-0" :caret="true">
                <font-awesome-icon icon="fa-solid fa-language" /> {{languages[$i18n.locale]}} 
              </CDropdownToggle>
              <CDropdownMenu class="pt-0">
                <CDropdownHeader component="h6" class="bg-light fw-semibold py-2">
                  {{t('languages')}}
                </CDropdownHeader>
                <KmNavLink class="hand-cursor" v-for="(locale, key) in languages" v-bind:key="key"  @click="switchLocale(key)" :title="locale"></KmNavLink>
              </CDropdownMenu>
            </CDropdown> -->
          </span>
        </CNavItem>
        <CNavItem>
          <span class="nav-link">
            <!-- <AppHeaderDropdownAccnt /> -->
          </span>
        </CNavItem>
      </CHeaderNav>
    </CContainer>
    <CHeaderDivider />
    <CContainer fluid>
      <AppBreadcrumb />
    </CContainer>
  </CHeader>
</template>
<script setup>
</script>
<!-- <script>
import AppBreadcrumb from './AppBreadcrumb'
import AppHeaderDropdownAccnt from './AppHeaderDropdownAccnt'
import { logo } from '@/assets/brand/logo'
import { languages } from '@/app-data/languages'
import { useUserPreferencesStore } from '@/stores/userPreferences';

export default {
  name: 'AppHeader',
  components: {
    AppBreadcrumb,
    AppHeaderDropdownAccnt,
  },
  setup() {
    
    const { setLocale, } = useI18n()
    const switchLocalePath = useSwitchLocalePath();
    const { t } = useI18n()
    const userPreferences = useUserPreferencesStore();
    
    async function switchLocale (locale){
      setLocale(locale);
      const newLocalePath = switchLocalePath(locale);
      // console.log(locale, newLocalePath)
      await navigateTo(newLocalePath);
    }

    return { logo, t, languages, switchLocale, userPreferences }
  },
}
</script> -->
