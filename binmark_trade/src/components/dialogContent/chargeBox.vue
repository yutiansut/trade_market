<template>
  <dialog-box
    :showDialog='showModel'
    :dialogTitle='$t("rechargeCoin")||"充币"'
    @onDialogClose='closeModel'
  >
    <div class="slot-content">
      <div class="mt-15 charge-label">
        <template v-if="$i18n.locale=='zh-CN'">请将{{coin}}汇入如下地址</template>
        <template v-if="$i18n.locale=='en-US'">Please place {{coin}} to the following address</template>
        <!-- <router-link to="">
          <template v-if="$i18n.locale=='zh-CN'">（点击这里查看区块链记录）</template>
          <template v-if="$i18n.locale=='en-US'">(click to check block chain record)</template>
        </router-link> -->
      </div>
      <input
        class="eth-addr"
        disabled='disabled'
        :value="chargeAddress"
      />
      <div>{{$t('or')||"或"}}&nbsp;{{$t('scanCode')||"扫描二维码"}}</div>
      <div
        v-if="chargeAddress"
        class="qr-code"
      >
        <vue-qr
          :text="chargeAddress"
          :margin="1"
          :size="120"
        >
        </vue-qr>
      </div>
      <div class="warning color-666">
        <template v-if="$i18n.locale=='en-US'">
          Please send the number of {{coin}} you need to recharge to this address via the ETH client or online wallet. After the transmission is completed, the system will automatically recharge the virtual currency to your account on the site after 12 confirmations. 12 confirmations take about 0.5 to 1 hour, please be patient. The same address can be recharged multiple times without affecting the account. The minimum recharge amount is 0.0001.
        </template>
        <template v-if="$i18n.locale=='zh-CN'">请通过 {{coin}} 客户端或在线钱包将您需要充值的ETH数目发送到该地址。
          发送完成后，系统会自动在此交易获得 12 个确认后将该笔虚拟币充值到您在本站的账户，12 个确认需要大约 0.5 到 1 小时时间，请耐心等待。
          同一个地址可多次充值，不影响到账。最小充值金额0.0001。</template>
      </div>
    </div>
  </dialog-box>
</template>
<script>
import VueQr from "vue-qr";
export default {
  components: { VueQr },
  props: {
    showCharge: {
      type: Boolean,
      default: false
    },
    chargeAddress: "",
    qrCode: null,
    coin: null
  },
  data() {
    return {
      showModel: this.showCharge
    };
  },
  methods: {
    closeModel() {
      this.showModel = false;
      this.$emit("closeModel");
    }
  },
  watch: {
    showCharge: function() {
      this.showModel = this.showCharge;
    }
  }
};
</script>

<style lang="scss" scoped>
.slot-content {
  margin-top: 20px;
  .charge-label {
    margin-bottom: 10px;
  }
  input {
    @include textVcenter;
    width: 100%;
    border-color: $bd-color;
    padding: 0 10px;
    color: $color-danger;
    margin-bottom: 15px;
  }
  .qr-code {
    // width: 23.2%;
    // padding-top: 23.2%;
    width: 120px;
    height: 120px;
    margin: 10px 0;
  }
  .warning {
    line-height: 1.5;
    text-align: justify;
  }
}
</style>
