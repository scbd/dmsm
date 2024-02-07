<template>
  <div>
    <IconSymbols v-once/>
    <NuxtLoadingIndicator :height="6"/>    
        <AppSidebar />
        <div class="wrapper d-flex flex-column min-vh-100 bg-light">
            <AppHeader />
            <div class="body flex-grow-1 px-3">
                <CContainer fluid>
                  <NuxtPage/>
                </CContainer>
            </div>
            <AppFooter class="m-0 p-0"/>      
        </div>
    </div>
</template>
<script setup>
</script>


<style lang="scss">
  // Import Main styles for this application
  @import "@/assets/scss/style";
  .debug{
  border: 1px dashed red;
}
.debug-blue{
  border: 2px dashed blue;
  z-index: 100;
}
.debug-blue{
  border: 2px dashed blue;
  z-index: 100;
}
</style>