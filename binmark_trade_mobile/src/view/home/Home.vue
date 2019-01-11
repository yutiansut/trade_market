<template>
  <div class="app-body overflow-y">

  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    let arrObj = [];
  }
};
</script>
<style lang="scss" scoped>
$padding: 3.3vw;
.header {
  padding: 1rem $padding 0;
  background: #fff;
  .logo {
    width: 9.3vw;
    & + span {
      margin: 0.5rem;
    }
  }
  .head-rt {
    align-content: flex-end;
  }
  .icon {
    width: 2rem;
    height: 2rem;
    display: inline-block;
    background-size: cover;
    background-repeat: no-repeat;
    &:first-child {
      margin-right: 1.2rem;
    }
  }
}
.account-info {
  padding: 4.53vw $padding;
  overflow-x: auto;
  white-space: nowrap;
  background: #fff;
  color: #fff;
  > div {
    width: 12.08rem;
    height: 7.8rem;
    border-radius: 1rem;
    display: inline-block;
    margin-left: 1.2rem;
    box-sizing: border-box;
    overflow: hidden;
    padding: 1.6rem 0 0 1.8rem;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    &:first-child {
      margin-left: 0;
    }
    .label {
      margin-bottom: 0.5rem;
    }
  }
}
.news-bar {
  margin-top: 0.9rem;
  height: 13.3vw;
  padding: 0 3.3vw;
  background: #fff;
  .news-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .tag {
    width: 6.6vh;
  }
}
.menu {
  background: #fff;
  padding: 0 $padding;
  overflow: hidden;
  .add-banner {
    width: 93.4vw;
    margin-top: 1.5rem;
  }
}
.market-val {
  margin: 1.5rem auto;
  .m-item {
    height: 5rem;
    width: 48%;
    text-align: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    border-radius: 0.2rem;
    box-shadow: 0px 0px 0.8rem 0.2rem #ddd;
    span {
      display: block;
      &:first-child {
        margin-bottom: 0.2rem;
        font-weight: bold;
      }
    }
  }
}
.menu-item {
  .van-col {
    text-align: center;
    margin-top: 1.5rem;
    margin-bottom: 1.8rem;
  }
  .icon {
    width: 10vw;
    height: 10vw;
    display: block;
    margin: 0 auto 1.5rem auto;
  }
}
.news {
  margin-top: 0.9rem;
  background: #fff;
  .news-list-container {
    padding: 0 15px;
    margin-top: 1.9rem;
  }
}
</style>


