<template>
    <div class="main wh-full">
        <my-header class="header-main">
            <login-bar></login-bar>
        </my-header>
        <router-view></router-view>
        <my-footer class="reset-footer"></my-footer>
    </div>  
</template>
<style scoped>
.reset-footer {
  margin-top: 0 !important;
}
</style>
