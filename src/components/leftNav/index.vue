<template>
  <div class="leftNav">
    <Menu ref="side_menu" theme="dark" accordion v-for="(menuItem, menuIndex) in menuList" :key="menuIndex" :active-name="$route.name">

      
      <MenuItem v-if="!menuItem.children || menuItem.children.length==0" :key="menuIndex" :name="menuItem.to" :to="menuItem.to">
        <Icon :type="menuItem.icon" />
        <span>{{ menuItem.name }}</span>
      </MenuItem>

      
      <Submenu v-else :name="menuIndex">
          <template slot="title">
              <Icon :type="menuItem.icon" />
              <span>{{menuItem.name}}</span>
          </template>
          <MenuItem  v-for="(item, index) in menuItem.children" :key="index" :name="item.to" :to="item.to">{{item.name}}</MenuItem>
      </Submenu>
    </Menu>
  </div> 
            
</template>
<script>
export default {
  data() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log(userInfo.role);
    let menuList = [];
    if (userInfo.role == 1) {
      menuList = [
        {
          name: "Personal Information",
          to: "home",
          icon: "ios-archive-outline"
        },
        {
          name: "Apply",
          to: "apply",
          icon: "md-checkmark"
        }
      ];
    } else if (userInfo.role == 2) {
      menuList = [
        {
          name: "Overview",
          to: "overview",
          icon: "md-person"
        }
      ];
    } else if (userInfo.role == 2 || 3) {
      menuList = [
        {
          name: "Overview",
          to: "overview",
          icon: "md-person"
        },
        {
          name: "Examine",
          to: "examine",
          icon: "ios-create-outline"
        },
        {
          name: "Add User",
          to: "userAdd",
          icon: "md-person-add"
        }
      ];
    }
    return {
      menuList
    };
  },
  computed: {
    menuList() {
      // return this.$store.state.loginInfo.roleMenu;
    }
  },
  created() {}
};
</script>
<style lang="scss" scoped>
/deep/
  .ivu-menu-dark.ivu-menu-vertical
  .ivu-menu-item-active:not(.ivu-menu-submenu) {
  border-right: none;
  color: #fff;
  background: #2d8cf0 !important;
}
</style>
