<template>
  <div id="app" class="p-rel wh-full">
    <keep-alive>
      <transition name="slide-left">
        <router-view></router-view>
      </transition>
    </keep-alive>
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>

