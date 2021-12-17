<template>
    <div class="mainPage">
        <div class="page-header">
            <img src="@/assets/images/logo.png" class="header-logo" />
            <div class="header-title">Covid Information System</div>
            <div class="header-right">
                <Icon type="ios-contact" />
                <div class="userName">{{userInfo.name}}</div>
                <Poptip placement="bottom-end" class="operation">
                    <Icon type="md-arrow-dropdown" class="option-icon"/>
                    <div slot="content">
                        <p class="exit" @click="exit">Log out</p>
                    </div>
                </Poptip>
            </div>
        </div>
        <div class="page-body">
            <LeftNav class="body-left" />
            <router-view class="body-right" />
        </div>
    </div>
</template>
<script>
import LeftNav from "@/components/leftNav";
import { logout } from "@/api/getData";
import store from "@/store";
export default {
  data() {
    return {
      userInfo: JSON.parse(localStorage.getItem("userInfo"))
    };
  },
  components: { LeftNav },
  beforeDestroy() {
    logout();
  },
  computed: {
    loginInfo() {
      return this.$store.state.loginInfo;
    }
  },
  methods: {
    exit() {
      this.$Modal.confirm({
        title: "Notice",
        content: "Do you want to exit the system?",
        onOk: () => {
          this.$router.push({ name: "login" });
          window.localStorage.clear();
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.mainPage {
  position: relative;
  height: 100%;
}
.page-header {
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1000;
  color: #fff;
  background: #3c435b;
  height: 65px;
  text-align: left;

  > * {
    display: inline-block;
    vertical-align: middle;
    line-height: 65px;
  }
}
.header-logo {
  margin: 0 6px;
}
.header-title {
  font-size: 22px;
  font-weight: bold;
  margin-right: 50px;
}
.header-right {
  float: right;
  background: #565969;
}

.header-right > * {
  display: inline-block;
  line-height: 65px;
  vertical-align: middle;
}

i {
  margin: 0 10px;
  font-size: 30px;
}
.operation /deep/ .ivu-poptip-popper {
  min-width: 110px;
}
.option-icon {
  cursor: pointer;
  margin: 0 10px;
  font-size: 24px;
}
.operation p {
  display: block;
  cursor: pointer;
  color: #3c435b;
  line-height: 36px;
  height: 36px;
  text-align: left;
  padding-left: 20px;
  &:hover {
    background: rgba(221, 236, 255, 1);
  }
}

.page-body {
  height: 100%;
  padding-top: 65px;
  box-sizing: border-box;
}
.body-left {
  float: left;
  height: 100%;
  text-align: left;
  background: #515a6e;
  overflow: auto;
}
.body-right {
  overflow: auto;
}
</style>



